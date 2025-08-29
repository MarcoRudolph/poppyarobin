// drizzle/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Use Supabase connection string if available, fallback to POSTGRES_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

console.log('=== DATABASE CONNECTION DEBUG ===');
console.log('DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('POSTGRES_URL exists:', !!process.env.POSTGRES_URL);
console.log('Using connection string:', connectionString ? 'YES' : 'NO');

if (!connectionString) {
  console.error('No database connection string found!');
  throw new Error(
    'DATABASE_URL or POSTGRES_URL environment variable is required',
  );
}

console.log(
  'Connection string starts with:',
  connectionString.substring(0, 30) + '...',
);
console.log('=== DATABASE CONNECTION DEBUG END ===');

const pool = new Pool({
  connectionString: connectionString,
});

export const db = drizzle(pool); // Kein `pg-native` erforderlich
