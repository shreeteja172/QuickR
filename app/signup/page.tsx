import type { Metadata } from "next";

import SignUpPage from "@/components/auth/signup/page";

export const metadata: Metadata = {
  title: "QuickR — Sign up",
  description: "Create a QuickR account to generate and manage QR codes.",
};

export default function Page() {
  return <SignUpPage />;
}
