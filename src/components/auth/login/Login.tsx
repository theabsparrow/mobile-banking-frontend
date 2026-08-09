"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Mail,
} from "lucide-react";

// Client-side schema matching the backend schema exactly
const loginFormSchema = z
  .object({
    email: z
      .string()
      .email("Invalid email format")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .min(10, "Phone number is invalid")
      .optional()
      .or(z.literal("")),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.email || data.phone, {
    message: "Email or phone number is required",
    path: ["email"],
  });

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function Login() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const registeredSuccess = searchParams.get("registered") === "true";

  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState("personal");
  const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
    },
  });

  const handleMethodChange = (method: "phone" | "email") => {
    setLoginMethod(method);
    setSubmitError(null);
    clearErrors();
    if (method === "phone") {
      setValue("email", "");
    } else {
      setValue("phone", "");
    }
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await loginAction({
      ...values,
      accountType,
    });

    if (!result.success) {
      setSubmitError(result.message);
      if (result.errors) {
        Object.entries(result.errors).forEach(([key, msg]) => {
          if (key === "email" && loginMethod === "email") {
            setError("email", { message: msg });
          } else if (key === "phone" && loginMethod === "phone") {
            setError("phone", { message: msg });
          } else if (key === "password") {
            setError("password", { message: msg });
          }
        });
      }
      setIsSubmitting(false);
    } else {
      router.replace("/");
      router.refresh();
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {/* Notification Banner */}
      {registeredSuccess && !submitError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-emerald-300 text-sm">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
          <div>
            <p className="font-semibold">Registration Successful!</p>
            <p className="text-xs text-emerald-300/80">
              Please login with your credentials.
            </p>
          </div>
        </div>
      )}

      {/* Form Action State Banner */}
      {submitError && (
        <div className="mb-6 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-destructive-foreground text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
          <p className="font-medium text-destructive-foreground/90">
            {submitError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Login Method Sub-Tabs */}
        <div className="space-y-2">
          <Label className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Login With
          </Label>
          <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-white/5 border border-white/5">
            <button
              type="button"
              onClick={() => handleMethodChange("phone")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                loginMethod === "phone"
                  ? "bg-white/10 text-white border border-white/5"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" /> Phone
            </button>
            <button
              type="button"
              onClick={() => handleMethodChange("email")}
              className={`py-1.5 px-3 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 ${
                loginMethod === "email"
                  ? "bg-white/10 text-white border border-white/5"
                  : "text-muted-foreground hover:text-white"
              }`}
            >
              <Mail className="h-3.5 w-3.5" /> Email
            </button>
          </div>
        </div>

        {/* Phone Number Input */}
        {loginMethod === "phone" && (
          <div className="space-y-2">
            <Label
              htmlFor="phone"
              className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
            >
              Mobile Number
            </Label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-muted-foreground pr-2 border-r border-white/10">
                <div className="flex flex-col w-4 h-2.5 rounded-[1px] overflow-hidden border border-white/10 shrink-0">
                  <div className="h-[45%] bg-[#006a4e]" />
                  <div className="relative h-[55%] bg-[#006a4e]">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#f42a41] rounded-full" />
                  </div>
                </div>
                <span className="text-xs font-bold text-white/80">+880</span>
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="1XXXXXXXX"
                maxLength={10}
                className={`pl-20 h-12 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                  errors.phone
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }`}
                {...register("phone")}
              />
              <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
            </div>
            {errors.phone && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.phone.message}
              </p>
            )}
          </div>
        )}

        {/* Email Input */}
        {loginMethod === "email" && (
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
            >
              Email Address
            </Label>
            <div className="relative group">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className={`pl-10 h-12 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                  errors.email
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }`}
                {...register("email")}
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
            </div>
            {errors.email && (
              <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.email.message}
              </p>
            )}
          </div>
        )}

        {/* Password Input */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label
              htmlFor="password"
              className="text-xs font-semibold tracking-wider text-muted-foreground uppercase"
            >
              Password
            </Label>
            <Link
              href="/forgot-password"
              className="text-xs font-semibold text-secondary hover:text-secondary/80 transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative group">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              className={`pl-10 pr-10 h-12 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                errors.password
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : ""
              }`}
              {...register("password")}
            />
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-12 rounded-xl text-base font-bold bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01] cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin" />
              Verifying Credentials...
            </span>
          ) : (
            "Secure Login"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-transparent px-3 text-muted-foreground font-semibold">
            New to PaySwift?
          </span>
        </div>
      </div>

      {/* Registration Link */}
      <Link href="/register" passHref className="w-full block">
        <Button
          variant="outline"
          type="button"
          className="w-full h-12 rounded-xl text-white border-white/10 bg-white/5 hover:bg-white/15 transition-all duration-300 cursor-pointer"
        >
          Create Account
        </Button>
      </Link>
    </div>
  );
}
