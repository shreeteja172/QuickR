export default function CreateLoading() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-8">
        <div>
          <div className="h-3 w-24 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-2 h-8 w-72 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-3 h-4 w-96 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-8 rounded-lg border border-hairline-soft bg-canvas p-5">
            <div className="h-32 w-full animate-pulse rounded-md bg-surface-code/10" />
            <div className="mt-5 h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
          </div>
        </div>

        <div className="space-y-6 lg:space-y-8">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-5">
            <div className="flex min-h-80 items-center justify-center rounded-md border border-dashed border-hairline-strong bg-surface">
              <div>
                <div className="h-5 w-28 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-4 w-52 animate-pulse rounded bg-surface-code/10" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-hairline-soft bg-canvas p-4">
                <div className="h-3 w-12 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-5 w-16 animate-pulse rounded bg-surface-code/10" />
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="h-5 w-40 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-1 h-4 w-52 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="h-6 w-16 animate-pulse rounded-full bg-surface-code/10" />
            </div>
            <div className="mt-6 h-20 animate-pulse rounded-md bg-surface-code/10" />
          </div>
        </div>
      </section>
    </main>
  );
}
