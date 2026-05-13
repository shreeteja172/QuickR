import { Suspense } from "react";
import SignInPage from "@/components/auth/signin/page";

export default function Page() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-950 sm:px-6 sm:py-12">
          <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
            <section className="w-full rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <p className="text-sm text-slate-600">Loading...</p>
            </section>
          </div>
        </main>
      }
    >
      <SignInPage />
    </Suspense>
  );
}
