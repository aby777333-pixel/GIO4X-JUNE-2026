import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GIO4X Trader Area",
  description: "Client + IB portal for GIO4X traders and partners.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
