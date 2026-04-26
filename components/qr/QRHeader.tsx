export default function QRHeader() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
          Quickr QR Studio
        </p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Generate polished QR codes in seconds
        </h1>
        <p className="mt-3 max-w-xl text-sm text-slate-600">
          Turn links and text into clean QR codes.
        </p>
      </div>

      <span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
        Live Preview
      </span>
    </div>
  );
}