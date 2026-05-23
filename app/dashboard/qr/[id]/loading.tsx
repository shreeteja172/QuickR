export default function QrDetailLoading() {
  return (
    <main className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="mb-6 h-4 w-32 animate-pulse rounded bg-surface-code/10" />
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-8">
        <div className="space-y-6">
          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-3 w-16 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-2 h-7 w-48 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-8 rounded-md border border-hairline-soft bg-surface p-6">
              <div className="h-3 w-28 animate-pulse rounded bg-surface-code/10" />
              <div className="mt-4 h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
            </div>
          </div>

          <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
            <div className="h-5 w-40 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-1 h-4 w-64 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="h-10 flex-1 animate-pulse rounded-md bg-surface-code/10" />
              <div className="h-10 w-32 animate-pulse rounded-md bg-surface-code/10" />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-md border border-hairline-soft bg-surface p-4">
                  <div className="h-3 w-16 animate-pulse rounded bg-surface-code/10" />
                  <div className="mt-1 h-4 w-32 animate-pulse rounded bg-surface-code/10" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="text-center mb-6">
            <div className="mx-auto h-5 w-32 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-1 mx-auto h-4 w-36 animate-pulse rounded bg-surface-code/10" />
          </div>
          <div className="flex justify-center rounded-md bg-surface p-8 border border-hairline-soft">
            <div className="h-48 w-48 animate-pulse rounded-md bg-surface-code/10" />
          </div>
          <div className="mt-6 h-11 w-full animate-pulse rounded-md bg-surface-code/10" />
        </div>
      </section>
    </main>
  );
}
