"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 mx-auto w-full max-w-6xl px-4 sm:px-6">
      <div className="relative rounded-2xl border border-slate-200/80 bg-white/85 px-4 py-3 shadow-[0_12px_40px_-16px_rgba(15,23,42,0.2)] backdrop-blur-md">
        <div className="flex items-center justify-between gap-4">
          <Link href={session ? "/dashboard" : "/"} className="flex items-center gap-3">
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
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-2 text-sm font-medium text-white transition hover:bg-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                Sign in
              </Link>
            )}
          </nav>
        </div>

        {open && (
          <div className="md:hidden mt-4 pt-4 border-t border-slate-200">
            <div className="space-y-1">
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
