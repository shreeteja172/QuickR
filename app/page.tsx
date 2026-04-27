import Link from "next/link";

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_12%,#dff2ff_0%,#f8fbff_36%,#f5fff6_60%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-10 lg:py-12">
      <div className="pointer-events-none absolute -left-24 -top-20 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-emerald-200/45 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-[0_35px_90px_-50px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
            Quickr Platform
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-900 sm:text-5xl">
            Launch QR campaigns,
            <br />
            track every scan
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Build beautiful QR experiences for events, products, and in-store
            journeys. Sign in with Google and go straight to your dashboard in
            seconds.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Instant Google OAuth
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              Real-time QR analytics
            </span>
            <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              PNG and SVG export
            </span>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Avg setup</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">
                under 2 min
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Team adoption</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">+38%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Scan reliability</p>
              <p className="mt-1 text-xl font-semibold text-slate-900">99.9%</p>
            </div>
          </div>
        </article>

        <aside className="rounded-3xl border border-slate-200/80 bg-white/90 p-7 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.55)] backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold text-slate-700">
            Ready to continue?
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-900">
            Access your workspace
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Use your Google account to securely open your Quickr dashboard.
          </p>

          <Link
            href="/signin"
            className="mt-7 inline-flex w-full items-center justify-center gap-3 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2"
            aria-label="Open sign in page"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5">
              <path
                fill="#EA4335"
                d="M12 10.2v3.9h5.4c-.2 1.2-1.4 3.6-5.4 3.6a6 6 0 1 1 0-12c2.3 0 3.9 1 4.8 1.8l3.3-3.2C18.1 2.4 15.3 1.3 12 1.3a10.7 10.7 0 1 0 0 21.4c6.1 0 10.1-4.3 10.1-10.4 0-.7-.1-1.3-.2-2H12Z"
              />
            </svg>
            Continue with Google
          </Link>

          <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
            OAuth callback configured for /api/auth/callback/google
          </div>
        </aside>
      </section>
    </main>
  );
}
