import type { Metadata } from "next";
import Header from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "Dashboard",
  description:
    "Manage your QR code workspace — create, update, and download dynamic QR codes.",
  robots: { index: false, follow: true },
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream-light text-ink flex flex-col">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline" aria-hidden="true" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sunshine-300/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-80 h-80 w-80 rounded-full bg-sunshine-500/8 blur-3xl" aria-hidden="true" />

      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-on-dark focus:shadow-lg"
      >
        Skip to main content
      </a>
      <Header />
      <div id="main-content" className="flex-1 pt-16 sm:pt-16">{children}</div>

      <div className="mt-auto" aria-hidden="true">
        <div className="h-4 w-full bg-gradient-to-r from-sunshine-700 via-sunshine-500 via-sunshine-300 to-yellow-saturated" />
        <div className="h-4 w-full bg-gradient-to-r from-yellow-saturated via-cream-deeper to-cream" />
      </div>
    </div>
  );
}
