import { redirect } from "next/navigation";
import Link from "next/link";

import { currentSession } from "@/lib/current-session";

const features = [
  {
    title: "Generate QR from text or links",
    description:
      "Paste content, generate a code, and keep the workflow simple.",
  },
  {
    title: "Save QR codes",
    description: "Store codes in your workspace for later reuse.",
  },
  {
    title: "Access history",
    description: "Review previous codes without digging through downloads.",
  },
  {
    title: "Download PNG",
    description:
      "Export a clean image that works across print and digital use.",
  },
  {
    title: "Clean dashboard",
    description: "Keep generation and management in one focused view.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter a link or text",
    description: "Paste the content you want to encode into a QR code.",
  },
  {
    number: "02",
    title: "Generate the QR",
    description: "Create a preview instantly and check it before saving.",
  },
  {
    number: "03",
    title: "Save or download",
    description: "Keep it in your dashboard or export a PNG right away.",
  },
];

const useCases = [
  {
    title: "Personal sharing",
    description: "Share a profile, portfolio, or document link quickly.",
  },
  {
    title: "Events",
    description: "Send attendees to a schedule, form, or registration page.",
  },
  {
    title: "Projects",
    description: "Keep internal links available for teammates and clients.",
  },
  {
    title: "Quick links",
    description: "Turn short URLs into reusable codes for everyday use.",
  },
];

const qrPattern = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1],
  [1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1],
];

export default async function Page() {
  const session = await currentSession();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-80 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8 lg:py-6">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200/80 bg-white/80 px-4 py-4 backdrop-blur-sm sm:px-5 lg:px-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-900 text-sm font-semibold text-white">
              QR
            </span>
            <span>
              <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-slate-500">
                QuickR
              </span>
              <span className="block text-sm text-slate-600">
                QR Code Generator
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <a href="#features" className="transition hover:text-slate-950">
              Features
            </a>
            <a href="#how-it-works" className="transition hover:text-slate-950">
              How it works
            </a>
            <a href="#use-cases" className="transition hover:text-slate-950">
              Use cases
            </a>
          </nav>

          <Link
            href="/signin"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
          >
            Sign in
          </Link>
        </header>

        <section className="grid gap-6 py-6 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8 lg:py-10">
          <article className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8 lg:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              QR code generation
            </p>
            <h1 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] text-slate-950 sm:text-5xl lg:text-6xl">
              Generate and manage QR codes without friction
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              Create QR codes from links or plain text, save them in your
              dashboard, and download a clean PNG when you need it.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/dashboard/create"
                className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              >
                Generate QR
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
              >
                View dashboard
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Format
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Text, links, and short URLs
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Export
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  PNG download
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Workspace
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Save and revisit history
                </p>
              </div>
            </div>
          </article>

          <aside className="rounded-4xl border border-slate-200 bg-white p-5 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-6 lg:p-8">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 pb-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Product preview
                </p>
                <h2 className="mt-1 text-lg font-semibold text-slate-950">
                  QR generator
                </h2>
              </div>
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                Ready
              </span>
            </div>

            <div className="mt-5 space-y-4">
              <label className="block text-sm font-medium text-slate-700">
                Content
                <input
                  type="text"
                  readOnly
                  value="https://quickr.app/dashboard/create"
                  className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none"
                />
              </label>

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <div className="mx-auto grid aspect-square w-full max-w-68 grid-cols-13 gap-1 rounded-2xl bg-white p-4 shadow-sm">
                    {qrPattern.flatMap((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                        <span
                          key={`${rowIndex}-${cellIndex}`}
                          className={[
                            "rounded-xs",
                            cell ? "bg-slate-950" : "bg-slate-100",
                          ].join(" ")}
                        />
                      )),
                    )}
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-slate-500">
                    <span>Preview</span>
                    <span>PNG export enabled</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-3 rounded-3xl border border-slate-200 bg-white p-4 sm:w-44">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                      Download
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      Save a clean image for print, signage, or sharing.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white"
                  >
                    Download PNG
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                Save codes in the dashboard and return to them later.
              </div>
            </div>
          </aside>
        </section>

        <section
          id="features"
          className="border-t border-slate-200 py-10 sm:py-12"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Features
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Built for a practical QR workflow
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              QuickR keeps the interface focused on generation, storage, and
              download so the product stays fast to use.
            </p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.3)]"
              >
                <div className="h-1.5 w-10 rounded-full bg-cyan-500/70" />
                <h3 className="mt-4 text-base font-semibold text-slate-950">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="border-t border-slate-200 py-10 sm:py-12"
        >
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                How it works
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Three steps from input to download
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                The flow stays short on purpose. Each step maps to the actual
                product action a user needs to complete.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.3)]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-700">
                    {step.number}
                  </p>
                  <h3 className="mt-4 text-base font-semibold text-slate-950">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="use-cases"
          className="border-t border-slate-200 py-10 sm:py-12"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              Use cases
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
              Simple uses that match everyday work
            </h2>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_30px_-24px_rgba(15,23,42,0.3)]"
              >
                <h3 className="text-base font-semibold text-slate-950">
                  {useCase.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="border-t border-slate-200 py-10 sm:py-12">
          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Start here
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">
                Start generating QR codes
              </h2>
            </div>

            <Link
              href="/dashboard/create"
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 lg:mt-0"
            >
              Generate QR
            </Link>
          </div>
        </section>

        <footer id="contact" className="border-t border-slate-200 py-6">
          <div className="flex flex-col gap-4 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>QuickR</p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://github.com/"
                className="transition hover:text-slate-900"
              >
                GitHub
              </a>
              <a href="#features" className="transition hover:text-slate-900">
                About
              </a>
              <a
                href="mailto:hello@quickr.app"
                className="transition hover:text-slate-900"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
