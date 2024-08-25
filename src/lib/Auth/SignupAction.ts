"use server"
import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { userTable } from "@/lib/db/schema"
import { db } from "@/lib/db"
import { AuthArgon2Config } from "./AuthArgon2Config";
import { zod_password, zod_username } from "./AuthZodStrings";
import { z } from "zod";
import { redirect } from "next/navigation";
import { perform_login } from "./Login_Action";
import { eq } from "drizzle-orm";

export async function perform_signup(username: string, password: string) {

    const passwordHash = await hash(password, AuthArgon2Config);

    const userId = generateIdFromEntropySize(10);

    await db.insert(userTable).values({
        id: userId,
        username: username,
        password_hash: passwordHash,
    })

}

export async function SignupAction(prevSignupError: string, formdata: FormData) {
    const username = formdata.get("username")?.toString()
    const password = formdata.get("password")?.toString()

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
        // just show the first error
        // this way errors show sequencially, for example min max length controls are made first so they are thrown earlier than username password validations
        return zod_error.errors.map(x => (x.path[0] ? x.path[0] + ": " : "") + x.message)[0]
    }

    // === Check if username already used
    const username_already_exists = await db.query.userTable.findFirst({
        where: eq(userTable.username, username!)
    })
    if (username_already_exists) {
        return "username already exists"
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
        password_hash: passwordHash
    });

    // === Log in User
    const { success, err_message } = await perform_login(username!, password!)
    if (!success) {
        return err_message!
    }
    return redirect("/");
}