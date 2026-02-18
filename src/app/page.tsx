import Link from "next/link";

/**
 * Landing page — dreamy purple-pink-cyan cosmic theme.
 * Matches the reference design exactly.
 */
export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      {/* ── Multi-color gradient background (purple → pink → cyan) ── */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400" />

      {/* ── Layered blobs for the dreamy wavy look ── */}
      <div className="absolute -left-40 top-0 h-150 w-150 rounded-full bg-purple-500/50 blur-[150px]" />
      <div className="absolute -right-20 top-0 h-125 w-125 rounded-full bg-cyan-400/40 blur-[130px]" />
      <div className="absolute left-1/4 top-1/4 h-100 w-150 rounded-full bg-pink-400/40 blur-[120px]" />
      <div className="absolute bottom-0 left-0 h-125 w-175 rounded-full bg-cyan-300/30 blur-[140px]" />
      <div className="absolute -bottom-20 right-0 h-125 w-125 rounded-full bg-violet-400/30 blur-[120px]" />
      <div className="absolute left-1/2 top-1/2 h-100 w-100 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 blur-[100px]" />
      <div className="absolute right-1/4 top-1/3 h-75 w-100 rounded-full bg-pink-300/30 blur-[100px]" />

      {/* ── Sparkle stars ── */}
      <div className="absolute left-[8%] top-[12%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/90" />
      <div className="absolute left-[22%] top-[22%] h-1 w-1 animate-pulse rounded-full bg-white/70 delay-300" />
      <div className="absolute right-[12%] top-[8%] h-2 w-2 animate-pulse rounded-full bg-white/80 delay-500" />
      <div className="absolute right-[28%] top-[18%] h-1 w-1 animate-pulse rounded-full bg-white/60 delay-700" />
      <div className="absolute left-[12%] top-[42%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 delay-200" />
      <div className="absolute right-[18%] top-[38%] h-1 w-1 animate-pulse rounded-full bg-white/80 delay-1000" />
      <div className="absolute left-[38%] top-[8%] h-1 w-1 animate-pulse rounded-full bg-white/60" />
      <div className="absolute right-[8%] top-[50%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 delay-500" />
      <div className="absolute left-[50%] top-[5%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80 delay-100" />
      <div className="absolute left-[70%] top-[30%] h-1 w-1 animate-pulse rounded-full bg-white/60 delay-700" />
      <div className="absolute left-[5%] top-[65%] h-1 w-1 animate-pulse rounded-full bg-white/70 delay-300" />
      <div className="absolute right-[5%] top-[70%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/60 delay-900" />

      {/* ── Content ── */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* ── Navbar ── */}
        <nav className="w-full">
          <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔖</span>
              <span className="text-2xl font-bold text-gray-900">
                Smart Bookmark
              </span>
            </div>
            <Link
              href="/auth/login"
              className="rounded-xl bg-violet-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-violet-700 hover:shadow-xl"
            >
              Sign In &nbsp;&rsaquo;
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <main className="flex flex-1 flex-col items-center justify-center px-6 pb-8 text-center">
          <h1 className="max-w-3xl text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-[3.5rem]">
            Save, organize &amp; access your bookmarks{" "}
            <span className="text-cyan-300">anywhere</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-gray-800/90">
            Smart Bookmark keeps your favorite links in one place with realtime
            sync across all your devices. Private, fast, and beautifully simple.
          </p>
          <Link
            href="/auth/login"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-violet-600 to-purple-600 px-8 py-4 text-base font-bold text-white shadow-xl shadow-violet-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-violet-500/40"
          >
            Get Started — it&apos;s free
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </Link>

          {/* ── Feature cards ── */}
          <div className="mt-16 grid w-full max-w-4xl gap-6 px-4 sm:grid-cols-3">
            {[
              {
                icon: "🛡️",
                title: "Private & Secure",
                desc: "Your bookmarks are yours alone — powered by Row Level Security.",
              },
              {
                icon: "⚡",
                title: "Realtime Sync",
                desc: "Changes appear instantly across all your open tabs and devices.",
              },
              {
                icon: "🚀",
                title: "Lightning Fast",
                desc: "Built on Next.js & Supabase for sub-second performance globally.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-white/50 bg-white/55 px-6 py-8 text-center shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/40 hover:shadow-xl"
              >
                <div className="mx-auto mb-4 text-5xl transition-transform duration-300 group-hover:scale-110">
                  {f.icon}
                </div>
                <h3 className="text-lg font-bold text-gray-900">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </main>

        {/* ── Footer ── */}
        <footer className="py-8 text-center text-sm text-gray-700/60">
          © {new Date().getFullYear()} Smart Bookmark. Built with Next.js &amp;
          Supabase.
        </footer>
      </div>
    </div>
  );
}
