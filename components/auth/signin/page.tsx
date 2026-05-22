"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signInWithGoogle, signInWithEmail } from "@/lib/auth-client";
import Header from "@/components/layout/Header";

type FieldTouched = {
  email: boolean;
  password: boolean;
};

function validateEmail(email: string) {
  if (!email.trim()) return "Enter your email address.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim()))
    return "Enter a valid email address.";
  return "";
}

function validatePassword(password: string) {
  if (!password) return "Enter your password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return "";
}

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryEmail = searchParams?.get("email") || "";
  const [email, setEmail] = useState(queryEmail);
  const [password, setPassword] = useState("");
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAction, setActiveAction] = useState<"email" | "google" | null>(
    null,
  );
  const [authError, setAuthError] = useState("");

  const signInMutation = useMutation({
    mutationFn: (input: {
      email: string;
      password: string;
      callbackURL?: string;
    }) => signInWithEmail(input),
    onSuccess() {
      toast.success("Signed in successfully!");
    },
    onError(err: Error) {
      const message = err.message || String(err);
      setAuthError(message);
      toast.error(message);
    },
  });

  const errors = useMemo(
    () => ({
      email: validateEmail(email),
      password: validatePassword(password),
    }),
    [email, password],
  );

  const hasErrors = Boolean(errors.email || errors.password);
  const canSubmit =
    !isSubmitting &&
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    password.length >= 8;

  async function handleEmailSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setFieldTouched({ email: true, password: true });

    if (hasErrors) {
      setAuthError("Fix the highlighted fields and try again.");
      return;
    }

    setAuthError("");
    setIsSubmitting(true);
    setActiveAction("email");

    try {
      await signInMutation.mutateAsync({
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      });

      // Redirect after successful login
      router.replace("/dashboard");
    } catch (error) {
      setAuthError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to sign in right now.",
      );
    } finally {
      setIsSubmitting(false);
      setActiveAction(null);
    }
  }

  async function handleGoogleSignIn() {
    setAuthError("");
    setActiveAction("google");

    try {
      // Don't await - OAuth redirect should happen immediately
      signInWithGoogle("/dashboard");
    } catch (error) {
      setAuthError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to continue with Google.",
      );
      setIsSubmitting(false);
      setActiveAction(null);
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50 px-4 pt-20 pb-8 text-slate-950 sm:px-6 sm:pt-24 sm:pb-12 lg:pt-28">
        <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 sm:p-12">
              <div className="rounded-2xl overflow-hidden bg-linear-to-br from-slate-800 via-cyan-700 to-emerald-500 text-white p-8 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 flex items-center justify-center rounded-lg bg-white/10">
                    <span className="font-bold">QR</span>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em]">
                      Welcome back
                    </p>
                    <h3 className="mt-1 text-2xl font-extrabold leading-tight">
                      Sign in to your workspace
                    </h3>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-white/90 max-w-md">
                  Access your saved QR codes, edit destinations, and download
                  high-res exports. Your workspace stays in sync across devices.
                </p>

                <ul className="mt-6 space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-white/90" />
                    <div>
                      <p className="text-sm font-semibold">Secure sessions</p>
                      <p className="text-xs text-white/80">
                        Protected by industry-standard auth.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 rounded-full bg-white/90" />
                    <div>
                      <p className="text-sm font-semibold">Sync history</p>
                      <p className="text-xs text-white/80">
                        All your codes in one place.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="order-2 lg:order-2 flex items-center justify-center p-6">
              <section className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-6 shadow-xl sm:p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-semibold tracking-[0.12em] text-slate-400 uppercase">
                      Sign in
                    </p>
                    <h4 className="mt-1 text-xl font-semibold text-slate-900">
                      Welcome back — enter your details
                    </h4>
                  </div>
                </div>

                <form className="mt-2 space-y-4" onSubmit={handleEmailSignIn}>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      autoComplete="email"
                      inputMode="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      onBlur={() =>
                        setFieldTouched((current) => ({
                          ...current,
                          email: true,
                        }))
                      }
                      aria-invalid={Boolean(fieldTouched.email && errors.email)}
                      aria-describedby={
                        fieldTouched.email && errors.email
                          ? "email-error"
                          : undefined
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      placeholder="name@company.com"
                      type="email"
                    />
                    {fieldTouched.email && errors.email && (
                      <p
                        id="email-error"
                        className="mt-2 text-xs text-red-600"
                        role="alert"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium text-slate-700"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      onBlur={() =>
                        setFieldTouched((current) => ({
                          ...current,
                          password: true,
                        }))
                      }
                      aria-invalid={Boolean(
                        fieldTouched.password && errors.password,
                      )}
                      aria-describedby={
                        fieldTouched.password && errors.password
                          ? "password-error"
                          : undefined
                      }
                      className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                      placeholder="At least 8 characters"
                      type="password"
                    />
                    {fieldTouched.password && errors.password && (
                      <p
                        id="password-error"
                        className="mt-2 text-xs text-red-600"
                        role="alert"
                      >
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {authError && (
                    <p
                      className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      role="alert"
                    >
                      {authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit || signInMutation.isPending}
                    aria-busy={signInMutation.isPending}
                    className="w-full inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signInMutation.isPending ? "Signing in..." : "Continue"}
                  </button>
                </form>

                <div className="my-6 flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                    Or continue with
                  </span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isSubmitting}
                  aria-busy={isSubmitting && activeAction === "google"}
                  className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                  >
                    <path
                      fill="#4285F4"
                      d="M21.35 11.1h-9.18v2.8h5.27c-.23 1.4-1.62 4.1-5.27 4.1a5.98 5.98 0 1 1 0-11.96c1.7 0 2.84.72 3.49 1.33l2.38-2.3C16.56 3.62 14.65 2.8 12.17 2.8a9.2 9.2 0 1 0 0 18.4c5.26 0 8.74-3.69 8.74-8.9 0-.6-.07-1.04-.18-1.2Z"
                    />
                  </svg>
                  {isSubmitting && activeAction === "google"
                    ? "Continuing..."
                    : "Continue with Google"}
                </button>

                <p className="mt-6 text-center text-sm text-slate-500">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-medium text-slate-900 hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
