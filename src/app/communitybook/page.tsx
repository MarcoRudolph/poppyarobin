import CommunitybookClient from '../../components/CommunitybookClient';
import { fetchThemenList, getVorschlaegeByThema } from '../../drizzle/actions';
import { db } from '../../drizzle';
import {
  themen,
  vorschlaege,
  kommentare,
  userLikes,
  commentLikes,
  users,
} from '../../drizzle/schema';
import { eq, and } from 'drizzle-orm';
import * as fs from 'fs';
import * as path from 'path';
import Image from 'next/image';
import { useState, useEffect } from 'react';

async function seedDatabase() {
  console.log('Checking if database needs seeding...');

  // Check if database already has both themen and vorschlaege
  const existingThemen = await db.select().from(themen).limit(1);
  const existingVorschlaege = await db.select().from(vorschlaege).limit(1);

  if (existingThemen.length > 0 && existingVorschlaege.length > 0) {
    console.log('Database already has themen and vorschlaege, skipping seed.');
    return;
  }

  console.log(
    'Database needs seeding (themen or vorschlaege are empty), starting seed process...',
  );

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

  // 2. Dummy-User für Seed-Daten erstellen oder finden
  let dummyUser;
  const existingDummyUser = await db
    .select()
    .from(users)
    .where(eq(users.email, 'seed@poppyarobin.de'))
    .limit(1);

  if (existingDummyUser.length > 0) {
    dummyUser = existingDummyUser[0];
    console.log(`Using existing dummy user with ID ${dummyUser.id}`);
  } else {
    [dummyUser] = await db
      .insert(users)
      .values({
        name: 'Seed User',
        email: 'seed@poppyarobin.de',
        token: 'seed-token',
        image: null,
      })
      .returning();
    console.log(`Dummy user created with ID ${dummyUser.id}`);
  }

  // 3. Themen in der korrekten Reihenfolge der Seed.json einfügen
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
        likes: 0,
        comments: 0,
        userId: dummyUser.id,
      });
      console.log(
        `- Vorschlag "${ueberschrift}" für "${themaName}" hinzugefügt.`,
      );
    }
  }
  console.log('Database synchronized with Seed.json.');
}

export default async function CommunitybookPage() {
  await seedDatabase();
  const themenList = await fetchThemenList();
  const themenWithVorschlaege = await Promise.all(
    themenList.map(async (thema) => {
      const vorschlaege = await getVorschlaegeByThema(thema.id);
      return { ...thema, vorschlaege };
    }),
  );

  return <CommunitybookClient themenList={themenWithVorschlaege} />;
}
