"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function QRDetail() {
  const queryClient = useQueryClient();
  const params = useParams();
  const id = params?.id as string;
  const [newlink, setNewlink] = useState("");
  const [downloading, setDownloading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
      <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="mb-6 h-6 w-48 animate-pulse rounded-md bg-slate-200"></div>
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
          <div className="h-[400px] animate-pulse rounded-4xl bg-slate-100 border border-slate-200"></div>
          <div className="h-[500px] animate-pulse rounded-4xl bg-slate-100 border border-slate-200"></div>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-4xl border border-slate-200 bg-white p-10 text-center shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)]">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
             <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <p className="text-xl font-semibold text-slate-900">QR code not found</p>
          <p className="mt-2 text-sm text-slate-500 max-w-md">
            The QR code you're looking for doesn't exist, has been deleted, or you don't have permission to view it.
          </p>
          <Link
            href="/dashboard/qr"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 shadow-md hover:shadow-lg"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            Back to History
          </Link>
        </div>
      </main>
    );
  }

  const isValid = newlink.trim() !== "";

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-500">
        <Link href="/dashboard" className="font-medium text-slate-600 hover:text-slate-950 transition">Dashboard</Link>
        <span aria-hidden="true">/</span>
        <Link href="/dashboard/qr" className="font-medium text-slate-600 hover:text-slate-950 transition">QR History</Link>
        <span aria-hidden="true">/</span>
        <span className="font-medium text-slate-900 truncate max-w-[200px] sm:max-w-none">{id}</span>
      </div>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">

        <div className="flex flex-col gap-6">

          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              QR Detail
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Update and inspect
            </h1>
            <p className="mt-3 text-sm leading-6 text-slate-600 max-w-xl">
              Manage your QR code destination, track its configuration, and update it in real-time without replacing the physical code.
            </p>

            <div className="mt-8 rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-inner">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                  Current destination
                </p>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  Active
                </span>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                 <p className="break-all text-sm font-medium text-slate-900 bg-white border border-slate-200 py-3 px-4 rounded-xl flex-1 shadow-sm">
                   {data.data}
                 </p>
                 <div className="flex items-center gap-2 shrink-0">
                    <button onClick={copyToClipboard} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 shadow-sm">
                      {isCopied ? (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                      )}
                      {isCopied ? "Copied!" : "Copy"}
                    </button>
                    <a href={data.data} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-200 focus:ring-offset-2 shadow-sm" title="Open live link">
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                 </div>
              </div>
            </div>
          </div>


          <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-1">Developer Actions</h2>
              <p className="text-sm text-slate-500 mb-6">Modify the destination URL dynamically without changing the physical QR code.</p>
              
              <div className="space-y-4">
                <label htmlFor="new-link" className="block text-sm font-semibold text-slate-900">
                  Replace destination URL
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    id="new-link"
                    type="text"
                    value={newlink}
                    onChange={(e) => setNewlink(e.target.value)}
                    placeholder="https://example.com/new-path"
                    className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-300 focus:bg-white focus:ring-4 focus:ring-slate-100"
                  />
                  <button
                    onClick={updateData}
                    disabled={!isValid || mutation.isPending}
                    className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-6 py-3 text-sm font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 shadow-md hover:shadow-lg"
                  >
                    {mutation.isPending ? "Updating..." : "Update Route"}
                  </button>
                </div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1">
                      System ID
                    </p>
                    <p className="truncate text-sm font-medium text-slate-900 font-mono">
                      {id}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500 mb-1">
                      Analytics
                    </p>
                    <p className="text-sm font-medium text-slate-400 italic">
                      Tracking coming soon...
                    </p>
                  </div>
              </div>
          </div>
        </div>


        <div className="flex flex-col">
          <div className="sticky top-8 space-y-6 rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
            <div className="text-center mb-6">
              <h3 className="text-lg font-semibold text-slate-900">QR Code Preview</h3>
              <p className="text-sm text-slate-500 mt-1">Ready to scan and share</p>
            </div>

            <div className="flex justify-center rounded-3xl bg-slate-50 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] p-8 border border-slate-200 shadow-inner relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-200/30 to-transparent rounded-3xl pointer-events-none"></div>
              <div className="relative rounded-2xl bg-white p-4 shadow-xl ring-1 ring-slate-900/5 transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl">
                <Image
                  src={data.image}
                  width={260}
                  height={260}
                  alt="QR Code"
                  unoptimized
                  className="rounded-xl"
                />
              </div>
            </div>

            <button
              onClick={downloadQRImage}
              disabled={downloading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-slate-900 bg-slate-900 px-4 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 hover:border-slate-800 disabled:cursor-not-allowed disabled:opacity-60 shadow-lg hover:shadow-xl"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 4v12m0 0l-4-4m4 4l4-4" /></svg>
              {downloading ? "Downloading..." : "Download High-Res QR"}
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4">
              Downloads as PNG optimized for print and digital use.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

