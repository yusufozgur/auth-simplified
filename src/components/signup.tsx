"use client"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useFormStatus } from "react-dom"

function SubmitButton() {
    const { pending, data, method, action } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            Create an account
        </Button>
    )
}

export function SignUpForm(
    { form_action }: { form_action: string | ((formData: FormData) => void) | undefined }
) {
    return (
        <form action={form_action}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="first-name">First name</Label>
                                <Input id="first-name" name="first-name" placeholder="Max" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="last-name" >Last name</Label>
                                <Input id="last-name" placeholder="Robinson" name="last-name" required />
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email" >Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password" >Password</Label>
                            <Input id="password" type="password" name="password" />
                        </div>
                        <SubmitButton />
                        <Button variant="outline" className="w-full">
                            Sign up with GitHub
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="#" className="underline">
                            Sign in
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
