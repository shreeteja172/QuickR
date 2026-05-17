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
    <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="relative w-full">
        <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-[0_18px_50px_-34px_rgba(15,23,42,0.3)] sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Saved QR codes
              </p>
              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
                Browse your generated QR history
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                Every QR code you create appears here with a quick path to its
                detail page.
              </p>
            </div>

            <Link
              href="/dashboard/create"
              className="w-full inline-flex shrink-0 items-center justify-center sm:w-auto rounded-xl bg-slate-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2"
            >
              New QR
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-8">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-56 animate-pulse rounded-3xl border border-slate-200 bg-slate-50"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-3xl border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
                {error instanceof Error
                  ? error.message
                  : "Unable to load QR history."}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-16 text-center text-sm text-slate-500">
                No QR codes yet. Generate one to populate this history.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((qr) => (
                  <Link
                    key={qr.id}
                    href={`/dashboard/qr/${qr.id}`}
                    className="group block"
                  >
                    <div className="h-full rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-slate-300 hover:bg-slate-100/50">
                      <div className="flex items-center justify-center rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
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
                      <p className="mt-5 truncate text-sm font-semibold text-slate-900 group-hover:text-slate-600 transition">
                        {qr.data}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        /dashboard/qr/{qr.id}
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
