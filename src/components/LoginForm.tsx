"use client"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormStatus } from "react-dom"
import { useActionState } from "react"
import { LoginAction } from "@/lib/Auth/LoginAction"

//making SubmitButton disabled during form submissions
function SubmitButton() {
    const { pending, data, method, action } = useFormStatus();
    return (
        <Button className="w-full" type="submit" disabled={pending}>Sign in</Button>
    )
}

export function LoginForm() {

    const [loginError, form_action_w_state] = useActionState(LoginAction, "");

    return (
        <form action={form_action_w_state}>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Username</Label>
                        <Input id="username" name="username" type="text" placeholder="username" required />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required />
                    </div>
                </CardContent>
                <CardFooter>
                    <SubmitButton />
                </CardFooter>
                <div className="text-red-600 text-center">{loginError}</div>
            </Card>
        </form>
    )
}
