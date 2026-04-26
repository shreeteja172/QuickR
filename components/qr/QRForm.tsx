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
      className="mt-8 space-y-5"
      onSubmit={(e) => {
        e.preventDefault();
        generateQR();
      }}
    >
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full rounded-2xl border p-3"
      />

      {error && <p className="text-red-500">{error}</p>}

      <button type="submit" disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate QR"}
      </button>

      {qr && (
        <a href={qr} download="qrcode.png">
          Download
        </a>
      )}
    </form>
  );
}
