"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

type QRItem = {
  id: string;
  data: string;
  image: string;
  createdAt?: string;
};

const Page = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["qr"],
    queryFn: async () => {
      const res = await axios.get("/api/qr");
      return res.data as QRItem[];
    },
  });

  const items = data ?? [];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#ecfbff_0%,#f8fbff_40%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute -left-24 -top-12 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-sky-200/35 blur-3xl" />

      <section className="relative mx-auto w-full max-w-6xl">
        <div className="mb-6 flex flex-wrap items-center gap-3 text-sm text-slate-600">
          <Link
            href="/dashboard"
            className="font-medium text-slate-900 hover:underline"
          >
            Dashboard
          </Link>
          <span aria-hidden="true">/</span>
          <span>QR History</span>
          <button
            type="button"
            onClick={() => {
              toast.promise(refetch(), {
                loading: "Refreshing history...",
                success: "History updated.",
                error: "Failed to refresh history.",
              });
            }}
            className="ml-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:shadow-sm"
          >
            Refresh
          </button>
        </div>

        <div className="rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Saved QR codes
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900">
                Browse your generated QR history
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                Every QR code you create appears here with a quick path to its
                detail page.
              </p>
            </div>

            <Link
              href="/dashboard/create"
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              New QR
            </Link>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-56 animate-pulse rounded-2xl border border-slate-200 bg-slate-50"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-5 text-sm text-red-700">
                {error instanceof Error
                  ? error.message
                  : "Unable to load QR history."}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-10 text-center text-sm text-slate-500">
                No QR codes yet. Generate one to populate this history.
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((qr) => (
                  <Link
                    key={qr.id}
                    href={`/dashboard/qr/${qr.id}`}
                    className="group block"
                  >
                    <div className="h-full rounded-2xl border border-slate-200 bg-slate-50 p-4 transition group-hover:-translate-y-1 group-hover:border-slate-300 group-hover:shadow-lg">
                      <div className="flex items-center justify-center rounded-2xl bg-white p-4">
                        <Image
                          src={qr.image}
                          alt={
                            qr.data ? `QR code for ${qr.data}` : "QR code image"
                          }
                          width={160}
                          height={160}
                          unoptimized
                          className="rounded-xl"
                        />
                      </div>
                      <p className="mt-4 truncate text-sm font-semibold text-slate-900">
                        {qr.data}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        Open detail page
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Page;
