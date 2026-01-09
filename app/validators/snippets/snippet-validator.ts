import { z } from "zod";
// Validation schema for snippets
export const snippetValidator = z.object({
  title: z.string().min(5, "Snippet title must be at least 5 characters long."),
  code: z.string().min(6),
  tags: z
    .array(z.string())
    .min(1, "Add at least one tag")
    .max(5, "Maximum 5 tags allowed"),
  language: z.string().optional(),
});
