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

  const { data, isLoading } = useQuery({
    queryKey: ["qr", id],
    queryFn: async () => {
      const res = await axios.get(`/api/qr/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

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
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#eefbff_0%,#f8fbff_42%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center rounded-[2rem] border border-slate-200 bg-white/90 p-10 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)]">
          <p className="text-sm text-slate-600">Loading QR details...</p>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-[radial-gradient(circle_at_10%_10%,#eefbff_0%,#f8fbff_42%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="mx-auto flex min-h-[60vh] max-w-4xl flex-col items-center justify-center rounded-[2rem] border border-slate-200 bg-white/90 p-10 text-center shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)]">
          <p className="text-lg font-semibold text-slate-900">QR not found</p>
          <p className="mt-2 text-sm text-slate-600">
            The QR code may have been removed or the link is invalid.
          </p>
          <Link
            href="/dashboard/qr"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Back to history
          </Link>
        </div>
      </main>
    );
  }

  const isValid = newlink.trim() !== "";
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#eefbff_0%,#f8fbff_42%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute -left-24 -top-12 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            QR Detail
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
            Update and inspect this code
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Review the current destination, preview the QR image, and replace
            the link when needed.
          </p>

          <div className="mt-8 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
              Current destination
            </p>
            <p className="mt-2 break-all text-sm font-medium text-slate-900">
              {data.data}
            </p>
            <a
              href={data.data}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:shadow-sm"
            >
              Open live link
            </a>
          </div>
        </div>

        <div className="space-y-6 rounded-[2rem] border border-slate-200 bg-white/90 p-6 shadow-[0_28px_80px_-52px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <div className="flex justify-center rounded-2xl bg-slate-50 p-5">
            <Image
              src={data.image}
              width={240}
              height={240}
              alt="QR"
              unoptimized
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                ID
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-slate-900">
                {id}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
                State
              </p>
              <p className="mt-2 text-sm font-semibold text-emerald-700">
                Active
              </p>
            </div>
          </div>

          <div className="space-y-3 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4">
            <label
              htmlFor="new-link"
              className="text-sm font-semibold text-slate-900"
            >
              Replace destination
            </label>
            <input
              id="new-link"
              type="text"
              value={newlink}
              onChange={(e) => setNewlink(e.target.value)}
              placeholder="Paste a new URL"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
            />
            <button
              onClick={updateData}
              disabled={!isValid || mutation.isPending}
              className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {mutation.isPending ? "Updating..." : "Update QR"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
