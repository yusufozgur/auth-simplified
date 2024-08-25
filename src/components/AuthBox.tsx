"use server"
import { Button } from "./ui/button";
import Link from "next/link";

export async function AuthBoxLoggedIn(
    { username, role }:
        { username: string, role?: string }) {
    return (
        <div>
            <p>Welcome {username} !</p>
            <p>Your role is: {role}</p>
        </div>
    )
}
export async function AuthBoxNotLoggedIn() {
    return (
        <div>
            <Button asChild><Link href="/sign_in">Sign in</Link></Button>
            <Button asChild><Link href="/sign_up">Sign Up</Link></Button>
        </div>
    )
}