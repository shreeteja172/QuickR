type Props = {
  text: string;
  setText: (v: string) => void;
  generateQR: () => void;
  isGenerating: boolean;
  error: string;
  qr: string;
};

export default function QRForm({
  text,
  setText,
  generateQR,
  isGenerating,
  error,
  qr,
}: Props) {
  return (
    <form
      className="mt-8 space-y-5 rounded-[1.75rem] border border-slate-200 bg-white/90 p-5 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)] backdrop-blur-sm"
      onSubmit={(e) => {
        e.preventDefault();
        generateQR();
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a URL or text you want to encode"
        className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:ring-4 focus:ring-sky-100"
      />

      {error && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isGenerating || !text.trim()}
        className="inline-flex w-full items-center justify-center rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? "Generating..." : "Generate QR"}
      </button>

      {qr && (
        <a
          href={qr}
          download="qrcode.png"
          className="inline-flex w-full items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:shadow-sm"
        >
          Download
        </a>
      )}
    </form>
  );
}
