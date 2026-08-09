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

  return <Dashboard user={user} />;
}
