import { Button } from "@/components/ui/button";
import { getUser } from "@/lib/Auth/ValidateCookies";
import Link from "next/link";
import { LogOut } from "@/lib/Auth/LogOut";
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
                Your username is: {user.username}
            </div>
            <div>
                <form action={LogOut}>
                    <Button type="submit">Log Out</Button>
                </form>
            </div>
        </div>
    )
}