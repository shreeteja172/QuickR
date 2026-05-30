"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
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
    <main className="relative mx-auto max-w-[1280px] px-8 py-12 sm:px-10 lg:px-12 lg:py-16">
      <section
        aria-labelledby="qr-studio-heading"
        className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8"
      >
        <div>
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

        <div className="space-y-6 lg:space-y-8">
          <QRPreview qr={qr} text={text} />
          <QRStats />

          <div className="rounded-lg border border-hairline-soft bg-canvas p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium text-ink">
                  Recent Generations
                </h2>
                <p className="mt-1 text-sm text-stone">
                  Codes stay available for quick follow-up.
                </p>
              </div>
              <span className="rounded-full bg-cream-deeper px-3 py-1 text-[11px] font-semibold text-ink">
                {result.length} item{result.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="mt-6 space-y-3">
              {result.length === 0 ? (
                <div className="rounded-md border border-hairline-soft bg-surface px-4 py-8 text-center text-sm text-stone">
                  Nothing saved yet. Generate a QR code to see it here.
                </div>
              ) : (
                result.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 rounded-md border border-hairline-soft bg-surface px-4 py-4"
                  >
                    <Image
                      src={item.image}
                      alt={`QR code for ${item.data}`}
                      width={84}
                      height={84}
                      unoptimized
                      className="rounded-md border border-hairline-soft bg-canvas"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-ink">
                        {item.data}
                      </p>
                      <p className="mt-1 text-xs text-stone">
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
