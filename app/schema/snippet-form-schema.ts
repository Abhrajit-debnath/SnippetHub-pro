import z from "zod";

// Validation schema for snippets in frontend

export const snippetSchema = z.object({
  title: z.string().min(5, "Snippet title must be at least 5 characters long."),
  code: z.string().min(1, "Snippet must not be empty").min(6,"Snippet title must be at least 5 characters long."),
  
  tags: z
    .array(z.string())
    .min(1, "Add at least one tag")
    .max(5, "Maximum 5 tags allowed"),

  language: z.string().optional(),
});
