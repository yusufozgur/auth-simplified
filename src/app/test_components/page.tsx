"use server"
import { LoginForm } from "@/components/login"
import { SignUpForm } from "@/components/signup"
import { AuthBoxLoggedIn, AuthBoxNotLoggedIn } from "@/components/AuthBox"
import { ComponentTester } from "../../components/component_tester"
import { ReactNode } from "react"
import { test_action } from "@/app/test_action"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { loginAction } from "@/lib/Auth/loginAction"

const component_list: { [key: string]: ReactNode } = { // @ts-ignore
    "login": <LoginForm form_action={loginAction} />,// @ts-ignore
    "signup": <SignUpForm form_action={test_action} />,
    "AuthBoxLoggedIn_onlyusername": <AuthBoxLoggedIn username="username" />,
    "AuthBoxLoggedIn_both_username_and_role": <AuthBoxLoggedIn username="username" role="role" />, //@ts-ignore
    "AuthBoxNotLoggedIn": <AuthBoxNotLoggedIn />,
}

export default async function TestComponents() {

    return (
        <div>
            <Button asChild><Link href="/">Main Page</Link></Button>
            <ComponentTester component_list={component_list} />
        </div>
    )
}