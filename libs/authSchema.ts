// libs/authSchemas.ts
import { z } from "zod";
import { CATEGORIES } from "./productFilter";
export const registerSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(50),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(72, "Password is too long"),
});


export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1),
});

export const sellSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters").max(80),
  description: z.string().trim().min(10, "Description must be at least 10 characters").max(2000),
  price: z.number().positive("Enter a valid price").max(100000),
  category: z.enum(CATEGORIES, { message: "Choose a category from the list" }),
  stock: z.number().int().min(0).max(1000),
});