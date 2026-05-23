export default function DashboardLoading() {
  return (
    <main className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <header className="mb-10 max-w-2xl">
        <div className="h-3 w-16 animate-pulse rounded bg-surface-code/10" />
        <div className="mt-3 h-8 w-72 animate-pulse rounded bg-surface-code/10" />
        <div className="mt-4 h-5 w-96 animate-pulse rounded bg-surface-code/10" />
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        <div className="space-y-6 lg:space-y-8">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="h-5 w-48 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-4 w-64 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="h-10 w-28 animate-pulse rounded-md bg-surface-code/10" />
            </div>
          </div>

          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="h-5 w-36 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-4 w-48 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="h-4 w-24 animate-pulse rounded bg-surface-code/10" />
            </div>
            <div className="rounded-lg border border-hairline-soft bg-surface p-10 text-center">
              <div className="mx-auto h-12 w-12 animate-pulse rounded-md bg-surface-code/10" />
              <div className="mt-4 mx-auto h-4 w-32 animate-pulse rounded bg-surface-code/10" />
              <div className="mt-2 mx-auto h-4 w-48 animate-pulse rounded bg-surface-code/10" />
            </div>
          </div>
        </div>

        <aside className="space-y-6 lg:space-y-8">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-3 w-24 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-5 space-y-3">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-md border border-hairline-soft bg-surface p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="h-4 w-20 animate-pulse rounded bg-surface-code/10" />
                      <div className="mt-2 h-3 w-28 animate-pulse rounded bg-surface-code/10" />
                    </div>
                    <div className="h-4 w-4 animate-pulse rounded bg-surface-code/10" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-3 w-28 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-5 space-y-4">
              {[1, 2].map((i) => (
                <div key={i} className="flex items-center justify-between rounded-md border border-hairline-soft bg-surface p-4">
                  <div className="h-4 w-20 animate-pulse rounded bg-surface-code/10" />
                  <div className="h-5 w-16 animate-pulse rounded-full bg-surface-code/10" />
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
