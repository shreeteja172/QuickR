"use client";

import { useState } from "react";

export default function Page() {
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleGoogleLogin = () => {
    setIsRedirecting(true);
    window.location.assign("/api/auth/signin/google");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[linear-gradient(130deg,#f2f8ff_0%,#ffffff_55%,#f4fff5_100%)] px-4 py-12">
      <div className="pointer-events-none absolute -left-28 top-6 h-56 w-56 rounded-full bg-blue-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -right-16 bottom-4 h-64 w-64 rounded-full bg-emerald-200/45 blur-3xl" />

      <section className="relative w-full max-w-md rounded-3xl border border-slate-200/70 bg-white/90 p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.45)] backdrop-blur-sm">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Quickr
        </p>
        <h1 className="text-3xl font-semibold text-slate-900">
          Sign in to continue
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          Use your Google account to securely access your workspace.
        </p>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={isRedirecting}
          aria-busy={isRedirecting}
          className="mt-8 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
          aria-label="Continue with Google"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
            <path
              fill="#EA4335"
              d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6a6 6 0 1 1 0-12c2.3 0 3.9 1 4.8 1.8l3.3-3.2C18.1 2.4 15.3 1.3 12 1.3a10.7 10.7 0 1 0 0 21.4c6.1 0 10.1-4.3 10.1-10.4 0-.7-.1-1.3-.2-2H12Z"
            />
          </svg>
          {isRedirecting ? "Redirecting..." : "Continue with Google"}
        </button>

        <p className="mt-5 text-xs text-slate-500">
          By continuing, you agree to the Terms of Service and Privacy Policy.
        </p>
      </section>
    </main>
  );
}
