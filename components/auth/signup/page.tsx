"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { signInWithGoogle, signUpWithEmail } from "@/lib/auth-client";
import Header from "@/components/layout/Header";

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
      toast.success("Account created — check your email for a verification code");
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

      router.replace("/dashboard");
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
    setActiveAction("google");

    try {
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
      <main className="min-h-screen bg-cream-light px-4 pt-20 pb-0 text-ink sm:px-6 sm:pt-24 lg:pt-28">
        <div className="mx-auto min-h-[calc(100vh-8rem)] w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="p-6 sm:p-12">
              <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-sunshine-300 via-sunshine-500 to-sunshine-700 p-10">
                <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-sunshine-300/30 blur-[80px]" />
                <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-sunshine-500/15 blur-[80px]" />
                <div className="relative">
                  <div className="flex items-center gap-4">
                    <Image
                      src="/logo.png"
                      alt="QuickR"
                      width={72}
                      height={72}
                    />
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink/70">
                        QuickR
                      </p>
                      <h3 className="font-[family-name:var(--font-dm-serif)] mt-1 text-2xl leading-tight text-ink">
                        Create QR codes in seconds
                      </h3>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-[1.55] text-ink/80 max-w-md">
                    Save codes, revisit history, and export clean PNGs for print
                    and web. Built for speed and simplicity.
                  </p>

                  <ul className="mt-6 space-y-4">
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-ink" />
                      <div>
                        <p className="text-sm font-medium">Fast generation</p>
                        <p className="text-xs text-ink/70">
                          Instant preview and export.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-ink" />
                      <div>
                        <p className="text-sm font-medium">Save & organize</p>
                        <p className="text-xs text-ink/70">
                          Keep your codes in a workspace.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="mt-1 h-3 w-3 rounded-full bg-ink" />
                      <div>
                        <p className="text-sm font-medium">
                          High-res exports
                        </p>
                        <p className="text-xs text-ink/70">
                          PNG optimized for print.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center p-6">
              <section className="w-full max-w-md rounded-lg border border-beige-deep bg-cream p-8">
                <div className="mb-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                    Create account
                  </p>
                  <h4 className="font-[family-name:var(--font-dm-serif)] mt-1 text-2xl tracking-[-0.5px] text-ink">
                    Get started — it&apos;s free
                  </h4>
                </div>

                <form className="mt-2 space-y-4" onSubmit={handleEmailSignup}>
                  <div>
                    <label
                      className="block text-sm font-medium text-slate"
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
                        setFieldTouched((current) => ({
                          ...current,
                          name: true,
                        }))
                      }
                      aria-invalid={Boolean(fieldTouched.name && errors.name)}
                      aria-describedby={
                        fieldTouched.name && errors.name
                          ? "name-error"
                          : undefined
                      }
                      className="mt-2 w-full h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                      className="block text-sm font-medium text-slate"
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
                       className="mt-2 w-full h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                      className="block text-sm font-medium text-slate"
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
                       className="mt-2 w-full h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
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
                      className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                      role="alert"
                    >
                      {authError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={!canSubmit || signUpMutation.isPending}
                    aria-busy={signUpMutation.isPending}
                    className="w-full inline-flex items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {signUpMutation.isPending
                      ? "Creating account..."
                      : "Continue"}
                  </button>

                  <div className="flex items-center gap-4">
                    <div className="h-px flex-1 bg-hairline" />
                    <span className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                      Or continue with
                    </span>
                    <div className="h-px flex-1 bg-hairline" />
                  </div>

                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    disabled={isSubmitting}
                    aria-busy={isSubmitting && activeAction === "google"}
                    className="w-full inline-flex items-center justify-center gap-3 rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
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

                  <p className="text-center text-sm text-stone">
                    Already have an account?{" "}
                    <Link
                      href="/signin"
                      className="font-medium text-primary hover:underline"
                    >
                      Sign in
                    </Link>
                  </p>
                </form>
              </section>
            </div>
          </div>
        </div>
      </main>
      <div className="h-4 w-full bg-gradient-to-r from-sunshine-700 via-sunshine-500 via-sunshine-300 to-yellow-saturated" />
      <div className="h-4 w-full bg-gradient-to-r from-yellow-saturated via-cream-deeper to-cream" />
    </>
  );
}
