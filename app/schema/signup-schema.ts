import { z } from "zod";

// Validation schema for signup in frontend

export const signupSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(5, "Username must be atleast 5 characters long"),
    email: z.string().trim().email("Please enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must contain at least one uppercase letter")
      .regex(/[a-z]/, "Must contain at least one lowercase letter")
      .regex(/[0-9]/, "Must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Must contain at least one special character"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords does not match",
  })
  .refine((data) => data.password !== "", {
    path: ["confirm_password"],
    message: "Password field cannot be empty",
  });
