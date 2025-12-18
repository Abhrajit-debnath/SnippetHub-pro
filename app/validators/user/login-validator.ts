import { z } from "zod";
// Validation schema for login in backend
export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
