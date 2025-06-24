import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import {
  themen,
  vorschlaege,
  kommentare,
  userLikes,
  commentLikes,
} from './schema';
import * as dotenv from 'dotenv';
import { eq, and } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config({ path: '.env' });

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

const db = drizzle(pool);

async function seed() {
  console.log('Seeding database from Seed.json...');

  // 1. Lese die JSON-Datei
  const seedFilePath = path.join(process.cwd(), 'public', 'Seed.json');
  const seedFileContent = fs.readFileSync(seedFilePath, 'utf-8');
  const seedData = JSON.parse(seedFileContent);

  // 2. Iteriere über jedes Thema (Kategorie) in der JSON-Datei
  for (const themaName in seedData) {
    if (Object.prototype.hasOwnProperty.call(seedData, themaName)) {
      const vorschlaegeData = seedData[themaName];

      // Prüfen, ob das Thema bereits existiert, sonst erstellen
      let themaResult = await db
        .select()
        .from(themen)
        .where(eq(themen.name, themaName))
        .limit(1);

      let themaId: number;

      if (themaResult.length > 0) {
        console.log(`Thema "${themaName}" existiert bereits.`);
        themaId = themaResult[0].id;
      } else {
        const [newThema] = await db
          .insert(themen)
          .values({ name: themaName })
          .returning();
        themaId = newThema.id;
        console.log(`Thema "${themaName}" mit ID ${themaId} erstellt.`);
      }

      // 3. Iteriere über die Vorschläge für das aktuelle Thema
      console.log(`Prüfe und füge Vorschläge für "${themaName}" hinzu...`);
      for (const v of vorschlaegeData) {
        const ueberschrift = v.Überschrift;
        const text = v.Text;

        // Prüfen, ob der Vorschlag bereits existiert
        const existingVorschlag = await db
          .select()
          .from(vorschlaege)
          .where(
            and(
              eq(vorschlaege.themaId, themaId),
              eq(vorschlaege.ueberschrift, ueberschrift),
            ),
          )
          .limit(1);

        if (existingVorschlag.length === 0) {
          await db.insert(vorschlaege).values({
            themaId: themaId,
            ueberschrift: ueberschrift,
            text: text,
            likes: Math.floor(Math.random() * 100), // Zufällige Likes für Demodaten
            comments: Math.floor(Math.random() * 20), // Zufällige Kommentare
          });
          console.log(`- Vorschlag "${ueberschrift}" hinzugefügt.`);
        } else {
          console.log(
            `- Vorschlag "${ueberschrift}" existiert bereits. Übersprungen.`,
          );
        }
      }
    }
  }

  console.log('Seeding complete.');
  process.exit(0);
}

seed().catch((error) => {
  console.error('Error during seeding:', error);
  process.exit(1);
});
