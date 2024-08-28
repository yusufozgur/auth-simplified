import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/Auth/ValidateCookies";
import Link from "next/link";
import { LogOutAction } from "@/lib/Auth/LogOutAction";
import { redirect } from "next/navigation";

export default async function MyProfile() {
    const user = await getUser();
    if (!user) {
        redirect("/login")
    }

    return (
        <div>
            <div>
                <Button asChild>
                    <Link href="/">Back to Main Page</Link>
                </Button>
            </div>
            <div>
                <p>Your username is: {user.username}</p>
                <p>Role: {user.role}</p>
            </div>
            <div>
                <form action={LogOutAction}>
                    <Button type="submit">Log Out</Button>
                </form>
            </div>
        </div>
    )
}