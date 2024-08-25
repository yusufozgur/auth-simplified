import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({
    path: ".env.local",
});

export default defineConfig({
    dialect: "postgresql",
    schema: "./src/lib/db/schema.ts",
    out: "./drizzle",
    dbCredentials: {
        url: process.env.DATABASE_URL!
    }
});