import z from "zod";

export const registerFormSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().optional().or(z.literal("")),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 16 characters")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least 1 special character",
      ),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 16 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

export const passwordRules = (passwordValue: string) => {
  return {
    length: passwordValue.length >= 8 && passwordValue.length <= 16,
    lowercase: /[a-z]/.test(passwordValue),
    uppercase: /[A-Z]/.test(passwordValue),
    number: /[0-9]/.test(passwordValue),
    specialChar: /[^A-Za-z0-9]/.test(passwordValue),
  };
};
