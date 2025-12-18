import { z } from "zod";
// Validation schema for signup in backend
export const signupValidator = z.object({
  username: z.string().trim().min(5),
  email: z.string().trim().email(),
  password: z.string().min(8),
});
