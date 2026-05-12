"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-20 w-full border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-5 lg:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-sm font-semibold text-white">
            QR
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
              QuickR
            </span>
            <span className="block text-sm text-slate-600">
              QR Code Generator
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
            <a
              href="#features"
              className="transition hover:text-slate-950 text-sm text-slate-600"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="transition hover:text-slate-950 text-sm text-slate-600"
            >
              How it works
            </a>
            <a
              href="#use-cases"
              className="transition hover:text-slate-950 text-sm text-slate-600"
            >
              Use cases
            </a>
          </div>

          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
          >
            Sign in
          </Link>
        </nav>
      </div>

      {open && (
        <div className="md:hidden">
          <div className="mx-auto mt-3 max-w-7xl space-y-2 px-4 pb-4">
            <a
              href="#features"
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              How it works
            </a>
            <a
              href="#use-cases"
              className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Use cases
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
