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
      className="mt-8 space-y-5 rounded-lg border border-beige-deep bg-cream p-8"
      onSubmit={(e) => {
        e.preventDefault();
        generateQR();
      }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
        Content
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste a URL or text you want to encode"
        className="min-h-32 w-full rounded-md border border-hairline-strong bg-canvas p-4 text-sm text-ink outline-none transition placeholder:text-stone focus:border-primary focus:ring-2 focus:ring-primary/10"
      />

      {error && (
        <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isGenerating || !text.trim()}
        className="inline-flex w-full items-center justify-center rounded-md bg-primary px-5 py-3 text-sm font-medium text-on-primary transition hover:bg-primary-deep disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isGenerating ? "Generating..." : "Generate QR"}
      </button>

      {qr && (
        <a
          href={qr}
          download="qrcode.png"
          className="inline-flex w-full items-center justify-center rounded-md bg-ink px-5 py-3 text-sm font-medium text-on-dark transition hover:bg-charcoal"
        >
          Download
        </a>
      )}
    </form>
  );
}
