"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { z } from "zod";

export interface ActionState {
  success: boolean;
  message: string;
  errors?: Record<string, string>;
}

import { Role } from "@/lib/types";

/**
 * Zod validation schema for Login.
 */
export const loginValidationSchema = z
  .object({
    email: z.preprocess(
      (val) => (val === "" || val === null ? undefined : val),
      z.string().email("Invalid email format").optional()
    ),
    phone: z.preprocess(
      (val) => (val === "" || val === null ? undefined : val),
      z.string().min(10, "Phone number is invalid").optional()
    ),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Email or phone number is required",
    path: ["email"],
  });

/**
 * Zod validation schema for Registration matching backend requirements.
 */
export const registerValidationSchema = z
  .object({
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.preprocess(
      (val) => (val === "" || val === null ? undefined : val),
      z.string().optional()
    ),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 16 characters")
      .regex(/[a-z]/, "Password must contain at least 1 lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least 1 uppercase letter")
      .regex(/[0-9]/, "Password must contain at least 1 number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least 1 special character"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(16, "Password must not exceed 16 characters"),
    role: z.nativeEnum(Role).default(Role.CUSTOMER),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

/**
 * Server Action for Logging in
 */
export async function loginAction(
  payload: any
): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 1200));

  const result = loginValidationSchema.safeParse(payload);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      const key = err.path.join(".") || "email";
      errors[key] = err.message;
    });

    return {
      success: false,
      message: "Validation failed.",
      errors,
    };
  }

  const { email, phone } = result.data;
  const accountType = payload.accountType || "personal";

  console.log(`Server Action [Login Success]: Email: ${email || "N/A"}, Phone: ${phone || "N/A"} (${accountType})`);

  const cookieStore = await cookies();
  cookieStore.set("session", JSON.stringify({ email, phone, accountType }), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 2, // 2 hours
    path: "/",
  });

  return {
    success: true,
    message: "Welcome back! Redirecting to secure dashboard...",
  };
}

/**
 * Server Action for Registration
 */
export async function registerAction(
  payload: any
): Promise<ActionState> {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const result = registerValidationSchema.safeParse(payload);

  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      const key = err.path.join(".") || "email";
      errors[key] = err.message;
    });

    return {
      success: false,
      message: "Registration validation failed.",
      errors,
    };
  }

  const { email, phone, role } = result.data;
  console.log(`Server Action [Register Success]: Email: ${email}, Phone: ${phone || "N/A"}, Role: ${role}`);

  // In a real application, you would save this user to a database here
  return {
    success: true,
    message: "Registration successful. Redirecting to login...",
  };
}

/**
 * Server Action for Logging out
 */
export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
  redirect("/login");
}
