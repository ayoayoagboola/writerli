import * as z from "zod"

// TODO: add validation for the login and register forms + codes

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.optional(z.string()),
  });
  
export const RegisterSchema = z.object({
firstName: z.string().min(1, {
    message: "First name is required",
}),
lastName: z.string().min(1, {
    message: "Last name is required",
}),
email: z.string().email({
    message: "Email is required",
}),
password: z.string().min(8, {
    message: "A minimum of 8 characters is required",
}),
});