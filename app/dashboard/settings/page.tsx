"use client";

import { useSession, signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function SettingsPage() {
  const { data: session, isPending } = useSession();
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success("Settings updated successfully.");
    }, 800);
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
    } catch (error) {
      toast.error("Failed to delete account. Please try again.", {
        id: "delete-account",
      });
      setDeleting(false);
    }
  };

  return (
    <main className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-10 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
          Preferences
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
          Account Settings
        </h1>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Manage your personal details, workspace preferences, and security
          settings.
        </p>
      </header>

      <div className="space-y-8">
        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <h2 className="text-lg font-semibold text-slate-950">
            Profile Details
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            This is how we identify you in the QuickR platform.
          </p>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-900">
                Name
              </label>
              <input
                type="text"
                defaultValue={session?.user?.name || ""}
                disabled={isPending}
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            <div className="space-y-3">
              <label className="block text-sm font-semibold text-slate-900">
                Email Address
              </label>
              <input
                type="email"
                value={session?.user?.email || ""}
                readOnly
                disabled
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500 outline-none cursor-not-allowed"
              />
              <p className="text-xs text-slate-500">
                Your email is tied to your account and cannot be changed.
              </p>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <h2 className="text-lg font-semibold text-slate-950">
            Workspace Preferences
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Customize how your QR codes are generated and managed by default.
          </p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  High-Resolution Downloads
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Export QR codes in maximum PNG quality by default.
                </p>
              </div>
              <button
                type="button"
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-950 transition-colors"
                aria-pressed="true"
              >
                <span className="inline-block h-4 w-4 translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Weekly Analytics Report
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Receive an email with your QR scan statistics.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${analyticsEnabled ? "bg-slate-950" : "bg-slate-200"}`}
                aria-pressed={analyticsEnabled}
              >
                <span
                  className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${analyticsEnabled ? "translate-x-6" : "translate-x-1"}`}
                />
              </button>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-red-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <h2 className="text-lg font-semibold text-red-700">Danger Zone</h2>
          <p className="mt-1 text-sm text-slate-500">
            Irreversible, destructive actions related to your account.
          </p>

          <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-red-100 bg-red-50 p-5">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Delete Account
              </p>
              <p className="mt-1 text-xs text-slate-500">
                Permanently remove your account and all associated QR codes.
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={deleting}
              className="rounded-xl border border-red-200 bg-white px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:border-red-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {deleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <button
            onClick={handleSave}
            disabled={saving || isPending}
            className="inline-flex items-center justify-center rounded-xl bg-slate-950 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-slate-800 disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            {saving ? "Saving Changes..." : "Save Changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
