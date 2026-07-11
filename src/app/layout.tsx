import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THSEX",
  description: "THSEX mobile download",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
