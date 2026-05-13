import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Overview
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Manage your workspace
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Generate new QR codes, access your recent history, and manage your assets from a single, unified view.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Create New QR Code</h2>
                <p className="mt-1 text-sm text-slate-500">Transform any link or text into a scannable code.</p>
              </div>
              <Link
                href="/dashboard/create"
                className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              >
                Generate QR
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </section>

          <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Recent Activity</h2>
                <p className="mt-1 text-sm text-slate-500">Your latest generated codes</p>
              </div>
              <Link href="/dashboard/qr" className="text-sm font-medium text-slate-600 hover:text-slate-950 transition">
                View all history
              </Link>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-slate-200 shadow-sm">
                <svg className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="mt-4 text-sm font-semibold text-slate-900">No QR codes yet</h3>
              <p className="mt-2 text-sm text-slate-500">Your generated codes will appear here.</p>
              <Link
                href="/dashboard/create"
                className="mt-5 inline-block text-sm font-medium text-slate-900 hover:text-slate-600 transition"
              >
                Create your first code &rarr;
              </Link>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:space-y-8">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Quick Actions
            </p>
            <div className="mt-5 space-y-3">
              <Link
                href="/dashboard/create"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">URL to QR</p>
                  <p className="mt-1 text-xs text-slate-500">Standard web links</p>
                </div>
                <svg className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard/create"
                className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:bg-slate-100"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">Text to QR</p>
                  <p className="mt-1 text-xs text-slate-500">Plain text content</p>
                </div>
                <svg className="h-4 w-4 text-slate-400 transition group-hover:text-slate-600 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Workspace Status
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">Plan</span>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Free Tier
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <span className="text-sm font-medium text-slate-600">Codes Generated</span>
                <span className="text-sm font-semibold text-slate-900">0</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
