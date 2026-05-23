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
    <main className="min-h-screen bg-cream-light text-ink overflow-hidden">
      <div className="relative bg-gradient-to-br from-sunshine-300 via-sunshine-500 to-sunshine-700 overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream-light/40 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-[-20%] top-[-30%] h-[800px] w-[800px] rounded-full bg-sunshine-300/30 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-sunshine-500/15 blur-[100px]" />

        <div className="relative mx-auto max-w-[1280px] px-8 pt-6 pb-0 sm:px-10 lg:px-12">
          <Header />

          <section className="grid grid-cols-1 gap-12 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-28 items-center">
            <div>
              {/* <div className="inline-flex items-center gap-3 mb-8">
                <span className="inline-flex items-center gap-2 rounded-full bg-cream-deeper px-3 py-1">
                  <span className="h-2 w-2 rounded-full bg-ink animate-pulse" />
                  <span className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                    Dynamic QR
                  </span>
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-hairline-strong/40 bg-canvas/20 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[1px] text-ink/80">
                  Open source
                </span>
              </div> */}

              <h1 className="font-[family-name:var(--font-dm-serif)] max-w-3xl text-[40px] leading-[1.05] tracking-[-1.5px] text-ink sm:text-[52px] md:text-[64px] lg:text-[84px]">
                Generate{" "}
                <span className="text-ink-tint">QR codes</span>{" "}
                without friction
              </h1>

              <p className="mt-8 max-w-xl text-[18px] leading-[1.50] text-ink-tint sm:text-lg">
                Create QR codes from links, plain text, or dynamic content you
                can update later — save them in your workspace and download a
                clean PNG when needed. Fast, flexible, and elegant.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/create"
                  className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  Generate QR
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-md border border-hairline-strong bg-transparent px-6 py-3 text-sm font-medium text-ink transition hover:bg-canvas/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                >
                  View Dashboard
                </Link>
              </div>
            </div>

            <aside className="rounded-lg border border-hairline-soft/50 bg-canvas/90 backdrop-blur-sm p-8 shadow-[rgba(0,0,0,0.08)_0px_12px_24px_-4px] lg:p-10">
              <div className="flex items-center justify-between gap-3 border-b border-hairline pb-5">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                    Product preview
                  </p>
                  <h2 className="mt-1 text-xl font-medium text-ink">
                    QR generator
                  </h2>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate">
                    Content
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      readOnly
                      value="https://quickr.app/dashboard/create"
                      className="w-full rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm text-ink outline-none"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
                      <div className="h-3 w-3 rounded-full bg-sunshine-700 opacity-80" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
                  <div className="rounded-lg border border-hairline-soft bg-canvas p-6">
                    <div className="mx-auto grid aspect-square w-full max-w-64 grid-cols-13 gap-1 rounded-lg bg-surface p-5">
                      {qrPattern.flatMap((row, rowIndex) =>
                        row.map((cell, cellIndex) => (
                          <span
                            key={`${rowIndex}-${cellIndex}`}
                            className={[
                              "rounded-sm transition-all duration-500",
                              cell
                                ? "bg-ink"
                                : "bg-canvas",
                            ].join(" ")}
                            style={{
                              transitionDelay: `${(rowIndex * 13 + cellIndex) * 2}ms`,
                            }}
                          />
                        )),
                      )}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 text-xs font-medium text-stone">
                      <span className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-stone" />{" "}
                        Preview
                      </span>
                      <span className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-sunshine-700" />{" "}
                        PNG export enabled
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between gap-4 rounded-lg border border-beige-deep bg-cream p-5 sm:w-48">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                        Export
                      </p>
                      <p className="mt-3 text-sm leading-[1.55] text-slate">
                        Save a clean, high-res image for print, signage, or
                        sharing across platforms.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal"
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
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-8 sm:px-10 lg:px-12">
        <section id="features" className="py-24 lg:py-32">
          <div className="max-w-3xl">
            <span className="inline-block rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
              Features
            </span>
            <h2 className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-ink sm:text-[52px] lg:text-[64px]">
              Built for a practical workflow
            </h2>
            <p className="mt-5 text-lg leading-[1.55] text-slate">
              QuickR keeps the interface focused on generation, storage, and
              download so the product stays fast to use.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {features.map((feature) => (
              <article
                key={feature.title}
                className="rounded-lg border border-hairline-soft bg-canvas p-8 shadow-[rgba(0,0,0,0.04)_0px_4px_12px]"
              >
                <div className="h-1.5 w-12 rounded-full bg-ink mb-6" />
                <h3 className="text-xl font-medium text-ink">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-[1.55] text-slate">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="py-24 lg:py-32">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="max-w-xl">
              <span className="inline-block rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                How it works
              </span>
              <h2 className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-ink sm:text-[52px] lg:text-[64px]">
                Three steps to perfection
              </h2>
              <p className="mt-5 text-lg leading-[1.55] text-slate">
                The flow stays short on purpose. Each step maps directly to the
                actual action you need to complete, saving you time and clicks.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="rounded-lg border border-hairline-soft bg-canvas p-8"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-md bg-cream border border-beige-deep text-xl font-medium text-ink">
                    {step.number}
                  </span>
                  <h3 className="mt-6 text-lg font-medium text-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-[1.55] text-slate">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-24 lg:py-32 relative">
          <div className="absolute inset-0 -mx-8 sm:-mx-10 lg:-mx-12 bg-gradient-to-br from-ink via-charcoal to-surface-code rounded-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-sunshine-500/5 via-sunshine-700/8 to-sunshine-300/5" />
            <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-sunshine-500/8 blur-[100px]" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-sunshine-300/8 blur-[100px]" />
          </div>

          <div className="relative max-w-3xl pt-16">
            <span className="inline-block rounded-full border border-hairline-strong/30 bg-charcoal/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-on-dark-muted">
              Use cases
            </span>
            <h2 className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-on-dark sm:text-[52px] lg:text-[64px]">
              Versatile &amp; ready for anything
            </h2>
          </div>

          <div className="relative mt-12 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 xl:grid-cols-4">
            {useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="rounded-lg border border-hairline-strong/20 bg-charcoal/30 backdrop-blur-sm p-8"
              >
                <h3 className="text-lg font-medium text-on-dark">
                  {useCase.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.55] text-on-dark-muted">
                  {useCase.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="py-24 lg:py-32">
          <div className="rounded-lg bg-cream border border-beige-deep p-16 sm:p-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-2xl">
              <h2 className="font-[family-name:var(--font-dm-serif)] text-[40px] leading-[1.15] tracking-[-0.5px] text-ink sm:text-[52px]">
                Ready to create your first QR code?
              </h2>
              <p className="mt-4 text-lg leading-[1.50] text-slate">
                Join others who generate, update, and manage dynamic QR codes
                with QuickR — fully open-source and ready for production.
              </p>
            </div>

            <Link
              href="/signup"
              className="mt-8 w-full inline-flex items-center justify-center rounded-md bg-ink px-8 py-4 text-sm font-medium text-on-dark transition hover:bg-charcoal sm:w-auto lg:mt-0"
            >
              Start Generating Now
            </Link>
          </div>
        </section>
      </div>

      <div className="h-5 w-full bg-gradient-to-r from-sunshine-700 via-sunshine-500 via-sunshine-300 to-yellow-saturated" />
      <div className="h-5 w-full bg-gradient-to-r from-yellow-saturated via-cream-deeper to-cream" />

      <footer
        id="contact"
        className="bg-[#fff8e0] px-8 sm:px-10 lg:px-12"
      >
        <div className="mx-auto max-w-[1280px] py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-ink text-xs font-semibold text-on-dark">
                  QR
                </span>
                <span className="text-ink font-medium tracking-wide text-lg">
                  QuickR
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-[1.55] text-slate">
                Open-source QR code generator with dynamic updates, workspace management, and high-res exports.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                  Product
                </p>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a href="#features" className="text-sm text-ink hover:text-primary transition">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#how-it-works" className="text-sm text-ink hover:text-primary transition">
                      How it works
                    </a>
                  </li>
                  <li>
                    <a href="#use-cases" className="text-sm text-ink hover:text-primary transition">
                      Use cases
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                  Resources
                </p>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href="https://github.com/shreeteja172/quickr"
                      className="text-sm text-ink hover:text-primary transition"
                    >
                      GitHub
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://shreeteja.vercel.app"
                      className="text-sm text-ink hover:text-primary transition"
                    >
                      Contact Developer
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                  Legal
                </p>
                <ul className="mt-4 space-y-3">
                  <li>
                    <span className="text-sm text-slate">
                      &copy; {new Date().getFullYear()} QuickR
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-beige-deep pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-stone">
              Open source — contributions, issues, and pull requests welcome.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/shreeteja172/quickr"
                className="text-stone hover:text-ink transition"
                aria-label="GitHub"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
