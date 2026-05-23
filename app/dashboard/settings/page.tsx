"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const [saving, setSaving] = useState(false);
  const [name, setName] = useState(session?.user?.name ?? "");
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    try {
      await axios.patch("/api/user", { name });
      toast.success("Settings updated successfully.");
      router.refresh();
    } catch {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to permanently delete your account? This action cannot be undone.",
      )
    ) {
      return;
    }

    setDeleting(true);
    toast.loading("Deleting account...", { id: "delete-account" });

    try {
      await axios.delete("/api/user");
      await signOut();
      toast.success("Account deleted successfully.", { id: "delete-account" });
      router.push("/");
    } catch {
      toast.error("Failed to delete account. Please try again.", {
        id: "delete-account",
      });
      setDeleting(false);
    }
  };

  if (isPending) {
    return (
      <main className="relative mx-auto max-w-[1280px] px-8 py-6 sm:px-10 lg:px-12 lg:py-8">
        <header className="mb-10 max-w-2xl">
          <div className="h-3 w-20 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-3 h-7 w-52 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-4 h-5 w-96 animate-pulse rounded bg-surface-code/10" />
        </header>
        <div className="space-y-8">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-5 w-32 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-1 h-4 w-56 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="space-y-3">
                  <div className="h-4 w-20 animate-pulse rounded bg-surface-code/10" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-5 w-44 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-1 h-4 w-72 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-6 h-14 animate-pulse rounded-md bg-surface-code/10" />
          </div>
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-5 w-28 animate-pulse rounded bg-surface-code/10" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative mx-auto max-w-[1280px] px-8 py-6 sm:px-10 lg:px-12 lg:py-8">
      <header className="mb-10 max-w-2xl">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
          Preferences
        </p>
        <h1 className="font-[family-name:var(--font-dm-serif)] mt-3 text-[40px] tracking-[-0.5px] text-ink leading-[1.10] sm:text-[52px]">
          Account Settings
        </h1>
        <p className="mt-4 text-base leading-[1.55] text-slate">
          Manage your personal details, workspace preferences, and security
          settings.
        </p>
      </header>

      <div className="space-y-8">
        <section className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <h2 className="text-lg font-medium text-ink">
            Profile Details
          </h2>
          <p className="mt-1 text-sm text-stone">
            This is how we identify you in the QuickR platform.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm font-medium text-ink">
                Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isPending || saving}
                placeholder="Your name"
                 className="w-full h-11 rounded-md border border-hairline-strong bg-canvas px-4 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-medium text-ink">
                Email Address
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                disabled
                placeholder="you@example.com"
                className="w-full rounded-md border border-hairline-soft bg-surface px-4 py-3 text-sm text-stone outline-none cursor-not-allowed"
              />
              <p className="text-xs text-stone">
                Your email is tied to your account and cannot be changed.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <h2 className="text-lg font-medium text-ink">
            Workspace Preferences
          </h2>
          <p className="mt-1 text-sm text-stone">
            Customize how your QR codes are generated and managed by default.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-md border border-hairline-soft bg-surface p-4">
              <div>
                <p className="text-sm font-medium text-ink">
                  High-Resolution Downloads
                </p>
                <p className="text-xs text-stone mt-1">
                  Export QR codes in maximum PNG quality by default.
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors"
                aria-pressed="true"
              >
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-on-primary transition-transform" />
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-red-200 bg-canvas p-6 sm:p-8">
          <h2 className="text-lg font-medium text-red-700">Danger Zone</h2>
          <p className="mt-1 text-sm text-stone">
            Irreversible, destructive actions related to your account.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-md border border-red-100 bg-red-50 p-5">
            <div>
              <p className="text-sm font-medium text-ink">
                Delete Account
              </p>
              <p className="mt-1 text-xs text-stone">
                Permanently remove your account and all associated QR codes.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="rounded-md border border-red-200 bg-canvas px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving || isPending}
            className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
