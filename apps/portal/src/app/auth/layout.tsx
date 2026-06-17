import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/auth-bg.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ opacity: 0.55 }}
        />
        {/* Soft light wash over the photo so the sign-in card stays crisp. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(244,247,251,0.78) 45%, rgba(233,241,250,0.72) 75%, rgba(244,245,247,0.85) 100%)",
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
