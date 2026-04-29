"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signInWithGoogle, signUpWithEmail } from "@/lib/auth-client";

type FieldTouched = {
  name: boolean;
  email: boolean;
  password: boolean;
};

function validateName(name: string) {
  if (!name.trim()) return "Enter your name.";
  if (name.trim().length < 2) return "Name must be at least 2 characters.";
  return "";
}

function validateEmail(email: string) {
  if (!email.trim()) return "Enter your email address.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim()))
    return "Enter a valid email address.";
  return "";
}

function validatePassword(password: string) {
  if (!password) return "Create a password.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return "";
}

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldTouched, setFieldTouched] = useState<FieldTouched>({
    name: false,
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeAction, setActiveAction] = useState<"email" | "google" | null>(
    null,
  );
  const [authError, setAuthError] = useState("");

  const signUpMutation = useMutation({
    mutationFn: (input: {
      name: string;
      email: string;
      password: string;
      callbackURL?: string;
    }) => signUpWithEmail(input),
    onSuccess() {
      toast.success(
        "Account created — check your email for a verification code",
      );
    },
    onError(err: Error) {
      const message = err.message || String(err);
      setAuthError(message);
      toast.error(message);
    },
  });

  const errors = useMemo(
    () => ({
      name: validateName(name),
      email: validateEmail(email),
      password: validatePassword(password),
    }),
    [email, name, password],
  );

  const hasErrors = Boolean(errors.name || errors.email || errors.password);
  const canSubmit =
    !isSubmitting &&
    name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(email.trim()) &&
    password.length >= 8;

  async function handleEmailSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setFieldTouched({ name: true, email: true, password: true });

    if (hasErrors) {
      setAuthError("Fix the highlighted fields and try again.");
      return;
    }

    setAuthError("");
    setIsSubmitting(true);
    setActiveAction("email");

    try {
      await signUpMutation.mutateAsync({
        name: name.trim(),
        email: email.trim(),
        password,
        callbackURL: "/dashboard",
      });

      localStorage.setItem("signup_email", email.trim());
      router.replace(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
    } catch (error) {
      setAuthError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to create your account right now.",
      );
    } finally {
      setIsSubmitting(false);
      setActiveAction(null);
    }
  }

  async function handleGoogleSignup() {
    setAuthError("");
    setIsSubmitting(true);
    setActiveAction("google");

    try {
      const result = await signInWithGoogle("/dashboard");

      if (result?.error) {
        setAuthError(result.error.message || "Unable to continue with Google.");
        return;
      }

      router.replace("/dashboard");
    } catch (error) {
      setAuthError(
        error instanceof Error && error.message
          ? error.message
          : "Unable to continue with Google.",
      );
    } finally {
      setIsSubmitting(false);
      setActiveAction(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.25)] sm:p-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-slate-500 uppercase">
              QuickR
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Create and manage QR codes in seconds
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sign up to save QR codes, revisit history, and download PNGs from
              one place.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleEmailSignup}>
            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="name"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={() =>
                  setFieldTouched((current) => ({ ...current, name: true }))
                }
                aria-invalid={Boolean(fieldTouched.name && errors.name)}
                aria-describedby={
                  fieldTouched.name && errors.name ? "name-error" : undefined
                }
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                placeholder="Your name"
                type="text"
              />
              {fieldTouched.name && errors.name && (
                <p
                  id="name-error"
                  className="mt-2 text-xs text-red-600"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

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
                  setFieldTouched((current) => ({ ...current, email: true }))
                }
                aria-invalid={Boolean(fieldTouched.email && errors.email)}
                aria-describedby={
                  fieldTouched.email && errors.email ? "email-error" : undefined
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
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                onBlur={() =>
                  setFieldTouched((current) => ({ ...current, password: true }))
                }
                aria-invalid={Boolean(fieldTouched.password && errors.password)}
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
              disabled={!canSubmit || signUpMutation.isPending}
              aria-busy={signUpMutation.isPending}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {signUpMutation.isPending ? "Creating account..." : "Continue"}
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
            onClick={handleGoogleSignup}
            disabled={isSubmitting}
            aria-busy={isSubmitting && activeAction === "google"}
            className="inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
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
            Already have an account?{" "}
            <Link
              href="/signin"
              className="font-medium text-slate-900 hover:underline"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
