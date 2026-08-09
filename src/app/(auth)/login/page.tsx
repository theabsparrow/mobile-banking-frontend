"use client";

import React, { Suspense } from "react";
import Login from "@/components/auth/login/Login";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center p-4 text-white">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground mt-2 font-medium">Loading PaySwift secure portal...</p>
        </div>
      }
    >
      <Login />
    </Suspense>
  );
}
