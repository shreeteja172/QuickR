"use client";

import { signIn } from "@/lib/auth-client";

export default function SignInPage() {
  const handleGoogleLogin = async () => {
    console.log("Google button clicked");
    await signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button
        onClick={handleGoogleLogin}
        className="px-4 py-2 rounded bg-black text-white"
      >
        Continue with Google
      </button>
    </div>
  );
}