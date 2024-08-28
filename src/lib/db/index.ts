import * as schema from "@/lib/db/schema"
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });