import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/layout/Header";

import { currentSession } from "@/lib/current-session";

export const metadata: Metadata = {
  title: "QuickR — Dynamic QR Code Generator & Manager",
  description:
    "Generate, manage, and update dynamic QR codes without friction. Create scannable codes from links or text, update destinations after printing, and download high-res PNGs.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "QuickR — Dynamic QR Code Generator & Manager",
    description:
      "Generate, manage, and update dynamic QR codes without friction. Update destinations after printing and download high-res PNGs.",
    url: "/",
    type: "website",
  },
};

const features = [
  {
    title: "Dynamic QR codes that never go stale",
    description:
      "Change where your QR code points even after it's printed. No regenerating, no reprinting. Just update and go.",
  },
  {
    title: "Links or text, one click",
    description:
      "Paste any URL or text, hit generate, done. No accounts needed to try it.",
  },
  {
    title: "Your codes, your workspace",
    description:
      "Every QR code you make lives in one place. Revisit, reuse, re-download anytime.",
  },
  {
    title: "Print-ready PNG downloads",
    description:
      "Export crisp, high-res PNGs built for print, signage, packaging, and presentations.",
  },
  {
    title: "Open source, always",
    description:
      "Fork it, self-host it, ship it. MIT licensed and contributions welcome on GitHub.",
  },
  {
    title: "Shareable workspaces",
    description:
      "Invite teammates, share collections, and collaborate on QR codes in one place.",
  },
];

const steps = [
  {
    number: "01",
    title: "Drop in your link or text",
    description:
      "Paste a URL, a phone number, or any text you want encoded. That's your starting point.",
  },
  {
    number: "02",
    title: "Hit generate",
    description:
      "Instant preview. Toggle dynamic mode if you want to change the destination later. Your call.",
  },
  {
    number: "03",
    title: "Save, update, download",
    description:
      "Stash it in your workspace, update the target URL anytime, or grab a high-res PNG right now.",
  },
];

const useCases = [
  {
    title: "Personal sharing",
    description:
      "Share your portfolio, resume, or contact card. Update the link later without reprinting anything.",
  },
  {
    title: "Events & conferences",
    description:
      "Point attendees to schedules, forms, or live updates. Swap links as the event evolves.",
  },
  {
    title: "Marketing campaigns",
    description:
      "Run A/B tests on landing pages without changing the QR. Swap destinations on the fly.",
  },
  {
    title: "Quick links",
    description:
      "Turn short URLs into scannable codes for menus, receipts, and everyday stuff.",
  },
];

