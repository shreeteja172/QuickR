import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "@/components/layout/Header";

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
    <main className="min-h-screen bg-slate-50 text-slate-950 selection:bg-cyan-200 selection:text-cyan-900 overflow-hidden relative">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-[-10%] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-cyan-200/30 blur-[100px] opacity-70" />
      <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[600px] w-[600px] rounded-full bg-emerald-200/20 blur-[100px] opacity-60" />
      <div className="pointer-events-none absolute left-[-10%] top-[60%] h-[600px] w-[600px] rounded-full bg-blue-200/20 blur-[100px] opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-16 z-10">
        <Header />

        <section className="grid grid-cols-1 gap-10 py-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:py-16 items-center">
          <article className="rounded-[2.5rem] border border-white/50 bg-white/70 backdrop-blur-xl p-8 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.1)] sm:p-12 lg:p-14 transition-all duration-500 hover:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.15)] relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
            
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1.5 mb-6">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse"></span>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-800">
                  QR Code Generation
                </p>
              </span>
              
              <h1 className="mt-4 max-w-2xl text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Generate <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">QR codes</span> without friction
              </h1>
              
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 sm:text-xl">
                Create QR codes from links or plain text, save them in your
                workspace, and download a clean PNG when you need it. Fast, simple, and elegant.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/create"
                  className="group relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 px-8 py-4 text-base font-medium text-white shadow-xl shadow-slate-900/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-cyan-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-400/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                  <span className="relative">Generate QR</span>
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white/80 px-8 py-4 text-base font-medium text-slate-800 backdrop-blur-sm transition-all duration-300 hover:border-slate-300 hover:bg-slate-50 hover:shadow-lg hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2"
                >
                  View dashboard
                </Link>
              </div>

              <div className="mt-12 grid gap-4 sm:grid-cols-3 border-t border-slate-200/60 pt-8">
                {[
                  { label: "Format", value: "Text & Links" },
                  { label: "Export", value: "PNG format" },
                  { label: "Workspace", value: "Save history" }
                ].map((item) => (
                  <div key={item.label} className="group rounded-2xl border border-slate-100 bg-white/50 px-5 py-4 transition-all duration-300 hover:bg-white hover:shadow-md hover:-translate-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 group-hover:text-cyan-600 transition-colors">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm font-semibold text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </article>

          <aside className="group rounded-[2.5rem] border border-white/60 bg-white/40 backdrop-blur-xl p-6 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.1)] sm:p-8 lg:p-10 transition-transform duration-500 hover:-translate-y-2 hover:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.15)]">
            <div className="flex items-center justify-between gap-3 border-b border-slate-200/60 pb-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  Product preview
                </p>
                <h2 className="mt-1 text-xl font-bold text-slate-900">
                  QR generator
                </h2>
              </div>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/80 px-3 py-1.5 text-xs font-semibold text-emerald-700 shadow-sm">
                Ready
              </span>
            </div>

            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-slate-700">
                  Content
                </label>
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value="https://quickr.app/dashboard/create"
                    className="w-full rounded-2xl border border-slate-200 bg-white/80 px-5 py-4 text-sm text-slate-900 outline-none shadow-inner transition-colors group-hover:border-slate-300"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
                    <div className="h-4 w-4 rounded-full bg-emerald-400 opacity-80 shadow-[0_0_10px_rgba(52,211,153,0.6)]"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
                <div className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 group-hover:shadow-md">
                  <div className="mx-auto grid aspect-square w-full max-w-68 grid-cols-13 gap-1 rounded-3xl bg-slate-50 p-5 shadow-inner">
                    {qrPattern.flatMap((row, rowIndex) =>
                      row.map((cell, cellIndex) => (
                        <span
                          key={`${rowIndex}-${cellIndex}`}
                          className={[
                            "rounded-sm transition-all duration-500",
                            cell ? "bg-slate-900 group-hover:bg-slate-800" : "bg-white",
                          ].join(" ")}
                          style={{ transitionDelay: `${(rowIndex * 13 + cellIndex) * 2}ms` }}
                        />
                      )),
                    )}
                  </div>

                  <div className="mt-5 flex items-center justify-between gap-3 text-xs font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-slate-400"></div> Preview</span>
                    <span className="flex items-center gap-1.5"><div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div> PNG export enabled</span>
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-4 rounded-[2rem] border border-slate-100 bg-slate-50/50 p-5 sm:w-48 transition-colors group-hover:bg-slate-50">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                      Export
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">
                      Save a clean, high-res image for print, signage, or sharing across platforms.
                    </p>
                  </div>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-slate-800 hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </section>

        <section
          id="features"
          className="mt-12 py-16 lg:py-24 relative"
        >
          <div className="absolute inset-0 bg-white/40 backdrop-blur-3xl rounded-[3rem] border border-white/60 -z-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)]"></div>
          
          <div className="max-w-3xl px-8 pt-8">
            <span className="inline-block rounded-full bg-cyan-100/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-800">
              Features
            </span>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Built for a practical workflow
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              QuickR keeps the interface focused on generation, storage, and
              download so the product stays fast to use.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 px-8 pb-8 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature, i) => (
              <article
                key={feature.title}
                className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/50 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none"></div>
                <div className="h-2 w-12 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-400 mb-6 transition-all duration-300 group-hover:w-16" />
                <h3 className="text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="how-it-works"
          className="mt-8 py-16 lg:py-24"
        >
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-emerald-100/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-emerald-800">
                How it works
              </span>
              <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Three steps to perfection
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-slate-600">
                The flow stays short on purpose. Each step maps directly to the actual
                action you need to complete, saving you time and clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="group relative rounded-3xl border border-slate-100 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-100/50"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-xl font-black text-slate-900 transition-colors duration-300 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="use-cases"
          className="mt-8 py-16 lg:py-24 relative"
        >
          <div className="absolute inset-0 bg-slate-900 rounded-[3rem] -z-10 overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-cyan-900/40 blur-[80px]"></div>
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-emerald-900/30 blur-[80px]"></div>
          </div>

          <div className="max-w-3xl px-8 pt-12">
            <span className="inline-block rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-300">
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
                className="group rounded-3xl border border-slate-800 bg-slate-800/40 backdrop-blur-sm p-8 transition-all duration-300 hover:bg-slate-800 hover:border-slate-600 hover:-translate-y-1"
              >
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400 group-hover:text-slate-300">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-12 py-10">
          <div className="group relative overflow-hidden rounded-[3rem] border border-slate-200/60 bg-white/60 backdrop-blur-xl p-10 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.1)] sm:p-16 lg:flex lg:items-center lg:justify-between lg:gap-12 transition-all duration-500 hover:shadow-[0_30px_60px_-20px_rgba(15,23,42,0.15)] hover:bg-white/80">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-200/40 to-emerald-200/40 blur-3xl transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Ready to create your first QR code?
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Join others who are already using QuickR to generate and manage their codes efficiently.
              </p>
            </div>

            <Link
              href="/dashboard/create"
              className="relative z-10 mt-8 w-full inline-flex items-center justify-center rounded-2xl bg-slate-950 px-8 py-5 text-lg font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:scale-[1.02] hover:shadow-xl sm:w-auto lg:mt-0"
            >
              Start Generating Now
            </Link>
          </div>
        </section>

        <footer id="contact" className="mt-12 border-t border-slate-200/60 py-8">
          <div className="flex flex-col gap-6 text-sm font-medium text-slate-500 sm:flex-row sm:items-center sm:justify-between px-4">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-xs font-bold text-white">QR</span>
              <p className="text-slate-900 font-semibold tracking-wide">QuickR &copy; {new Date().getFullYear()}</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <a href="https://github.com/" className="transition-colors hover:text-slate-900">GitHub</a>
              <a href="#features" className="transition-colors hover:text-slate-900">Features</a>
              <a href="#how-it-works" className="transition-colors hover:text-slate-900">Workflow</a>
              <a href="mailto:hello@quickr.app" className="transition-colors hover:text-slate-900">Contact</a>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
