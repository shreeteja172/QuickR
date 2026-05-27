"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hideAuthCTA = pathname === "/signup" || pathname === "/signin";

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6">
      <div className="pointer-events-auto w-full max-w-[1280px] rounded-lg border border-hairline-soft bg-canvas/90 backdrop-blur-md px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-4">
        <Link
          href={session ? "/dashboard" : "/"}
          className="flex items-center gap-3"
        >
          <Image
            src="/logo.png"
            alt="QuickR"
            width={48}
            height={48}
          />
          <span className="hidden sm:block">
            <span className="block text-[10px] font-semibold uppercase tracking-[0.12em] text-steel leading-none">
              QuickR
            </span>
            <span className="block text-sm font-medium text-ink leading-tight mt-0.5">
              {isPending ? "" : session ? "Workspace" : "QR Code Generator"}
            </span>
          </span>
        </Link>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas/80 px-3 py-2 text-sm text-slate md:hidden"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <span className="sr-only">Menu</span>
          </button>

          <div className="hidden md:flex md:items-center md:gap-6">
            {isPending ? (
              <>
                <div className="h-4 w-16 animate-pulse rounded bg-surface-code/10" />
                <div className="h-4 w-14 animate-pulse rounded bg-surface-code/10" />
                <div className="h-4 w-14 animate-pulse rounded bg-surface-code/10" />
              </>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/qr"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  History
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  Settings
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  How it works
                </a>
                <a
                  href="#use-cases"
                  className="transition hover:text-ink text-sm font-medium text-steel"
                >
                  Use cases
                </a>
              </>
            )}
          </div>

          {isPending ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-16 animate-pulse rounded-md bg-surface-code/10" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/create"
                className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary transition hover:bg-primary-deep"
              >
                New QR
              </Link>
              <div className="hidden sm:block h-5 w-px bg-hairline" />
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md border border-hairline bg-canvas/80 px-4 py-2 text-sm font-medium text-slate transition hover:bg-surface"
              >
                Sign out
              </button>
            </div>
          ) : (
            !hideAuthCTA && (
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-2 text-sm font-medium text-on-dark transition hover:bg-charcoal"
              >
                Sign in
              </Link>
            )
          )}
        </nav>
        </div>

      {open && (
        <div className="md:hidden mt-4 pt-4 border-t border-hairline">
          <div className="space-y-1">
            {isPending ? null : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/qr"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  History
                </Link>
                <Link
                  href="/dashboard/create"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  New QR
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Settings
                </Link>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  How it works
                </a>
                <a
                  href="#use-cases"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface"
                  onClick={() => setOpen(false)}
                >
                  Use cases
                </a>
              </>
            )}
          </div>
        </div>
      )}
      </div>
    </header>
  );
}
