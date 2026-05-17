import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-100/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-80 h-80 w-80 rounded-full bg-emerald-100/30 blur-3xl" />

      <Header />
      <div className="pt-16 sm:pt-16">{children}</div>
    </div>
  );
}
