import React from "react";
import { cookies } from "next/headers";
import Dashboard from "@/components/Dashboard";

export default async function HomePage() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  
  let user = null;
  if (sessionCookie) {
    try {
      user = JSON.parse(sessionCookie);
    } catch (e) {
      console.error("Failed to parse session cookie:", e);
    }
  }

  return (
    <main
      className="relative flex-1 flex flex-col justify-start bg-cover bg-center overflow-x-hidden min-h-screen"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(8, 1, 8, 0.85), rgba(12, 1, 12, 0.95)), url('/images/auth-bg.jpg')`,
      }}
    >
      {/* Background Decorative Glows */}
      <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[130px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />

      <Dashboard user={user} />
    </main>
  );
}
