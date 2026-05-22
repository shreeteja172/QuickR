"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

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
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="relative rounded-2xl border border-slate-200/80 bg-white px-4 py-3 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.2)]">
        <div className="flex items-center justify-between gap-4">
          <Link
            href={session ? "/dashboard" : "/"}
            className="flex items-center gap-3"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-950 text-sm font-semibold text-white">
              QR
            </span>
            <span className="hidden sm:block">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 leading-none">
                QuickR
              </span>
              <span className="block text-sm font-semibold text-slate-900 leading-tight mt-0.5">
                {session ? "Workspace" : "QR Code Generator"}
              </span>
            </span>
          </Link>

          <a
            href="https://github.com/shreeteja172/quickr"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 ml-2 text-sm text-slate-600 hover:text-slate-900"
            aria-label="QuickR on GitHub"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden
            >
              <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
            </svg>
            <span className="hidden md:inline">GitHub</span>
          </a>

          <div className="hidden md:block">
            <ThemeToggle />
          </div>

          <nav className="flex items-center gap-4">
            <button
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Toggle menu"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 md:hidden"
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
              {!isPending && session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/qr"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    History
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="#features"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    How it works
                  </a>
                  <a
                    href="#use-cases"
                    className="transition hover:text-slate-950 text-sm font-medium text-slate-600"
                  >
                    Use cases
                  </a>
                </>
              )}
            </div>

            {!isPending && session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/create"
                  className="hidden sm:inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  New QR
                </Link>
                <div className="hidden sm:block h-5 w-px bg-slate-200" />
                <button
                  onClick={handleSignOut}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-800 transition hover:border-slate-300 hover:bg-slate-100"
                >
                  Sign out
                </button>
              </div>
            ) : (
              !hideAuthCTA && (
                <Link
                  href="/signin"
                  className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                >
                  Sign in
                </Link>
              )
            )}
          </nav>
        </div>

        {open && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-1">
              <div className="pb-2">
                <ThemeToggle />
              </div>
              {!isPending && session ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/dashboard/qr"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    History
                  </Link>
                  <Link
                    href="/dashboard/create"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    New QR
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Settings
                  </Link>
                </>
              ) : (
                <>
                  <a
                    href="#features"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
                    onClick={() => setOpen(false)}
                  >
                    How it works
                  </a>
                  <a
                    href="#use-cases"
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
