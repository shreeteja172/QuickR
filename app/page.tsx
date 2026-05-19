import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";

import { currentSession } from "@/lib/current-session";

const features = [
  {
    title: "Dynamic / Updatable QR codes",
    description:
      "Create QR codes whose destination or payload can be updated later without regenerating the image — great for campaigns and dynamic redirects.",
  },
  {
    title: "Generate from text or links",
    description:
      "Paste content, generate a code, and keep the workflow simple.",
  },
  {
    title: "Save QR codes",
    description: "Store codes in your workspace for later reuse.",
  },
  {
    title: "Download PNG",
    description:
      "Export a clean image that works across print and digital use.",
  },
  {
    title: "Open source",
    description:
      "Fully open-source — contributions and issues welcome on GitHub.",
  },
];

const steps = [
  {
    number: "01",
    title: "Enter content (link, text, or payload)",
    description:
      "Paste a link, plain text, or set an initial dynamic payload to encode into a QR code.",
  },
  {
    number: "02",
    title: "Generate & enable dynamic",
    description:
      "Create a preview instantly and optionally enable dynamic updates so the QR destination can change later.",
  },
  {
    number: "03",
    title: "Save, update, or download",
    description:
      "Save to your workspace, update the destination anytime, or export a clean PNG for print.",
  },
];

