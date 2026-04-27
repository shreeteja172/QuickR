"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";

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
  const [text, setText] = useState("");
  const [qr, setQr] = useState("");
  const [result, setResult] = useState<QRItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateQR = async () => {
    if (!text.trim()) {
      setError("Enter something");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");

      const res = await axios.post("/api/qr", {
        data: text,
      });

      setQr(res.data.image);
      setResult((prev) => [res.data, ...prev]);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error.response?.data as { error?: string } | undefined)?.error ??
          error.message;
        setError(message || "Error generating QR");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Error generating QR");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <main className="p-6 grid lg:grid-cols-2 gap-6">
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

      <div>
        <QRPreview qr={qr} text={text} />
        <QRStats />
        <div className="mt-6">
          <h2 className="text-lg font-semibold">Saved QRs</h2>

          {result.map((qr) => (
            <div key={qr.id} className="mt-2">
              <Image
                src={qr.image}
                alt={`QR code for ${qr.data}`}
                width={120}
                height={120}
                unoptimized
              />
              <p>{qr.data}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
