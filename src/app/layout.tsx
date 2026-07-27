import type { Metadata } from "next";
import "./globals.css";



export const metadata: Metadata = {
  title: "Mobile Banking",
  description: "This is the web application of the mobile banking website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div>{children}</div>;
}
