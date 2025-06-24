import Communitybook from '../../components/Communitybook';
import { fetchThemenList, getVorschlaegeByThema } from '../../drizzle/actions';
import { db } from '../../drizzle';
import {
  themen,
  vorschlaege,
  kommentare,
  userLikes,
  commentLikes,
} from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

async function seedDatabase() {
  console.log('Checking for updates from Seed.json...');

  const seedFilePath = path.join(process.cwd(), 'public', 'Seed.json');
  if (!fs.existsSync(seedFilePath)) {
    console.error('Seed.json not found in public directory.');
    return;
  }

  const seedFileContent = fs.readFileSync(seedFilePath, 'utf-8');
  const seedData = JSON.parse(seedFileContent);

  // 1. Alle vorhandenen Daten in der richtigen Reihenfolge löschen
  console.log('Clearing existing data to ensure correct order...');
  await db.delete(commentLikes);
  await db.delete(userLikes);
  await db.delete(kommentare);
  await db.delete(vorschlaege);
  await db.delete(themen);

  // 2. Themen in der korrekten Reihenfolge der Seed.json einfügen
  const themaOrder = Object.keys(seedData);
  const createdThemen: { [key: string]: number } = {};

  for (const themaName of themaOrder) {
    const vorschlaegeData = seedData[themaName];

    // Thema einfügen
    const [newThema] = await db
      .insert(themen)
      .values({ name: themaName })
      .returning();

    createdThemen[themaName] = newThema.id;
    console.log(`Thema "${themaName}" mit ID ${newThema.id} erstellt.`);

    // Vorschläge für das Thema einfügen
    for (const v of vorschlaegeData) {
      const ueberschrift = v.Überschrift;
      const text = v.Text;

      await db.insert(vorschlaege).values({
        themaId: newThema.id,
        ueberschrift: ueberschrift,
        text: text,
        likes: Math.floor(Math.random() * 50),
        comments: Math.floor(Math.random() * 15),
      });
      console.log(
        `- Vorschlag "${ueberschrift}" für "${themaName}" hinzugefügt.`,
      );
    }
  }
  console.log('Database synchronized with Seed.json.');
}

export default async function CommunitybookPage() {
  // Bei jedem Aufruf der Seite die Datenbank mit der JSON-Datei synchronisieren
  await seedDatabase();

  const themenList = await fetchThemenList();
  const themenWithVorschlaege = await Promise.all(
    themenList.map(async (thema) => {
      const vorschlaege = await getVorschlaegeByThema(thema.id);
      return { ...thema, vorschlaege };
    }),
  );

  return <Communitybook themenList={themenWithVorschlaege} />;
}
