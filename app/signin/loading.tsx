export default function SigninLoading() {
  return (
    <main className="min-h-screen bg-cream-light px-4 pt-20 pb-8 text-ink sm:px-6 sm:pt-24 sm:pb-12 lg:pt-28">
      <div className="mx-auto min-h-[calc(100vh-4rem)] w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="p-6 sm:p-12">
            <div className="rounded-lg bg-surface-code p-8">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-md bg-on-dark/10" />
                <div>
                  <div className="h-3 w-20 animate-pulse rounded bg-on-dark/10" />
                  <div className="mt-2 h-6 w-48 animate-pulse rounded bg-on-dark/10" />
                </div>
              </div>
              <div className="mt-4 h-4 w-72 animate-pulse rounded bg-on-dark/10" />
              <div className="mt-6 space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-1 h-3 w-3 animate-pulse rounded-full bg-on-dark/10" />
                    <div>
                      <div className="h-4 w-28 animate-pulse rounded bg-on-dark/10" />
                      <div className="mt-1 h-3 w-44 animate-pulse rounded bg-on-dark/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-md rounded-lg border border-beige-deep bg-cream p-6 sm:p-8">
              <div className="mb-4">
                <div className="h-3 w-12 animate-pulse rounded bg-surface-code/10" />
                <div className="mt-1 h-5 w-52 animate-pulse rounded bg-surface-code/10" />
              </div>
              <div className="mt-2 space-y-4">
                <div className="space-y-2">
                  <div className="h-4 w-10 animate-pulse rounded bg-surface-code/10" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-16 animate-pulse rounded bg-surface-code/10" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
                </div>
                <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
              </div>
              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-hairline" />
                <div className="h-3 w-24 animate-pulse rounded bg-surface-code/10" />
                <div className="h-px flex-1 bg-hairline" />
              </div>
              <div className="h-10 w-full animate-pulse rounded-md bg-surface-code/10" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