const faqs = [
  {
    question: "What is a dynamic QR code?",
    answer:
      "A dynamic QR code doesn't store the final URL. It stores a redirect. When someone scans it, the server sends them to whatever destination you've set. Change the destination, the QR stays the same. No reprinting needed.",
  },
  {
    question: "Is QuickR free?",
    answer:
      "100% free and open source. Generate, save, and download as many QR codes as you want. A Pro tier with extra features might come later, but the core will always be free.",
  },
  {
    question: "Can I update a QR code after printing it?",
    answer:
      "That's the whole point. Dynamic QR codes let you change the destination URL from your dashboard anytime. The printed image never changes. Only where it sends people does.",
  },
  {
    question: "What format are the downloads?",
    answer:
      "High-resolution PNG, up to 4K. Optimized for print, packaging, presentations, and anything else you need to put a QR code on.",
  },
  {
    question: "Is it really open source?",
    answer:
      "Yes, MIT licensed. Check the code, open issues, send PRs. github.com/shreeteja172/quickr.",
  },
  {
    question: "Can I share QR codes with a team?",
    answer:
      "You can export and share QR images or links. Collaborative workspace features (team invites and permissions) are planned for future releases.",
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

function LandingPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "QuickR — Dynamic QR Code Generator & Manager",
    description:
      "Generate, manage, and update dynamic QR codes without friction. Create scannable codes from links or text, update destinations after printing, and download high-res PNGs.",
    url: "https://quickr.app",
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://quickr.app",
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function Page() {
  const session = await currentSession();

  if (session) {
    redirect("/dashboard");
  }

  const currentYear = new Date().getFullYear();

  return (
    <>
      <LandingPageJsonLd />
      <FAQJsonLd />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-on-dark focus:shadow-lg"
      >
        Skip to main content
      </a>
      <main
        id="main-content"
        className="min-h-screen bg-cream-light text-ink overflow-hidden"
      >
        <div className="relative bg-gradient-to-br from-sunshine-300 via-sunshine-500 to-sunshine-700 overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream-light/40 via-transparent to-transparent" />
          <div className="pointer-events-none absolute left-[-20%] top-[-30%] h-[800px] w-[800px] rounded-full bg-sunshine-300/30 blur-[120px]" />
          <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[600px] w-[600px] rounded-full bg-sunshine-500/15 blur-[100px]" />

          <div className="relative mx-auto max-w-[1280px] px-8 pt-6 pb-0 sm:px-10 lg:px-12">
            <Header />

            <section
              aria-labelledby="hero-heading"
              className="grid grid-cols-1 gap-12 pb-24 pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:pb-32 lg:pt-28 items-center"
            >
              <div>
                <h1
                  id="hero-heading"
                  className="font-[family-name:var(--font-dm-serif)] max-w-3xl text-[40px] leading-[1.05] tracking-[-1.5px] text-ink sm:text-[52px] md:text-[64px] lg:text-[84px]"
                >
                  Create live
                  <span className="text-ink-tint"> QR codes</span> : change
                  destinations anytime.
                </h1>

                <p className="mt-8 max-w-xl text-[18px] leading-[1.50] text-ink-tint sm:text-lg">
                  Drop in a link, get a QR code. Update the destination after
                  printing. Download a crisp PNG. No bloat, no signup wall, no
                  friction.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    Generate QR
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center rounded-md border border-hairline-strong bg-transparent px-6 py-3 text-sm font-medium text-ink transition hover:bg-canvas/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>

              <aside
                aria-label="Product preview"
                className="rounded-lg border border-hairline-soft/50 bg-canvas/90 backdrop-blur-sm p-8 shadow-[rgba(0,0,0,0.08)_0px_12px_24px_-4px] lg:p-10"
              >
                <div className="flex items-center justify-between gap-3 border-b border-hairline pb-5">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                      Product preview
                    </p>
                    <h2 className="mt-1 text-xl font-medium text-ink">
                      Your next QR code
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
                        aria-label="Example QR code content"
                        className="w-full rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm text-ink outline-none"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 p-2">
                        <div className="h-3 w-3 rounded-full bg-sunshine-700 opacity-80" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_auto]">
                    <div className="rounded-lg border border-hairline-soft bg-canvas p-6">
                      <div
                        role="img"
                        aria-label="Decorative QR code pattern"
                        className="mx-auto grid aspect-square w-full max-w-64 grid-cols-13 gap-1 rounded-lg bg-surface p-5"
                      >
                        {qrPattern.flatMap((row, rowIndex) =>
                          row.map((cell, cellIndex) => (
                            <span
                              key={`${rowIndex}-${cellIndex}`}
                              aria-hidden="true"
                              className={[
                                "rounded-sm transition-all duration-500",
                                cell ? "bg-ink" : "bg-canvas",
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
                          <div
                            className="h-1.5 w-1.5 rounded-full bg-stone"
                            aria-hidden="true"
                          />{" "}
                          Preview
                        </span>
                        <span className="flex items-center gap-1.5">
                          <div
                            className="h-1.5 w-1.5 rounded-full bg-sunshine-700"
                            aria-hidden="true"
                          />{" "}
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
                        className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                        aria-label="Download QR code preview (demo)"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
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
          <section
            id="features"
            aria-labelledby="features-heading"
            className="py-24 lg:py-32"
          >
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                Features
              </span>
              <h2
                id="features-heading"
                className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-ink sm:text-[52px] lg:text-[64px]"
              >
                Built for a practical workflow
              </h2>
              <p className="mt-5 text-lg leading-[1.55] text-slate">
                No feature bloat. Just generate, save, and download. That's the
                whole product.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-lg border border-hairline-soft bg-canvas p-8 shadow-[rgba(0,0,0,0.04)_0px_4px_12px]"
                >
                  <div
                    className="h-1.5 w-12 rounded-full bg-ink mb-6"
                    aria-hidden="true"
                  />
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

          <section
            id="how-it-works"
            aria-labelledby="how-it-works-heading"
            className="py-24 lg:py-32"
          >
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className="max-w-xl">
                <span className="inline-block rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                  How it works
                </span>
                <h2
                  id="how-it-works-heading"
                  className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-ink sm:text-[52px] lg:text-[64px]"
                >
                  Three steps. That's it.
                </h2>
                <p className="mt-5 text-lg leading-[1.55] text-slate">
                  No onboarding, no setup wizards. Paste, generate, download.
                  Each step maps to what you actually need to do.
                </p>
              </div>

              <ol className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {steps.map((step) => (
                  <li
                    key={step.number}
                    className="rounded-lg border border-hairline-soft bg-canvas p-8"
                  >
                    <span
                      className="flex h-12 w-12 items-center justify-center rounded-md bg-cream border border-beige-deep text-xl font-medium text-ink"
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>
                    <h3 className="mt-6 text-lg font-medium text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-[1.55] text-slate">
                      {step.description}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            id="use-cases"
            aria-labelledby="use-cases-heading"
            className="py-24 lg:py-32 relative"
          >
            <div
              className="absolute inset-0 -mx-8 sm:-mx-10 lg:-mx-12 bg-gradient-to-br from-ink via-charcoal to-surface-code rounded-none overflow-hidden"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-sunshine-500/5 via-sunshine-700/8 to-sunshine-300/5" />
              <div className="absolute top-[-20%] left-[-10%] h-[500px] w-[500px] rounded-full bg-sunshine-500/8 blur-[100px]" />
              <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-sunshine-300/8 blur-[100px]" />
            </div>

            <div className="relative max-w-3xl pt-16">
              <span className="inline-block rounded-full border border-hairline-strong/30 bg-charcoal/50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-on-dark-muted">
                Use cases
              </span>
              <h2
                id="use-cases-heading"
                className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-on-dark sm:text-[52px] lg:text-[64px]"
              >
                Versatile & ready for anything
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

          <section
            id="faq"
            aria-labelledby="faq-heading"
            className="py-24 lg:py-32"
          >
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                FAQ
              </span>
              <h2
                id="faq-heading"
                className="font-[family-name:var(--font-dm-serif)] mt-4 text-[40px] leading-[1.10] tracking-[-1px] text-ink sm:text-[52px] lg:text-[64px]"
              >
                Frequently asked questions
              </h2>
            </div>

            <dl className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2">
              {faqs.map((faq) => (
                <div
                  key={faq.question}
                  className="rounded-lg border border-hairline-soft bg-canvas p-8"
                >
                  <dt className="text-lg font-medium text-ink">
                    {faq.question}
                  </dt>
                  <dd className="mt-3 text-sm leading-[1.55] text-slate">
                    {faq.answer}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="cta-heading" className="py-24 lg:py-32">
            <div className="rounded-lg bg-cream border border-beige-deep p-16 sm:p-20 lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <h2
                  id="cta-heading"
                  className="font-[family-name:var(--font-dm-serif)] text-[40px] leading-[1.15] tracking-[-0.5px] text-ink sm:text-[52px]"
                >
                  Ready to make your first QR code?
                </h2>
                <p className="mt-4 text-lg leading-[1.50] text-slate">
                  Join others who generate, update, and manage dynamic QR codes
                  with QuickR. Free, open source, and ready to ship.
                </p>
              </div>

              <Link
                href="/signup"
                className="mt-8 w-full inline-flex items-center justify-center rounded-md bg-ink px-8 py-4 text-sm font-medium text-on-dark transition hover:bg-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2 sm:w-auto lg:mt-0"
              >
                Start Generating Now
              </Link>
            </div>
          </section>
        </div>

        <div
          className="h-5 w-full bg-gradient-to-r from-sunshine-700 via-sunshine-500 via-sunshine-300 to-yellow-saturated"
          aria-hidden="true"
        />
        <div
          className="h-5 w-full bg-gradient-to-r from-yellow-saturated via-cream-deeper to-cream"
          aria-hidden="true"
        />

        <footer
          role="contentinfo"
          className="bg-[#fff8e0] px-8 sm:px-10 lg:px-12"
        >
          <div className="mx-auto max-w-[1280px] py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <Image
                    src="/logo.png"
                    alt="QuickR logo"
                    width={52}
                    height={52}
                  />
                  <span className="text-ink font-medium tracking-wide text-lg">
                    QuickR
                  </span>
                </div>
                <p className="mt-4 max-w-sm text-sm leading-[1.55] text-slate">
                  Open-source QR code generator with dynamic updates, workspace
                  management, and high-res exports.
                </p>
              </div>

              <nav
                aria-label="Footer navigation"
                className="grid grid-cols-2 gap-x-16 gap-y-8 sm:grid-cols-3"
              >
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[1px] text-ink">
                    Product
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li>
                      <a
                        href="#features"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                      >
                        Features
                      </a>
                    </li>
                    <li>
                      <a
                        href="#how-it-works"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                      >
                        How it works
                      </a>
                    </li>
                    <li>
                      <a
                        href="#use-cases"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                      >
                        Use cases
                      </a>
                    </li>
                    <li>
                      <a
                        href="#faq"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                      >
                        FAQ
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
                        rel="noopener noreferrer"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://shreeteja.vercel.app"
                        rel="noopener noreferrer"
                        className="text-sm text-ink hover:text-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
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
                        &copy; {currentYear} QuickR
                      </span>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>

            <div className="mt-12 border-t border-beige-deep pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-stone">
                Open source. Contributions, issues, and pull requests welcome.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/shreeteja172/quickr"
                  className="text-stone hover:text-ink transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:rounded"
                  aria-label="QuickR on GitHub"
                  rel="noopener noreferrer"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.41 7.86 10.94.57.1.78-.25.78-.55 0-.27-.01-1-.01-1.96-3.2.7-3.88-1.54-3.88-1.54-.52-1.32-1.27-1.67-1.27-1.67-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.25 3.33.96.1-.75.4-1.25.72-1.54-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.18-3.1-.12-.29-.51-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.05 11.05 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.77.11 3.06.73.81 1.18 1.84 1.18 3.1 0 4.43-2.7 5.4-5.28 5.68.41.35.77 1.04.77 2.1 0 1.51-.01 2.73-.01 3.1 0 .3.21.66.79.55A11.52 11.52 0 0023.5 12C23.5 5.65 18.35.5 12 .5z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
