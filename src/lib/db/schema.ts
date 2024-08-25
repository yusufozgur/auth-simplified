import { pgSchema, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import dotenv from "dotenv";
dotenv.config({
    path: ".env.local",
});

// We do not want to have tables in the public schema of supabase
export const private_schema = pgSchema("private");

export const userTable = private_schema.table("userTable", {
    id: text('id').primaryKey(),
    username: text("username").notNull().unique(),
    password_hash: text("password_hash").notNull().unique(),
});

export const sessionTable = private_schema.table("sessionTable", {
    id: text('id').primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});


const connectionString = process.env.DATABASE_URL

const client = postgres(connectionString!, { prepare: false })

//export const db = drizzle(client, { logger: true });
