import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, #FFFFFF 0%, #F4F7FB 45%, #E9F1FA 75%, #F4F5F7 100%)",
          }}
        />
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(41,171,226,0.22) 0%, rgba(41,171,226,0.08) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="pointer-events-none absolute -left-40 -bottom-40 h-[440px] w-[440px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.16) 0%, rgba(201,168,76,0.05) 40%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <header className="flex items-center justify-between px-6 py-5">
        <Link href="/" aria-label="GIO4X home">
          <Image
            src="/logo.png"
            alt="GIO4X"
            width={2924}
            height={976}
            priority
            className="h-9 w-auto"
          />
        </Link>
        <Link
          href="https://lustrous-youtiao-52c8ea.netlify.app"
          target="_blank"
          rel="noreferrer"
          className="text-xs font-medium text-steel hover:text-sky"
        >
          ← gio4x.com
        </Link>
      </header>

      <main className="flex min-h-[calc(100vh-100px)] items-center justify-center px-4 pb-12">
        {children}
      </main>
    </div>
  );
}