const useCases = [
  {
    title: "Personal sharing",
    description:
      "Share a profile, portfolio, or document link quickly — update the destination later without reprinting.",
  },
  {
    title: "Events",
    description:
      "Send attendees to schedules, forms, or live updates — change links as event details evolve.",
  },
  {
    title: "Campaigns",
    description:
      "Use dynamic QR codes for marketing campaigns so you can swap landing pages without reprinting.",
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
    <main className="min-h-screen bg-slate-50 text-slate-950 selection:bg-slate-200 selection:text-slate-900 overflow-hidden relative dark:bg-slate-950 dark:text-slate-100 dark:selection:bg-slate-800 dark:selection:text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200 dark:bg-slate-800" />

      <div className="relative mx-auto max-w-6xl px-4 pt-12 pb-8 sm:px-6 sm:pt-16 lg:px-8 lg:pt-20 lg:pb-14 z-10">
        <Header />

        <section className="grid grid-cols-1 gap-8 py-4 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-14 items-center">
          <article className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.08)] sm:p-10 lg:p-12 transition-all duration-300 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] relative overflow-hidden dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.45)]">
            <div className="relative z-10">
              {/* <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
                  QR Code Generation
                </p>
              </span> */}
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 dark:border-slate-700 dark:bg-slate-950/60">
                  <span className="h-2 w-2 rounded-full bg-slate-500 dark:bg-slate-400"></span>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 dark:text-slate-300">
                    Dynamic QR
                  </span>
                </span>

                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-950/60 dark:text-slate-300">
                  Open source
                </span>
              </div>

              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
                Generate{" "}
                <span className="text-slate-700 dark:text-slate-300">
                  QR codes
                </span>{" "}
                without friction
              </h1>

              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg dark:text-slate-300">
                Create QR codes from links, plain text, or dynamic content you
                can update later — save them in your workspace and download a
                clean PNG when needed. Fast, flexible, and elegant.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/dashboard/create"
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-8 py-4 text-base font-medium text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200 dark:focus-visible:ring-slate-400 dark:focus-visible:ring-offset-slate-950"
                >
                  Generate QR
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-4 text-base font-medium text-slate-800 shadow-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:hover:bg-slate-900 dark:focus-visible:ring-slate-400 dark:focus-visible:ring-offset-slate-950"
                >
                  View Dashboard
                </Link>
              </div>

              <div className="mt-12 grid gap-4 border-t border-slate-200/60 pt-8 sm:grid-cols-3 dark:border-slate-800">
                {[
                  { label: "Format", value: "Text, Links & Dynamic" },
                  { label: "Export", value: "PNG format" },
                  { label: "Workspace", value: "Save history" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="group rounded-2xl border border-slate-100 bg-white/50 px-5 py-4 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1 dark:border-slate-800 dark:bg-slate-950/50 dark:hover:bg-slate-900"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 group-hover:text-cyan-600 transition-colors dark:text-slate-500 dark:group-hover:text-slate-300">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Open source — contributions, issues, and pull requests are
                welcome on GitHub.
              </p>
            </div>
          </article>

          <aside className="group rounded-4xl border border-white/60 bg-white p-6 shadow-[0_12px_36px_-12px_rgba(15,23,42,0.08)] sm:p-8 lg:p-10 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-[0_12px_36px_-12px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-5 dark:border-slate-800">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 dark:text-slate-500">
                  Product preview
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-100">
                  QR generator
                </h2>
              </div>
              {/* <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                Ready
              </span> */}
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200">
                  Content
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value="https://quickr.app/dashboard/create"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-sm text-slate-900 outline-none shadow-inner transition-colors group-hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 dark:group-hover:border-slate-600"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
                    <div className="h-4 w-4 rounded-full bg-emerald-400 opacity-80 shadow-[0_0_10px_rgba(52,211,153,0.6)] dark:bg-emerald-300"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
                <div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:shadow-md dark:border-slate-800 dark:bg-slate-950">
                  <div className="mx-auto grid aspect-square w-full max-w-64 grid-cols-13 gap-1 rounded-3xl bg-slate-50 p-5 shadow-inner dark:bg-slate-900">
                    {qrPattern.flatMap((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                        <span
                          key={`${rowIndex}-${cellIndex}`}
                          className={[
                            "rounded-sm transition-all duration-500",
                            cell
                              ? "bg-slate-900 group-hover:bg-slate-800 dark:bg-slate-100 dark:group-hover:bg-white"
                              : "bg-white dark:bg-slate-950",
                          ].join(" ")}
                          style={{
                            transitionDelay: `${(rowIndex * 13 + cellIndex) * 2}ms`,
                          }}
                        />
                      )),
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-400 dark:bg-slate-500"></div>{" "}
                      Preview
                    </span>
                    <span className="flex items-center gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 dark:bg-emerald-300"></div>{" "}
                      PNG export enabled
                    </span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-4xl border border-slate-100 bg-slate-50/50 p-5 sm:w-48 transition-colors group-hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-950 dark:group-hover:bg-slate-900">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                      Export
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                      Save a clean, high-res image for print, signage, or
                      sharing across platforms.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section id="features" className="mt-12 py-16 lg:py-24 relative">
          <div className="absolute inset-0 rounded-[3rem] border border-slate-200 bg-white -z-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:border-slate-800 dark:bg-slate-900"></div>

          <div className="max-w-3xl px-8 pt-8">
            <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-700">
              Features
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
              Built for a practical workflow
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              QuickR keeps the interface focused on generation, storage, and
              download so the product stays fast to use.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 px-8 pb-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:shadow-black/30"
              >
                <div className="absolute inset-0 rounded-3xl bg-slate-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none dark:group-hover:opacity-0"></div>
                <div className="h-2 w-12 rounded-full bg-slate-300 mb-6 transition-all duration-300 group-hover:w-16 dark:bg-slate-700" />
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600 dark:text-slate-300">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="mt-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-700">
                How it works
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
                Three steps to perfection
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                The flow stays short on purpose. Each step maps directly to the
                actual action you need to complete, saving you time and clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="group relative rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-slate-700 dark:hover:shadow-black/30"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl font-black text-slate-900 transition-colors duration-300 group-hover:bg-slate-100 group-hover:text-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:group-hover:bg-slate-800">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-slate-900 dark:text-slate-100">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="mt-8 py-16 lg:py-24 relative">
          <div className="absolute inset-0 bg-slate-900 rounded-[3rem] -z-10 overflow-hidden dark:bg-slate-950"></div>

          <div className="max-w-3xl px-8 pt-12">
            <span className="inline-block rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400">
              Use cases
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Versatile & ready for anything
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 px-8 pb-12 sm:grid-cols-2 xl:grid-cols-4">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="group rounded-3xl border border-slate-800 bg-slate-800 p-8 transition-all duration-300 hover:bg-slate-700 hover:border-slate-600 hover:-translate-y-1 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors dark:text-slate-100 dark:group-hover:text-slate-50">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300 dark:text-slate-400 dark:group-hover:text-slate-300">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 py-10">
          <div className="group relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white p-10 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.1)] sm:p-16 lg:flex lg:items-center lg:justify-between lg:gap-12 transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.15)] hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-950">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl dark:text-slate-100">
                Ready to create your first QR code?
              </h2>
              <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
                Join others who generate, update, and manage dynamic QR codes
                with QuickR — fully open-source and ready for production.
              </p>
            </div>

            <Link
              href="/signup"
              className="relative z-10 mt-8 w-full inline-flex items-center justify-center rounded-2xl bg-slate-950 px-8 py-5 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] hover:shadow-xl sm:w-auto lg:mt-0 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            >
              Start Generating Now
            </Link>
          </div>
        </section>

        <footer
          id="contact"
          className="mt-12 border-t border-slate-200/60 py-8"
        >
          <div className="flex flex-col gap-6 text-sm font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between px-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">
                QR
              </span>
              <p className="text-slate-900 font-semibold tracking-wide">
                QuickR &copy; {new Date().getFullYear()}
              </p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a
                href="https://github.com/"
                className="transition-colors hover:text-slate-900"
              >
                Source on GitHub
              </a>
              <a
                href="#features"
                className="transition-colors hover:text-slate-900"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="transition-colors hover:text-slate-900"
              >
                Workflow
              </a>
              <a
                href="mailto:hello@quickr.app"
                className="transition-colors hover:text-slate-900"
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
