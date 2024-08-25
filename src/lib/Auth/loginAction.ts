"use server"
import { z } from "zod"

export async function loginAction(prevLoginError: string, formdata: FormData) {

    const validation_schema = z.object({
        username: z.string().min(6).max(256)
            .regex(new RegExp(/^[a-zA-z.@]+$/), "Username can only contain lowecase letters, uppercase letters, dot(.), and @ ."),
        password: z.string().min(6).max(256)
            .regex(new RegExp(/[a-z]/), "Password must contain at least one lowecase letter")
            .regex(new RegExp(/[A-Z]/), "Password must contain uppercase")
            .regex(new RegExp(/[(!@$%^&*+#.]/), "Password must contain at least one special character: (!, @, $, %, ^, &, *, +, #, .)")
    })
    //new RegExp(/^[a-zA-z0-9]+$/),
    //.refine(
    //    x => !/^[a-zA-z]+$/.test(x.username),
    //    "username: Must consist of uppercase letters and lower case letters"
    //)

    const { success, error } = await validation_schema.safeParseAsync({
        username: formdata.get("username"),
        password: formdata.get("password")
    })

    if (!success) {
        // just show the first error
        // this way errors show sequencially, for example min max length controls are made first so they are thrown earlier than username password validations
        return error.errors.map(x => (x.path[0] ? x.path[0] + ": " : "") + x.message)[0]
    } else {
        return ""
    }
}