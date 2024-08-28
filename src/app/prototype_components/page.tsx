import { LoginForm } from "@/components/LoginForm"
import { SignUpForm } from "@/components/SignUpForm"
import { ComponentTester } from "@/components/component_prototyper"
import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const component_list: { [key: string]: ReactNode } = { // @ts-ignore
    "login": <LoginForm />,// @ts-ignore
    "signup": <SignUpForm />,
}

export default function TestComponents() {

    return (
        <div>
            <Button asChild><Link href="/">Main Page</Link></Button>
            <ComponentTester component_list={component_list} />
        </div>
    )
}