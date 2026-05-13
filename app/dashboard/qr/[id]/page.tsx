"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";

export default function QRDetail() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const [newlink, setNewlink] = useState("");
  const [downloading, setDownloading] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await axios.get(`/api/qr/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  const downloadQRImage = async () => {
    if (!data?.image) {
      toast.error("QR image not available");
      return;
    }

    setDownloading(true);
    try {
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
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex min-h-[50vh] items-center justify-center rounded-4xl border border-slate-200 bg-white p-10 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)]">
          <p className="text-sm font-medium text-slate-600">Loading QR details...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)]">
          <p className="text-lg font-semibold text-slate-900">QR not found</p>
          <p className="mt-2 text-sm text-slate-600">
            The QR code may have been removed or the link is invalid.
          </p>
          <Link
            href="/dashboard/qr"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Back to history
          </Link>
        </div>
      </main>
    );
  }

  const isValid = newlink.trim() !== "";
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            QR Detail
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
            Update and inspect
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Review the current destination, preview the QR image, and replace
            the link when needed.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Current destination
            </p>
            <p className="mt-2 break-all text-sm font-medium text-slate-900">
              {data.data}
            </p>
            <a
              href={data.data}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 hover:shadow-sm"
            >
              Open live link
            </a>
          </div>
        </div>

        <div className="space-y-6 rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <div className="flex justify-center rounded-3xl bg-slate-50 p-6 border border-slate-100">
            <Image
              src={data.image}
              width={240}
              height={240}
              alt="QR"
              unoptimized
            />
          </div>

          <button
            onClick={downloadQRImage}
            disabled={downloading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
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
                d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            {downloading ? "Downloading..." : "Download QR Code"}
          </button>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                ID
              </p>
              <p className="mt-2 break-all text-sm font-medium text-slate-900">
                {id}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                State
              </p>
              <p className="mt-2 text-sm font-medium text-emerald-700">
                Active
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <label
              htmlFor="new-link"
              className="block text-sm font-semibold text-slate-900"
            >
              Replace destination
            </label>
            <input
              id="new-link"
              type="text"
              value={newlink}
              onChange={(e) => setNewlink(e.target.value)}
              placeholder="Paste a new URL"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:ring-4 focus:ring-slate-100"
            />
            <button
              onClick={updateData}
              disabled={!isValid || mutation.isPending}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? "Updating..." : "Update QR"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
