import type { Metadata } from "next";

import SignUpPage from "@/components/auth/signup/page";

export const metadata: Metadata = {
  title: "Sign Up",
  description:
    "Create a free QuickR account to generate, manage, and update dynamic QR codes with workspace management and high-res PNG downloads.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/signup" },
};

export default function Page() {
  return <SignUpPage />;
}
