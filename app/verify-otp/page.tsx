"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import { signInWithEmail } from "@/lib/auth-client";

function VerifyOtpForm() {
  const router = useRouter();
  const search = useSearchParams();
  const queryEmail = search?.get("email") || "";

  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("signup_email");
      return queryEmail || stored || "";
    }
    return queryEmail || "";
  });
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[0-9]{4,6}$/.test(otp.trim())) {
      toast.error("Enter the 4–6 digit code sent to your email.");
      return;
    }

    setIsSubmitting(true);
    try {
      const { data } = await axios.post("/api/verify-otp", {
        email,
        otp: otp.trim(),
      });
      if (data?.success) {
        toast.success("Email verified — welcome!");
        localStorage.removeItem("signup_email");
        const storedPw = localStorage.getItem("signup_password");
        if (storedPw) {
          try {
            await signInWithEmail({ email, password: storedPw });
            localStorage.removeItem("signup_password");
            router.replace("/dashboard");
            return;
          } catch (err) {
            console.warn("Auto sign-in failed after verification", err);
          }
        }

        router.replace("/signin?email=" + encodeURIComponent(email));
      } else {
        toast.error(data?.error || "Verification failed");
      }
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : err instanceof Error
            ? err.message
            : String(err);
      toast.error(message || "Unable to verify");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleResend() {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email to resend the code.");
      return;
    }

    setIsResending(true);
    try {
      const { data } = await axios.post("/api/resend-otp", { email });
      if (data?.success) {
        toast.success("Verification code resent — check your inbox.");
      } else {
        toast.error(data?.error || "Unable to resend code");
      }
    } catch (err: unknown) {
      const message =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : err instanceof Error
            ? err.message
            : String(err);
      toast.error(message || "Unable to resend");
    } finally {
      setIsResending(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.12)] sm:p-8">
          <div>
            <p className="text-sm font-semibold tracking-[0.14em] text-slate-500 uppercase">
              QuickR
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
              Verify your email
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Enter the verification code we sent to your email to finish setup.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleVerify}>
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
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                placeholder="name@company.com"
                required
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium text-slate-700"
                htmlFor="otp"
              >
                Verification code
              </label>
              <input
                id="otp"
                name="otp"
                inputMode="numeric"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-lg tracking-widest text-center text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-cyan-400 focus:ring-4 focus:ring-cyan-100"
                placeholder="123456"
                maxLength={6}
                required
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-800 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isResending ? "Resending..." : "Resend code"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-slate-600">
            Didn&apos;t get a code? Check your spam folder or click Resend code.
          </p>
        </section>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
            <section className="w-full rounded-3xl border border-slate-200 bg-white p-6">
              <p>Loading...</p>
            </section>
          </div>
        </main>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
}
