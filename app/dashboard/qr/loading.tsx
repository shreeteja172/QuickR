export default function QrHistoryLoading() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <section className="relative w-full">
        <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div>
              <div className="h-3 w-24 animate-pulse rounded bg-surface-code/10" />
              <div className="mt-2 h-7 w-72 animate-pulse rounded bg-surface-code/10" />
              <div className="mt-3 h-4 w-96 animate-pulse rounded bg-surface-code/10" />
            </div>
            <div className="h-10 w-24 animate-pulse rounded-md bg-surface-code/10" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="rounded-lg border border-hairline-soft bg-surface p-5"
              >
                <div className="flex items-center justify-center rounded-md border border-hairline-soft bg-canvas p-8">
                  <div className="h-32 w-32 animate-pulse rounded-md bg-surface-code/10" />
                </div>
                <div className="mt-5 h-4 w-36 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-3 w-48 animate-pulse rounded bg-surface-code/10" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
