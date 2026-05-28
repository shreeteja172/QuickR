import type { Metadata } from "next";
import Link from "next/link";
import { currentSession } from "@/lib/current-session";
import prisma from "@/lib/db";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your QR code workspace — create, update, and download dynamic QR codes.",
  robots: { index: false, follow: true },
};

export default async function DashboardPage() {
  const session = await currentSession();
  const email = session?.user?.email;

  let qrCount = 0;
  let isPro = false;

  if (email) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, isPro: true },
    });
    if (user) {
      isPro = user.isPro;
      qrCount = await prisma.qRCode.count({
        where: { userId: user.id },
      });
    }
  }

  return (
    <main className="relative mx-auto max-w-[1280px] px-8 py-12 sm:px-10 lg:px-12 lg:py-16">
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-2 text-sm text-stone">
          <li>
            <Link href="/dashboard" className="hover:text-ink transition">Dashboard</Link>
          </li>
        </ol>
      </nav>

      <header className="mb-12 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
          Overview
        </p>
        <h1 className="font-[family-name:var(--font-dm-serif)] mt-3 text-[40px] tracking-[-0.5px] text-ink leading-[1.10] sm:text-[52px]">
          Manage your workspace
        </h1>
        <p className="mt-4 text-[18px] leading-[1.50] text-slate">
          Generate new QR codes, access your recent history, and manage your assets from a single, unified view.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          <section aria-labelledby="create-heading" className="rounded-lg border border-hairline-soft bg-canvas p-8 shadow-[rgba(0,0,0,0.04)_0px_4px_12px]">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 id="create-heading" className="text-lg font-medium text-ink">Create New QR Code</h2>
                <p className="mt-1 text-sm text-stone">Transform any link or text into a scannable code.</p>
              </div>
              <Link
                href="/dashboard/create"
                className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                Generate QR
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </section>

          <section aria-labelledby="recent-heading" className="rounded-lg border border-hairline-soft bg-canvas p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 id="recent-heading" className="text-lg font-medium text-ink">Recent Activity</h2>
                <p className="mt-1 text-sm text-stone">Your latest generated codes</p>
              </div>
              <Link href="/dashboard/qr" className="text-sm font-medium text-primary hover:underline transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded">
                View all history
              </Link>
            </div>

            {qrCount === 0 ? (
              <div className="rounded-lg border border-hairline-soft bg-surface p-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-cream border border-beige-deep" aria-hidden="true">
                  <svg className="h-5 w-5 text-stone" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="mt-4 text-sm font-medium text-ink">No QR codes yet</h3>
                <p className="mt-2 text-sm text-stone">Your generated codes will appear here.</p>
                <Link
                  href="/dashboard/create"
                  className="mt-5 inline-block text-sm font-medium text-primary hover:underline transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                >
                  Create your first code &rarr;
                </Link>
              </div>
            ) : (
              <Link
                href="/dashboard/qr"
                className="block rounded-lg border border-hairline-soft bg-surface p-6 text-center transition hover:border-hairline-strong hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <p className="text-2xl font-medium text-ink">{qrCount}</p>
                <p className="mt-1 text-sm text-stone">
                  QR code{qrCount === 1 ? "" : "s"} generated
                </p>
                <p className="mt-3 text-sm font-medium text-primary">
                  View all history &rarr;
                </p>
              </Link>
            )}
          </section>
        </div>

        <aside aria-label="Quick actions and workspace status" className="space-y-6 lg:space-y-8">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
              Quick Actions
            </p>
            <nav aria-label="Quick actions" className="mt-5 space-y-3">
              <Link
                href="/dashboard/create"
                className="group flex items-center justify-between rounded-md border border-hairline-soft bg-surface p-4 transition hover:border-hairline-strong hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div>
                  <p className="text-sm font-medium text-ink">URL to QR</p>
                  <p className="mt-1 text-xs text-stone">Standard web links</p>
                </div>
                <svg className="h-4 w-4 text-stone transition group-hover:text-ink group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/dashboard/create"
                className="group flex items-center justify-between rounded-md border border-hairline-soft bg-surface p-4 transition hover:border-hairline-strong hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div>
                  <p className="text-sm font-medium text-ink">Text to QR</p>
                  <p className="mt-1 text-xs text-stone">Plain text content</p>
                </div>
                <svg className="h-4 w-4 text-stone transition group-hover:text-ink group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </nav>
          </div>

          <div className="rounded-lg border border-beige-deep bg-cream p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
              Workspace Status
            </p>
            <div className="mt-5 space-y-4">
              <div className="flex items-center justify-between rounded-md border border-hairline-soft bg-canvas p-4">
                <span className="text-sm font-medium text-slate">Plan</span>
                <span className="rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold text-ink">
                  {isPro ? "Pro" : "Free Tier"}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md border border-hairline-soft bg-canvas p-4">
                <span className="text-sm font-medium text-slate">Codes Generated</span>
                <span className="text-sm font-medium text-ink">{qrCount}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
