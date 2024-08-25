"use server"
import { SignUpForm } from "@/components/SignUpForm";

export default async function SignUpPage() {
    return (
        <div className="flex flex-col items-center gap-5 m-5">
            <SignUpForm />
        </div>
    )
}
