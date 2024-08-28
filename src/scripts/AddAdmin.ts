#!/usr/bin/env node

import { zod_password, zod_username } from "@/lib/Auth/AuthZodStrings"
import { userTable } from "@/lib/db/schema"
import { hash } from "@node-rs/argon2"
import { eq } from "drizzle-orm"
import { generateIdFromEntropySize } from "lucia"
import { z } from "zod"
import * as schema from "@/lib/db/schema"
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';
import { neon } from "@neondatabase/serverless";
const readlineSync = require('readline-sync');



main();

async function main() {
    const username = readlineSync.question('Enter username: ');
    const password = readlineSync.question('Enter password: ', {
        hideEchoBack: true,
    });
    const db_conn = readlineSync.question('Enter neondb connection string: ', {
        hideEchoBack: true,
    });

    const sql = neon(db_conn);
    const db = drizzle(sql, { schema });

    console.log(await admin_signup(username, password, db))
}

export async function admin_signup(username: string, password: string, db: NeonHttpDatabase<typeof schema>):
    Promise<
        { success: false, err_message: string } |
        { success: true, err_message: null }
    > {


    // === Validate string formats of username and string fields

    //zod is the library for string validation
    const validate_format_username_password = z.object({
        username: zod_username,
        password: zod_password
    })

    const { success: zod_success, error: zod_error } = await validate_format_username_password
        .safeParseAsync({
            username: username,
            password: password
        })

    if (!zod_success) {
        return {
            success: false,
            err_message: zod_error.errors.map(x => (x.path[0] ? x.path[0] + ": " : "") + x.message)[0]
        }
    }

    // === Check if username already used
    const username_already_exists = await db.query.userTable.findFirst({
        where: eq(userTable.username, username!)
    })
    if (username_already_exists) {
        return {
            success: false,
            err_message: "username already exists"
        }
    }
    // === Hash the pass and save

    const passwordHash = await hash(password!, {
        // recommended minimum parameters
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1
    });

    const userId = generateIdFromEntropySize(10); // 16 characters long

    await db.insert(userTable).values({
        id: userId,
        username: username!,
        password_hash: passwordHash,
        role: "admin"
    });


    return ({
        success: true,
        err_message: null
    })
}