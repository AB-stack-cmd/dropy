import * as z from "zod";


//zod ti check the schema data for validation
export const signInSchema = z.object({
  identifier: z
    .string()
    .min(1, { message: "Email or username is required" })
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || // email
        /^[a-zA-Z0-9_]{3,20}$/.test(val),         // username
      { message: "Must be a valid email or username" }
    ),

  password: z.string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
});