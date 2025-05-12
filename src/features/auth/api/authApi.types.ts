import { Inputs } from "../lib/schemas/loginSchema"

export type MeResponse = {
  id: number
  email: string
  login: string
}

export type LoginResponse = {
  userId: number
  token: string
}

export type LoginArgs = Inputs & {
  captcha?: string
}
