"use server"
import "server-only"

import { cookies } from "next/headers";
import { userTable } from "@/lib/db/schema"
import { z } from "zod"
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { zod_password, zod_username } from "./AuthZodStrings";
import { verify } from "@node-rs/argon2";
import { AuthArgon2Config } from "./AuthArgon2Config";
import { lucia } from "@/lib/Auth";
import { redirect } from "next/navigation";


export async function perform_login(username: string, password: string): Promise<{
    success: boolean,
    err_message: "Invalid Username" | "Invalid Password" | null
}> {

    let query_user = await db.query.userTable.findFirst({
        where: eq(userTable.username, username)
    })

    //telling username is false
    //to protect agains brute force attacks for finding usernames
    //implement login throttling
    //see copehagen book
    if (!query_user) {
        return { success: false, err_message: "Invalid Username" }
    }

    const validPassword = await verify(
        query_user.password_hash,
        password,
        AuthArgon2Config
    );

    if (!validPassword) {
        return { success: false, err_message: "Invalid Password" }
    }

    const session = await lucia.createSession(query_user.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return { success: true, err_message: null }
}

export async function LoginAction(prevLoginError: string, formdata: FormData): Promise<string> {

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


    // === Validate From DB, if matches, log in
    const { success, err_message } = await perform_login(username!, password!)
    if (!success) {
        return err_message!
    }
    return redirect("/");

}