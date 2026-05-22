import Header from "@/components/layout/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-slate-200" />

      <Header />
      <div className="pt-16 sm:pt-16">{children}</div>
    </div>
  );
}
