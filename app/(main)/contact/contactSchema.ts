import z from "zod";

export const contactSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d+$/, "Phone number must contain only numbers"),
  message: z.string().min(10, "Message must be at least 10 characters"), //
});
