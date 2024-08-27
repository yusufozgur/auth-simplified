import { Lucia } from "lucia";
import { db } from "@/lib/db/index";
import { sessionTable, userTable } from "@/lib/db/schema";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
    sessionCookie: {
        attributes: {
            // set to `true` when using HTTPS
            secure: process.env.NODE_ENV === "production"
        }
    },
    // for adding user columns to user type returns
    getUserAttributes: (attributes) => {
        return {
            username: attributes.username,
            role: attributes.role
        };
    }
});

// IMPORTANT!
declare module "lucia" {
    interface Register {
        Lucia: typeof lucia;
        // for adding user columns to user type returns
        DatabaseUserAttributes: DatabaseUserAttributes;
    }
}

// for adding user columns to user type returns
interface DatabaseUserAttributes {
    username: string;
    role: string;
}