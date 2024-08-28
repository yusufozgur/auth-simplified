"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ReactNode, useState } from "react";

export function ComponentTester({ component_list }: any) {
    const [current_component, setcurrent_component] = useState("login")

    return (
        <div className="flex flex-col gap-5 m-5 items-center">
            <Card className="p-2">Choose One</Card>
            <div id="choose_component"
                className="flex flex-row items-center gap-5 flex-wrap justify-center">
                {Object.keys(component_list)
                    .map(
                        x => <Button key={x.replace(" ", "_")} variant={current_component == x ? "default" : "secondary"}
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