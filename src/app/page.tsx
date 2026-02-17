import Link from "next/link";

/**
 * Landing / marketing page (server component).
 * Visible to unauthenticated users at "/".
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <span className="text-xl font-bold text-indigo-600">🔖 Smart Bookmark</span>
          <Link
            href="/auth/login"
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Sign In
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-2xl text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
          Save, organize &amp; access your bookmarks{" "}
          <span className="text-indigo-600">anywhere</span>.
        </h1>
        <p className="mt-4 max-w-lg text-lg text-gray-500">
          Smart Bookmark keeps your favorite links in one place with realtime
          sync across all your devices. Private, fast, and beautifully simple.
        </p>
        <Link
          href="/auth/login"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-lg transition-all hover:bg-indigo-700 hover:shadow-xl"
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

        {/* Feature highlights */}
        <div className="mt-16 grid max-w-3xl gap-8 sm:grid-cols-3">
          {[
            {
              icon: "🔒",
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
              className="rounded-xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="mb-3 text-3xl">{f.icon}</div>
              <h3 className="font-semibold text-gray-900">{f.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* ── Footer ── */}
      <footer className="py-6 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} Smart Bookmark. Built with Next.js &amp; Supabase.
      </footer>
    </div>
  );
}
