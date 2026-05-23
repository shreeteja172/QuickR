export default function SettingsLoading() {
  return (
    <main className="relative mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-10 max-w-2xl">
        <div className="h-3 w-20 animate-pulse rounded bg-surface-code/10" />
        <div className="mt-3 h-7 w-52 animate-pulse rounded bg-surface-code/10" />
        <div className="mt-4 h-5 w-96 animate-pulse rounded bg-surface-code/10" />
      </header>

      <div className="space-y-8">
        <section className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="h-5 w-32 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-1 h-4 w-56 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 w-20 animate-pulse rounded bg-surface-code/10" />
                <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="h-5 w-44 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-1 h-4 w-72 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-6">
            <div className="flex items-center justify-between rounded-md border border-hairline-soft bg-surface p-4">
              <div>
                <div className="h-4 w-40 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-3 w-56 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="h-6 w-11 animate-pulse rounded-full bg-surface-code/10" />
            </div>
          </div>
        </section>

        <section className="rounded-lg border border-hairline-soft bg-canvas p-6 sm:p-8">
          <div className="h-5 w-28 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-1 h-4 w-64 animate-pulse rounded bg-surface-code/10" />
          <div className="mt-6 rounded-md border border-hairline-soft bg-surface p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="h-4 w-28 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-2 h-3 w-52 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="h-9 w-28 animate-pulse rounded-md bg-surface-code/10" />
            </div>
          </div>
        </section>

        <div className="flex justify-end pt-4">
          <div className="h-9 w-28 animate-pulse rounded-md bg-surface-code/10" />
        </div>
      </div>
    </main>
  );
}
