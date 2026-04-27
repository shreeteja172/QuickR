"use client";

import { signInWithGoogle } from "@/lib/auth-client";
import { useState } from "react";

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleGoogleLogin = async () => {
    setAuthError("");
    setIsLoading(true);

    try {
      const result = await signInWithGoogle("/dashboard");

      if (result?.error) {
        setAuthError(result.error.message || "Unable to continue with Google.");
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
    } catch (error) {
      if (error instanceof Error && error.message) {
        setAuthError(error.message);
      } else {
        setAuthError("Unable to continue with Google. Please try again.");
      }
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_12%_16%,#dff4ff_0%,#f8fbff_34%,#f8fff6_63%,#ffffff_100%)] px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/40 blur-3xl" />

      <section className="relative mx-auto grid min-h-[85vh] w-full max-w-5xl items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quickr Access
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Secure sign-in,
            <br />
            instant dashboard access
          </h1>
          <p className="mt-4 max-w-lg text-sm leading-6 text-slate-600">
            Authenticate with Google and jump straight into your QR workspace.
            No extra setup, no manual redirect steps.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              OAuth Ready
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Session Protected
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Dashboard Redirect
            </span>
          </div>
        </article>

        <aside className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-[0_30px_80px_-55px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold text-slate-700">
            Continue to Quickr
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Sign in with Google
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            We only use your Google account for authentication and secure
            session management.
          </p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            aria-busy={isLoading}
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6a6 6 0 1 1 0-12c2.3 0 3.9 1 4.8 1.8l3.3-3.2C18.1 2.4 15.3 1.3 12 1.3a10.7 10.7 0 1 0 0 21.4c6.1 0 10.1-4.3 10.1-10.4 0-.7-.1-1.3-.2-2H12Z"
              />
            </svg>
            {isLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          <p className="mt-4 text-xs text-slate-500">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>

          {authError && (
            <p
              className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
              role="alert"
            >
              {authError}
            </p>
          )}
        </aside>
      </section>
    </main>
  );
}
