import * as schema from "@/lib/db/schema"
import postgres from "postgres";
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";


const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString!, { prepare: false })
const sql = neon(process.env.DATABASE_URL!);

//export const db = drizzle(client, { schema });


export const db = drizzle(sql, { schema });