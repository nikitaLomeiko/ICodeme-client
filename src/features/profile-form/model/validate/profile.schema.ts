import z from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Enter your name"),
  avatar: z.string().min(1, "Select an avatar"),
  bio: z.string().min(1, "Tell us about yourself"),
  language: z.string().min(1, "Select a programming language"),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
