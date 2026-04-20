const qrCells = [
	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1],
	[1, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1],
	[1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1],
	[0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0],
	[1, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1],
	[0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0],
	[1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1],
	[1, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1],
	[0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0],
	[1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 1],
	[1, 1, 1, 1, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1],
	[1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
	[1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
];

export default function DashboardPage() {
	return (
		<main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_8%_10%,#d9f7ff_0%,#f7fbff_32%,#f7fff8_58%,#ffffff_100%)] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
			<div className="pointer-events-none absolute -left-28 -top-16 h-72 w-72 rounded-full bg-cyan-200/45 blur-3xl" />
			<div className="pointer-events-none absolute -bottom-20 -right-24 h-80 w-80 rounded-full bg-lime-200/40 blur-3xl" />

			<section className="relative mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
				<article className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
					<div className="flex items-start justify-between gap-3">
						<div>
							<p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
								Quickr QR Studio
							</p>
							<h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
								Create trackable QR codes in seconds
							</h1>
							<p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">
								Generate clean, branded QR visuals for links, payments, menus,
								and campaigns. Customize style now and connect analytics later.
							</p>
						</div>
						<span className="rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
							Live Preview
						</span>
					</div>

					<div className="mt-8 grid gap-5 sm:grid-cols-2">
						<label className="flex flex-col gap-2 text-sm text-slate-700">
							Destination URL
							<input
								type="url"
								defaultValue="https://quickr.app/launch"
								className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-300 transition focus:ring-2"
							/>
						</label>

						<label className="flex flex-col gap-2 text-sm text-slate-700">
							Campaign Name
							<input
								type="text"
								defaultValue="spring-product-drop"
								className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-300 transition focus:ring-2"
							/>
						</label>

						<label className="flex flex-col gap-2 text-sm text-slate-700">
							Foreground Color
							<div className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3 py-2.5">
								<span className="h-5 w-5 rounded bg-slate-900" />
								<span className="text-sm font-medium text-slate-800">#0f172a</span>
							</div>
						</label>

						<label className="flex flex-col gap-2 text-sm text-slate-700">
							Error Correction
							<select className="rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none ring-blue-300 transition focus:ring-2">
								<option>High (30%)</option>
								<option>Quartile (25%)</option>
								<option>Medium (15%)</option>
								<option>Low (7%)</option>
							</select>
						</label>
					</div>

					<div className="mt-7 flex flex-wrap gap-3">
						<button className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700">
							Generate QR
						</button>
						<button className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
							Download PNG
						</button>
						<button className="rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50">
							Download SVG
						</button>
					</div>
				</article>

				<aside className="rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-[0_25px_70px_-45px_rgba(15,23,42,0.45)] backdrop-blur-sm sm:p-8">
					<p className="text-sm font-semibold text-slate-700">QR Preview</p>

					<div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
						<div className="mx-auto aspect-square max-w-70 rounded-2xl bg-white p-4 shadow-inner">
							<div className="grid h-full w-full grid-cols-16 gap-0.5">
								{qrCells.flat().map((cell, index) => (
									<span
										key={index}
										className={cell ? "rounded-[1px] bg-slate-900" : "rounded-[1px] bg-transparent"}
									/>
								))}
							</div>
						</div>
						<p className="mt-4 text-center text-xs text-slate-500">
							quickr.app/launch
						</p>
					</div>

					<div className="mt-6 grid grid-cols-2 gap-3 text-center">
						<div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
							<p className="text-xs text-slate-500">Scans</p>
							<p className="mt-1 text-lg font-semibold text-slate-900">2,418</p>
						</div>
						<div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
							<p className="text-xs text-slate-500">CTR</p>
							<p className="mt-1 text-lg font-semibold text-slate-900">41.2%</p>
						</div>
					</div>
				</aside>
			</section>
		</main>
	);
}
