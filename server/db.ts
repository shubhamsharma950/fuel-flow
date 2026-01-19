import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

// Use in-memory database URL if DATABASE_URL is not set (for development)
const DATABASE_URL = process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/fuelflow";

export const pool = new Pool({
  connectionString: DATABASE_URL,
});

export const db = drizzle(pool, { schema });
