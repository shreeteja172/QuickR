"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "@/lib/auth-client";

export default function QRDetail() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const [newlink, setNewlink] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/signup");
    }
  }, [isPending, session, router]);

  const { data, isLoading } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await axios.get(`/api/qr/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const downloadQRImage = async () => {
    setDownloading(true);
    try {
      const exportRes = await fetch(`/api/qr/${id}/export`);
      if (exportRes.ok) {
        const blob = await exportRes.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `qr-${id}-4k.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        toast.success("QR code downloaded (4K)");
        return;
      }

      if (!data?.image) {
        toast.error("QR image not available");
        return;
      }

      const response = await fetch(data.image);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qr-${id}.png`;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);

      toast.success("QR code downloaded");
    } catch (error) {
      console.error(error);
      toast.error("Failed to download QR code");
    } finally {
      setDownloading(false);
    }
  };

  const copyToClipboard = () => {
    if (!data?.data) return;
    navigator.clipboard.writeText(data.data);
    setIsCopied(true);
    toast.success("Link copied to clipboard!");
    setTimeout(() => setIsCopied(false), 2000);
  };

  const mutation = useMutation({
    mutationFn: async (newlink: string) => {
      const res = await axios.put(`/api/qr/${id}`, {
        link: newlink,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["qr", id] });
      toast.success("QR destination updated.");
      setNewlink("");
    },
  });

  const updateData = () => {
    if (!newlink.trim()) {
      toast.error("Enter a valid URL first.");
      return;
    }
    mutation.mutate(newlink);
  };

  if (isLoading) {
    return (
      <main className="relative mx-auto max-w-[1280px] px-8 py-12 sm:px-10 lg:px-12 lg:py-16">
        <div className="mb-6 h-6 w-48 animate-pulse rounded-md bg-hairline-soft"></div>
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="h-100 animate-pulse rounded-lg bg-surface border border-hairline-soft"></div>
          <div className="h-125 animate-pulse rounded-lg bg-surface border border-hairline-soft"></div>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-lg border border-hairline-soft bg-canvas p-10 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-surface">
            <svg
              className="h-8 w-8 text-stone"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-xl font-medium text-ink">
            QR code not found
          </p>
          <p className="mt-2 text-sm text-stone max-w-md">
            The QR code you&apos;re looking for doesn&apos;t exist, has been
            deleted, or you don&apos;t have permission to view it.
          </p>
          <Link
            href="/dashboard/qr"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-ink px-6 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to History
          </Link>
        </div>
      </main>
    );
  }

  const isValid = newlink.trim() !== "";

  return (
    <main className="relative mx-auto max-w-[1280px] px-8 py-12 sm:px-10 lg:px-12 lg:py-16">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div className="flex flex-col gap-6">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
              QR Detail
            </p>
            <h1 className="font-[family-name:var(--font-dm-serif)] mt-2 text-[40px] tracking-[-0.5px] text-ink leading-[1.10] sm:text-[52px]">
              Update and inspect
            </h1>
            <p className="mt-3 text-sm leading-[1.55] text-slate max-w-xl">
              Manage your QR code destination, track its configuration, and
              update it in real-time without replacing the physical code.
            </p>

            <div className="mt-8 rounded-md border border-hairline-soft bg-surface p-6">
              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                  Current destination
                </p>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="break-all text-sm font-medium text-ink bg-canvas border border-hairline-soft py-3 px-4 rounded-md flex-1">
                  {data.data}
                </p>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={copyToClipboard}
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-ink px-4 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                  >
                    {isCopied ? (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                    {isCopied ? "Copied!" : "Copy"}
                  </button>
                  <a
                    href={data.data}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-hairline-strong bg-canvas px-4 py-3 text-sm font-medium text-slate transition hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                    title="Open live link"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <h2 className="text-lg font-medium text-ink mb-1">
              Developer Actions
            </h2>
            <p className="text-sm text-stone mb-6">
              Modify the destination URL dynamically without changing the
              physical QR code.
            </p>

            <div className="space-y-4">
              <label
                htmlFor="new-link"
                className="block text-sm font-medium text-ink"
              >
                Replace destination URL
              </label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  id="new-link"
                  type="text"
                  value={newlink}
                  onChange={(e) => setNewlink(e.target.value)}
                  placeholder="https://example.com/new-path"
                  className="flex-1 rounded-md border border-hairline-strong bg-surface px-4 py-3 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
                />
                <button
                  onClick={updateData}
                  disabled={!isValid || mutation.isPending}
                  className="inline-flex shrink-0 items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-2"
                >
                  {mutation.isPending ? "Updating..." : "Update Route"}
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-hairline-soft bg-surface p-4">
                <p className="text-[11px] uppercase tracking-[1px] text-stone mb-1">
                  System ID
                </p>
                <p className="truncate text-sm font-medium text-ink font-[family-name:var(--font-jetbrains-mono)]">
                  {id}
                </p>
              </div>
              <div className="rounded-md border border-hairline-soft bg-surface p-4">
                <p className="text-[11px] uppercase tracking-[1px] text-stone mb-1">
                  Analytics
                </p>
                <p className="text-sm text-stone italic">
                  Tracking coming soon...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="sticky top-8 space-y-6 rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-medium text-ink">
                QR Code Preview
              </h3>
              <p className="text-sm text-stone mt-1">
                Ready to scan and share
              </p>
            </div>

            <div className="flex justify-center rounded-md bg-surface p-8 border border-hairline-soft relative group overflow-hidden">
              <div className="relative rounded-md bg-canvas p-4 shadow-[0_4px_12px_rgba(0,0,0,0.04)] ring-1 ring-hairline transition-transform duration-500 group-hover:scale-105">
                <Image
                  src={data.image}
                  width={260}
                  height={260}
                  alt="QR Code"
                  unoptimized
                  className="rounded-md"
                />
              </div>
            </div>

            <button
              onClick={downloadQRImage}
              disabled={downloading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-ink px-4 py-4 text-sm font-medium text-on-dark transition hover:bg-charcoal disabled:cursor-not-allowed disabled:opacity-60"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4"
                />
              </svg>
              {downloading ? "Downloading..." : "Download High-Res QR"}
            </button>

            <p className="text-center text-xs text-stone mt-4">
              Downloads as PNG optimized for print and digital use.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
