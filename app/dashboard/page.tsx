import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_10%,#d9f7ff_0%,#f7fbff_32%,#f7fff8_58%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-28 -top-16 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-24 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Quickr Dashboard
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Manage your workspace from one place
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
            Open the QR generator when you are ready to build a code. The
            dashboard stays focused on navigation and overview.
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Workspace
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Quickr QR Studio
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Status
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Ready to generate
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Route
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">/qr</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard/create"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Open QR Generator
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/dashboard/qr"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Open QR History
            </Link>
          </div>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold text-slate-700">Quick Actions</p>

          <div className="mt-4 space-y-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Primary action</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Go to QR generation
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
              <p className="text-xs text-slate-500">Best for</p>
              <p className="mt-1 text-base font-semibold text-slate-900">
                Links, menus, campaigns
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
