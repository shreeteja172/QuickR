"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const hideAuthCTA = pathname === "/signup" || pathname === "/signin";
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6">
      <div ref={menuRef} className="pointer-events-auto w-full max-w-[1280px] rounded-lg border border-hairline-soft bg-canvas/90 backdrop-blur-md px-5 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
        <div className="flex items-center justify-between gap-4">
        <Link
          href={session ? "/dashboard" : "/"}
          className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:rounded"
        >
          <Image
            src="/logo.png"
            alt="QuickR home"
            width={48}
            height={48}
            priority
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

        <nav aria-label="Main navigation" className="flex items-center gap-4">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex items-center gap-2 rounded-md border border-hairline bg-canvas/80 px-3 py-2 text-sm text-slate md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              {open ? (
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          <div className="hidden md:flex md:items-center md:gap-6">
            {isPending ? (
              <>
                <div className="h-4 w-16 animate-pulse rounded bg-surface-code/10" aria-hidden="true" />
                <div className="h-4 w-14 animate-pulse rounded bg-surface-code/10" aria-hidden="true" />
                <div className="h-4 w-14 animate-pulse rounded bg-surface-code/10" aria-hidden="true" />
              </>
            ) : session ? (
              <>
                <Link
                  href="/dashboard"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/qr"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  History
                </Link>
                <Link
                  href="/dashboard/settings"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  Settings
                </Link>
                <a
                  href="https://github.com/shreeteja172/quickr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="QuickR on GitHub"
                  className="transition hover:text-ink text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
              </>
            ) : (
              <>
                <a
                  href="#features"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  How it works
                </a>
                <a
                  href="#use-cases"
                  className="transition hover:text-ink text-sm font-medium text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  Use cases
                </a>
                <a
                  href="https://github.com/shreeteja172/quickr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="QuickR on GitHub"
                  className="transition hover:text-ink text-steel focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
              </>
            )}
          </div>

          {isPending ? (
            <div className="flex items-center gap-3">
              <div className="h-8 w-16 animate-pulse rounded-md bg-surface-code/10" aria-hidden="true" />
            </div>
          ) : session ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/create"
                className="hidden sm:inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-on-primary transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                New QR
              </Link>
              <div className="hidden sm:block h-5 w-px bg-hairline" aria-hidden="true" />
              <button
                onClick={handleSignOut}
                className="inline-flex items-center justify-center rounded-md border border-hairline bg-canvas/80 px-4 py-2 text-sm font-medium text-slate transition hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Sign out
              </button>
            </div>
          ) : (
            !hideAuthCTA && (
              <Link
                href="/signin"
                className="inline-flex items-center justify-center rounded-md bg-ink px-5 py-2 text-sm font-medium text-on-dark transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
              >
                Sign in
              </Link>
            )
          )}
        </nav>
        </div>

      {open && (
        <div id="mobile-menu" role="menu" className="md:hidden mt-4 pt-4 border-t border-hairline">
          <div className="space-y-1">
            {isPending ? null : session ? (
              <>
                <Link
                  href="/dashboard"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/dashboard/qr"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  History
                </Link>
                <Link
                  href="/dashboard/create"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  New QR
                </Link>
                <Link
                  href="/dashboard/settings"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  Settings
                 </Link>
                 <a
                   href="https://github.com/shreeteja172/quickr"
                   target="_blank"
                   rel="noopener noreferrer"
                   role="menuitem"
                   className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                   onClick={() => setOpen(false)}
                 >
                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                   </svg>
                   GitHub
                  </a>
              </>
            ) : (
              <>
                 <a
                   href="#features"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  How it works
                </a>
                <a
                  href="#use-cases"
                  role="menuitem"
                  className="block rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  onClick={() => setOpen(false)}
                >
                  Use cases
                 </a>
                 <a
                   href="https://github.com/shreeteja172/quickr"
                   target="_blank"
                   rel="noopener noreferrer"
                   role="menuitem"
                   className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-slate hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                   onClick={() => setOpen(false)}
                 >
                   <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                     <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                   </svg>
                   GitHub
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
