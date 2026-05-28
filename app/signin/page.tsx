import type { Metadata } from "next";
import { Suspense } from "react";
import SignInPage from "@/components/auth/signin/page";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to your QuickR workspace to manage and update your dynamic QR codes.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/signin" },
};

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream-light px-4 py-8 text-ink sm:px-6 sm:py-12">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
            <section className="w-full rounded-lg border border-beige-deep bg-cream p-6 sm:p-8">
              <p className="text-sm text-slate">Loading...</p>
            </section>
          </div>
        </main>
      }
    >
      <SignInPage />
    </Suspense>
  );
}
