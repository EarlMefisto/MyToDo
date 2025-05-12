import { z } from "zod"

export type Inputs = z.infer<typeof loginSchema>

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Incorrect email address" }),
  password: z
    .string()
    .nonempty({ message: "Password is required" })
    .min(3, { message: "Password must be at least 3 characters long" }),
  rememberMe: z.boolean().optional(),
  captcha: z.string().optional(),
})
