export default function QRStats() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-hairline-soft bg-canvas p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
          Format
        </p>
        <p className="mt-2 text-base font-medium text-ink">PNG</p>
      </div>
      <div className="rounded-lg border border-hairline-soft bg-canvas p-4">
        <p className="text-[11px] font-semibold uppercase tracking-[1px] text-stone">
          Status
        </p>
        <p className="mt-2 text-base font-medium text-ink">Ready</p>
      </div>
    </div>
  );
}
