"use server"
import "server-only"

import { getUser } from "@/lib/Auth/ValidateCookies";
import { Button } from "./ui/button";
import Link from "next/link";

export default async function AuthBox() {
    const user = await getUser()

    return (
        <div>
            {user ? <Button asChild>
                <Link href="/my_profile">My Profile</Link>
            </Button> : <div className="flex flex-row gap-5">
                <Button asChild>
                    <Link href="/login">Login</Link>
                </Button>
                <Button asChild>
                    <Link href="/register">Register</Link>
                </Button>
            </div>
            }
        </div>
    )
}