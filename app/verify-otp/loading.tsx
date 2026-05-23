export default function VerifyOtpLoading() {
  return (
    <main className="min-h-screen bg-cream-light px-4 py-8 text-ink sm:px-6 sm:py-12">
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-md items-center">
        <div className="w-full rounded-lg border border-beige-deep bg-cream p-6 sm:p-8">
          <div>
            <div className="h-3 w-14 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-2 h-6 w-40 animate-pulse rounded bg-surface-code/10" />
            <div className="mt-2 h-4 w-72 animate-pulse rounded bg-surface-code/10" />
          </div>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <div className="h-4 w-28 animate-pulse rounded bg-surface-code/10" />
              <div className="h-12 w-full animate-pulse rounded-md bg-surface-code/10" />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="h-10 flex-1 animate-pulse rounded-md bg-surface-code/10" />
              <div className="h-10 w-28 animate-pulse rounded-md bg-surface-code/10" />
            </div>
          </div>

          <div className="mt-6 h-4 w-56 animate-pulse rounded bg-surface-code/10" />
        </div>
      </div>
    </main>
  );
}
