export default function QRStats() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)]">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
          Format
        </p>
        <p className="mt-2 text-base font-semibold text-slate-900">PNG</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.5)]">
        <p className="text-xs uppercase tracking-[0.16em] text-slate-500">
          Status
        </p>
        <p className="mt-2 text-base font-semibold text-emerald-700">Ready</p>
      </div>
    </div>
  );
}
