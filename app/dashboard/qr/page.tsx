"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

type QRItem = {
  id: string;
  data: string;
  image: string;
  createdAt?: string;
};

const Page = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["qr"],
    queryFn: async () => {
      const res = await axios.get("/api/qr");
      return res.data as QRItem[];
    },
  });

  const items = data ?? [];

  return (
    <main className="relative mx-auto max-w-[1280px] px-8 py-6 sm:px-10 lg:px-12 lg:py-8">
      <section className="relative w-full">
        <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
                Saved QR codes
              </p>
              <h1 className="font-[family-name:var(--font-dm-serif)] mt-2 text-[40px] tracking-[-0.5px] text-ink leading-[1.10] sm:text-[52px]">
                Browse your generated QR history
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-[1.55] text-slate">
                Every QR code you create appears here with a quick path to its
                detail page.
              </p>
            </div>

            <Link
              href="/dashboard/create"
              className="w-full inline-flex shrink-0 items-center justify-center sm:w-auto rounded-md bg-primary px-5 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className="h-56 animate-pulse rounded-lg border border-hairline-soft bg-surface"
                  />
                ))}
              </div>
            ) : isError ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-700">
                {error instanceof Error
                  ? error.message
                  : "Unable to load QR history."}
              </div>
            ) : items.length === 0 ? (
              <div className="rounded-md border border-hairline-soft bg-surface px-4 py-16 text-center text-sm text-stone">
                No QR codes yet. Generate one to populate this history.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((qr) => (
                  <Link
                    key={qr.id}
                    href={`/dashboard/qr/${qr.id}`}
                    className="group block"
                  >
                    <div className="h-full rounded-lg border border-hairline-soft bg-surface p-5 transition hover:border-hairline-strong hover:bg-cream">
                      <div className="flex items-center justify-center rounded-md border border-hairline-soft bg-canvas p-5">
                        <Image
                          src={qr.image}
                          alt={
                            qr.data ? `QR code for ${qr.data}` : "QR code image"
                          }
                          width={160}
                          height={160}
                          unoptimized
                          className="rounded-md"
                        />
                      </div>
                      <p className="mt-5 truncate text-sm font-medium text-ink group-hover:text-primary transition">
                        {qr.data}
                      </p>
                      <p className="mt-1 text-xs text-stone">
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
