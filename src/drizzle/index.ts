// drizzle/index.ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

// Use Supabase connection string if available, fallback to POSTGRES_URL
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
  throw new Error(
    'DATABASE_URL or POSTGRES_URL environment variable is required',
  );
}

const pool = new Pool({
  connectionString: connectionString,
});

export const db = drizzle(pool);
