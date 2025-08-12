import { email, z } from "zod";

//register form schema
export const RegisterFormSchema = z
  .object({
    email: z.string().trim(),
    password: z
      .string()
      .trim()
      .min(8, { error: "Password must be atleast 8 characters" }),
    confirmPassword: z.string().trim(),
  })
  .refine((val) => val.password === val.confirmPassword, {
    error: "Passwords do not match",
    path: ["confirmPassword"],
  });

//Login form schema
export const LoginFormSchema = z.object({
  email: z.string().trim(),
  password: z
    .string()
    .trim()
    .min(8, { error: "Password must be atleast 8 characters" }),
});

//Contact form schema
export const ContactFormSchema = z.object({
  names: z.string().trim(),
  email: z.string().trim(),
  message: z
    .string()
    .trim()
    .min(5, { error: "Content must be more than 5 characters" }),
});

//Blog form schema
export const BlogFormSchema = z.object({
  title: z.string().trim(),
  content: z
    .string()
    .trim()
    .min(5, { error: "Content should be more than 5 characters" }),
});
