import * as schema from "@/lib/db/schema"
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

const connectionString = process.env.DATABASE_URL
const client = postgres(connectionString!, { prepare: false })

export const db = drizzle(client, { schema });