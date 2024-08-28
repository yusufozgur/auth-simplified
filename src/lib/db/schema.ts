import { pgEnum, pgSchema, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import postgres from 'postgres'

import dotenv from "dotenv";
dotenv.config({
    path: ".env.local",
});

export const roleEnum = pgEnum('role', ['normal', 'admin']);

export const userTable = pgTable("userTable", {
    id: text('id').primaryKey(),
    username: text("username").notNull().unique(),
    password_hash: text("password_hash").notNull().unique(),
    role: roleEnum('role').default("normal"),
});

export const sessionTable = pgTable("sessionTable", {
    id: text('id').primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: timestamp("expires_at", {
        withTimezone: true,
        mode: "date"
    }).notNull()
});
