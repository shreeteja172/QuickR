"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import QRHeader from "@/components/qr/QRHeader";
import QRForm from "@/components/qr/QRForm";
import QRPreview from "@/components/qr/QRPreview";
import QRStats from "@/components/qr/QRStats";

type QRItem = {
  id: string;
  data: string;
  image: string;
};

export default function Page() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");
  const [result, setResult] = useState<QRItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateQR = async () => {
    if (!text.trim()) {
      setError("Enter a URL or text to generate a QR code.");
      toast.error("Add content before generating a QR code.");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");
      toast.loading("Generating QR code...", { id: "generate-qr" });

      const res = await axios.post("/api/qr", {
        data: text,
      });

      setQr(res.data.image);
      setResult((prev) => [res.data, ...prev]);
      toast.success("QR code generated successfully.", { id: "generate-qr" });
      router.push(`/dashboard/qr/${res.data.id}`);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { error?: string } | undefined)?.error ??
          error.message;
        setError(message || "Error generating QR");
        toast.error(message || "Error generating QR", { id: "generate-qr" });
      } else if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message, { id: "generate-qr" });
      } else {
        setError("Error generating QR");
        toast.error("Error generating QR", { id: "generate-qr" });
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_10%,#e7f7ff_0%,#f8fbff_40%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-emerald-200/35 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <Link
              href="/dashboard"
              className="font-medium text-slate-900 hover:underline"
            >
              Dashboard
            </Link>
            <span aria-hidden="true">/</span>
            <span>Create QR</span>
            <Link
              href="/dashboard/qr"
              className="ml-auto rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:shadow-sm"
            >
              Open history
            </Link>
          </div>

          <QRHeader />
          <QRForm
            text={text}
            setText={setText}
            generateQR={generateQR}
            isGenerating={isGenerating}
            error={error}
            qr={qr}
          />
        </div>

        <div className="space-y-6">
          <QRPreview qr={qr} text={text} />
          <QRStats />

          <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)] backdrop-blur-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Saved QRs
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Recent codes stay available for quick follow-up.
                </p>
              </div>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                {result.length} item{result.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              {result.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                  Nothing saved yet. Generate a QR code to see it here.
                </div>
              ) : (
                result.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
                  >
                    <Image
                      src={item.image}
                      alt={`QR code for ${item.data}`}
                      width={84}
                      height={84}
                      unoptimized
                      className="rounded-xl border border-slate-200 bg-white"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {item.data}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        /dashboard/qr/{item.id}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
