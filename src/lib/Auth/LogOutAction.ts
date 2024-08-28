"use server"
import "server-only"

import { ActionResult } from "next/dist/server/app-render/types";
import { lucia } from "@/lib/Auth";
import { getUser } from "./ValidateCookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LogOutAction(): Promise<ActionResult> {

    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) return null;
    const { user, session } = await lucia.validateSession(sessionId);

    if (!session) {
        return "invalid session"
    }

    await lucia.invalidateSession(session.id);

    const sessionCookie = lucia.createBlankSessionCookie();
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes);

    return redirect("/");
}