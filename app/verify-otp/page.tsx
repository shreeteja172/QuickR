"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

function VerifyOtpForm() {
  const router = useRouter();
  const search = useSearchParams();
  const queryEmail = search?.get("email") || "";

  const [email] = useState(queryEmail);
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[0-9]{6}$/.test(otp.trim())) {
      toast.error("Enter the 6-digit code sent to your email.");
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
        toast.success("A new code has been sent to your email.");
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
    <main className="min-h-screen bg-cream-light px-4 py-8 text-ink sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-md items-center">
        <section className="w-full rounded-lg border border-beige-deep bg-cream p-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-cream-deeper px-3 py-1">
              <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                QuickR
              </span>
            </span>
            <h1 className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-0.5px] text-ink sm:text-[52px]">
              Verify your email
            </h1>
            <p className="mt-2 text-sm leading-[1.55] text-slate">
              We sent a 6-digit verification code to <strong>{email}</strong>. Enter it below to complete your registration.
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleVerify}>
            <div>
              <label
                className="block text-sm font-medium text-slate"
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
                 className="mt-2 w-full h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-lg tracking-widest text-center text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="123456"
                maxLength={6}
                required
                autoFocus
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center rounded-md bg-primary px-4 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? "Verifying..." : "Verify"}
              </button>

              <button
                type="button"
                onClick={handleResend}
                disabled={isResending}
                className="inline-flex flex-1 items-center justify-center rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm font-medium text-ink transition hover:bg-surface disabled:cursor-not-allowed disabled:opacity-60 sm:flex-initial"
              >
                {isResending ? "Sending..." : "Resend code"}
              </button>
            </div>
          </form>

          <p className="mt-6 text-sm text-stone">
            Didn&apos;t get a code? Check your spam folder or click Resend code.
          </p>
        </section>
      </div>
      <div className="mt-8 h-4 w-full bg-gradient-to-r from-sunshine-700 via-sunshine-500 via-sunshine-300 to-yellow-saturated" />
      <div className="h-4 w-full bg-gradient-to-r from-yellow-saturated via-cream-deeper to-cream" />
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-light px-4 py-8 text-ink sm:px-6 sm:py-12">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
            <section className="w-full rounded-lg border border-beige-deep bg-cream p-6">
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
