import { z } from "zod";

export const zod_username = z.string().min(6).max(256)
    .regex(new RegExp(/^[a-zA-z.@]+$/), "Username can only contain lowecase letters, uppercase letters, dot(.), and @ .")

export const zod_password = z.string().min(6).max(256)
    .regex(new RegExp(/[a-z]/), "Password must contain at least one lowecase letter")
    .regex(new RegExp(/[A-Z]/), "Password must contain uppercase")
    .regex(new RegExp(/[(!@$%^&*+#.]/), "Password must contain at least one special character: (!, @, $, %, ^, &, *, +, #, .)")