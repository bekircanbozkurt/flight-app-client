import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
export type FormState =
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined