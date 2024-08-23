"use client"
import { ReactNode, useState } from "react"
import { LoginForm } from "@/components/login"
import { Button } from "@/components/ui/button"
import { SignUpForm } from "@/components/signup"
import { AuthBoxLoggedIn, AuthBoxNotLoggedIn } from "@/components/AuthBox"
import { Card } from "@/components/ui/card"

const component_list: { [key: string]: ReactNode } = { // @ts-ignore
    "login": <LoginForm />,// @ts-ignore
    "signup": <SignUpForm />,
    "AuthBoxLoggedIn_onlyusername": <AuthBoxLoggedIn username="username" />,
    "AuthBoxLoggedIn_both_username_and_role": <AuthBoxLoggedIn username="username" role="role" />, //@ts-ignore
    "AuthBoxNotLoggedIn": <AuthBoxNotLoggedIn />,
}

export default function TestComponents() {

    const [current_component, setcurrent_component] = useState("login")

    console.log(Object.keys(component_list))

    return (
        <div className="flex flex-col gap-5 m-5 items-center">
            <Card className="p-2">Choose One</Card>
            <div id="choose_component"
                className="flex flex-row items-center gap-5 flex-wrap justify-center">
                {Object.keys(component_list)
                    .map(
                        x => <Button variant={current_component == x ? "default" : "secondary"}
                            onClick={() => setcurrent_component(x)}>
                            {x}
                        </Button>
                    )}
            </div>
            <div id="show_component"
                className="flex flex-col items-center gap-5">
                <div>{component_list[current_component]}</div>
            </div>
        </div>
    )
}