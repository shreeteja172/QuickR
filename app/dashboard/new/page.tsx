"use client";

import Image from "next/image";
import { useState } from "react";
import QRCode from "qrcode";

export default function Page() {
  const [text, setText] = useState("https://quickr.app/launch");
  const [qr, setQr] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  const generateQR = async () => {
    if (!text.trim()) {
      setQr("");
      setError("Enter a URL or text to generate a QR code.");
      return;
    }

    try {
      setIsGenerating(true);
      setError("");

      const url = await QRCode.toDataURL(text, {
        errorCorrectionLevel: "M",
        margin: 2,
        width: 512,
        color: {
          dark: "#0f172a",
          light: "#ffffff",
        },
      });

      setQr(url);
    } catch (err) {
      setQr("");
      setError("Unable to generate that QR code. Try a shorter value.");
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generateQR();
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_10%,#d9f7ff_0%,#f7fbff_32%,#f7fff8_58%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-28 -top-16 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -right-24 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

      <section className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                Quickr QR Studio
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Generate polished QR codes in seconds
              </h1>
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
                Turn links, text, and campaign destinations into clean QR codes
                with a focused workflow that stays out of your way.
              </p>
            </div>
            <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Live Preview
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Layout
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                Dashboard shell
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Mode
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                QR generator
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Export
              </p>
              <p className="mt-2 text-sm font-medium text-slate-900">
                PNG download
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
              Destination URL or text
              <textarea
                value={text}
                onChange={(event) => setText(event.target.value)}
                placeholder="https://quickr.app/launch"
                rows={4}
                className="min-h-28 rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-cyan-300 transition placeholder:text-slate-400 focus:ring-2"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Style
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Slate / White
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Error correction
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  Medium
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Output
                </p>
                <p className="mt-2 text-sm font-medium text-slate-900">
                  PNG download
                </p>
              </div>
            </div>

            {error ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isGenerating}
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isGenerating ? "Generating..." : "Generate QR"}
              </button>

              {qr ? (
                <a
                  href={qr}
                  download="qrcode.png"
                  className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                >
                  Download PNG
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-400"
                >
                  Download PNG
                </button>
              )}
            </div>
          </form>
        </article>

        <aside className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
          <p className="text-sm font-semibold text-slate-700">QR Preview</p>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <div className="mx-auto flex aspect-square max-w-80 items-center justify-center rounded-3xl bg-white p-4 shadow-inner">
              {qr ? (
                <Image
                  src={qr}
                  alt="Generated QR code"
                  fill
                  sizes="(max-width: 768px) 100vw, 480px"
                  className="object-contain p-2"
                  unoptimized
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-sm text-slate-500">
                  <span className="text-base font-semibold text-slate-700">
                    Preview waiting
                  </span>
                  <span className="mt-1 max-w-52 leading-6">
                    Enter a destination and generate to see your code here.
                  </span>
                </div>
              )}
            </div>

            <p className="mt-4 break-all text-center text-xs text-slate-500">
              {text || "No destination set"}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 text-center">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <p className="text-xs text-slate-500">Format</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">PNG</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
              <p className="text-xs text-slate-500">State</p>
              <p className="mt-1 text-lg font-semibold text-slate-900">
                {qr ? "Ready" : "Idle"}
              </p>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}
