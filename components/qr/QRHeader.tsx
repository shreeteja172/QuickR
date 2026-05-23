export default function QRHeader() {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
          Quickr QR Studio
        </p>
        <h1 className="font-[family-name:var(--font-dm-serif)] mt-2 text-[40px] tracking-[-0.5px] text-ink leading-[1.10] sm:text-[52px]">
          Generate polished QR codes in seconds
        </h1>
        <p className="mt-3 max-w-xl text-[18px] leading-[1.50] text-slate">
          Turn links and text into clean QR codes with fast previews, safe URL
          validation, and instant toast feedback.
        </p>
      </div>
    </div>
  );
}
