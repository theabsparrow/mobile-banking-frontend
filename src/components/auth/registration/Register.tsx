"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerAction } from "@/app/actions";
import { Role } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Loader2,
  Mail,
  ScanLine,
  Camera,
  UserCheck,
  Check,
  X,
  FileCheck,
} from "lucide-react";
import {
  passwordRules,
  registerFormSchema,
  RegisterFormValues,
} from "./registrationSchema";

export default function Register() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role>(Role.CUSTOMER);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // NID Scan Simulation States
  const [nidFile, setNidFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [nidScanned, setNidScanned] = useState(false);
  const [scannedName, setScannedName] = useState("");

  // React Hook Form initialization
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password", "");

  // Simulating the NID Card Scanner
  const handleNidSimulate = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNidFile(e.target.files[0]);
      setIsScanning(true);
      setScanProgress(0);

      const interval = setInterval(() => {
        setScanProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsScanning(false);
              setNidScanned(true);
              setScannedName("JHON DOE");
            }, 600);
            return 100;
          }
          return prev + 10;
        });
      }, 120);
    }
  };

  const onSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      ...values,
      role: selectedRole,
    };

    const result = await registerAction(payload);

    if (!result.success) {
      setSubmitError(result.message);
      if (result.errors) {
        Object.entries(result.errors).forEach(([key, msg]) => {
          if (key === "email") {
            setError("email", { message: msg });
          } else if (key === "phone") {
            setError("phone", { message: msg });
          } else if (key === "password") {
            setError("password", { message: msg });
          } else if (key === "confirmPassword") {
            setError("confirmPassword", { message: msg });
          }
        });
      }
      setIsSubmitting(false);
    } else {
      router.push("/login?registered=true");
    }
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      {submitError && (
        <div className="mb-5 flex items-start gap-3 rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-destructive-foreground text-sm">
          <AlertCircle className="h-5 w-5 shrink-0 text-destructive mt-0.5" />
          <p className="font-medium text-destructive-foreground/90">
            {submitError}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="space-y-1.5">
          <Label
            htmlFor="email"
            className="text-xs font-semibold text-muted-foreground"
          >
            Email Address
          </Label>
          <div className="relative group">
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`pl-10 h-11 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                errors.email
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : ""
              }`}
              {...register("email")}
            />
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
          </div>
          {errors.email && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone Number Input (Optional) */}
        <div className="space-y-1.5">
          <Label
            htmlFor="phone"
            className="text-xs font-semibold text-muted-foreground"
          >
            Mobile Number (Optional)
          </Label>
          <div className="relative group">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-muted-foreground pr-2 border-r border-white/10">
              <div className="flex flex-col w-4 h-2.5 rounded-[1px] overflow-hidden border border-white/10 shrink-0">
                <div className="h-[45%] bg-[#006a4e]" />
                <div className="relative h-[55%] bg-[#006a4e]">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-[#f42a41] rounded-full" />
                </div>
              </div>
              <span className="text-[11px] font-bold text-white/80">+880</span>
            </div>
            <Input
              id="phone"
              type="tel"
              placeholder="1XXXXXXXX"
              maxLength={10}
              className={`pl-19 h-11 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                errors.phone
                  ? "border-destructive focus-visible:ring-destructive/30"
                  : ""
              }`}
              {...register("phone")}
            />
            <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
          </div>
          {errors.phone && (
            <p className="text-xs text-destructive flex items-center gap-1 mt-1">
              <AlertCircle className="h-3.5 w-3.5" />
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Passwords Column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Password Input */}
          <div className="space-y-1.5">
            <Label
              htmlFor="password"
              className="text-xs font-semibold text-muted-foreground"
            >
              Password
            </Label>
            <div className="relative group">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Min 8 characters"
                className={`pl-10 pr-9 h-11 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                  errors.password
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }`}
                {...register("password")}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-1.5">
            <Label
              htmlFor="confirmPassword"
              className="text-xs font-semibold text-muted-foreground"
            >
              Confirm Password
            </Label>
            <div className="relative group">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm password"
                className={`pl-10 pr-9 h-11 bg-white/5 border-white/10 text-white rounded-xl placeholder:text-muted-foreground/40 focus-visible:ring-primary/40 focus-visible:border-primary transition-all duration-200 ${
                  errors.confirmPassword
                    ? "border-destructive focus-visible:ring-destructive/30"
                    : ""
                }`}
                {...register("confirmPassword")}
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/60 group-focus-within:text-primary transition-colors pointer-events-none" />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors cursor-pointer"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4.5 w-4.5" />
                ) : (
                  <Eye className="h-4.5 w-4.5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Password Validation Live Criteria Checklist */}
        {passwordValue.length > 0 && (
          <div className="p-3.5 rounded-2xl bg-white/2 border border-white/5 space-y-2 text-[11px] animate-fade-in">
            <p className="font-bold text-muted-foreground tracking-wide uppercase">
              Password Requirements:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-1.5">
              <div className="flex items-center gap-1.5">
                {passwordRules(passwordValue).length ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span
                  className={
                    passwordRules(passwordValue).length
                      ? "text-emerald-400 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  8 - 16 Characters
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {passwordRules(passwordValue).lowercase ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span
                  className={
                    passwordRules(passwordValue).lowercase
                      ? "text-emerald-400 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  1 Lowercase Letter
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {passwordRules(passwordValue).uppercase ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span
                  className={
                    passwordRules(passwordValue).uppercase
                      ? "text-emerald-400 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  1 Uppercase Letter
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {passwordRules(passwordValue).number ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span
                  className={
                    passwordRules(passwordValue).number
                      ? "text-emerald-400 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  1 Number
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                {passwordRules(passwordValue).specialChar ? (
                  <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                ) : (
                  <X className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                )}
                <span
                  className={
                    passwordRules(passwordValue).specialChar
                      ? "text-emerald-400 font-semibold"
                      : "text-muted-foreground"
                  }
                >
                  1 Special Character
                </span>
              </div>
            </div>
          </div>
        )}

        {errors.password && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.password.message}
          </p>
        )}
        {errors.confirmPassword && (
          <p className="text-xs text-destructive flex items-center gap-1">
            <AlertCircle className="h-3.5 w-3.5" />
            {errors.confirmPassword.message}
          </p>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start gap-2 pt-1">
          <Checkbox
            id="terms"
            required
            className="mt-0.5 border-white/20 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
          />
          <Label
            htmlFor="terms"
            className="text-xs text-muted-foreground leading-snug cursor-pointer select-none"
          >
            I verify that my email, phone, and role are correct, and accept
            PaySwift's .
          </Label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full h-11 rounded-xl text-base font-bold bg-linear-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.01] pt-0.5 cursor-pointer"
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Creating Secure Account...
            </span>
          ) : (
            "Verify & Create Account"
          )}
        </Button>
      </form>

      {/* Already registered redirect */}
      <div className="text-center mt-5">
        <p className="text-xs text-muted-foreground font-semibold">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-secondary hover:text-secondary/80 transition-colors ml-1 font-bold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
