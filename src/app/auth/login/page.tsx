"use client";

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

/** Inner component that reads searchParams (needs Suspense boundary). */
function LoginInner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* ── Gradient background (same as landing page) ── */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400" />

      {/* ── Blobs ── */}
      <div className="absolute -left-32 top-0 h-125 w-125 rounded-full bg-purple-500/50 blur-[150px]" />
      <div className="absolute -right-20 top-0 h-100 w-100 rounded-full bg-cyan-400/40 blur-[130px]" />
      <div className="absolute bottom-0 left-1/3 h-100 w-125 rounded-full bg-pink-400/30 blur-[120px]" />
      <div className="absolute -bottom-20 right-0 h-100 w-100 rounded-full bg-violet-400/30 blur-[120px]" />

      {/* ── Sparkles ── */}
      <div className="absolute left-[10%] top-[15%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
      <div className="absolute right-[15%] top-[10%] h-2 w-2 animate-pulse rounded-full bg-white/70 delay-500" />
      <div className="absolute left-[20%] top-[60%] h-1 w-1 animate-pulse rounded-full bg-white/60 delay-300" />
      <div className="absolute right-[25%] top-[70%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 delay-700" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Glass card */}
        <div className="rounded-3xl border border-white/30 bg-white/20 p-10 shadow-2xl backdrop-blur-xl">
          {/* Logo */}
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-violet-500 to-purple-600 text-3xl shadow-lg shadow-violet-500/25">
              🔖
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Smart Bookmark
            </h1>
            <p className="mt-2 text-base text-gray-800">
              Your links, organized &amp; synced everywhere
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-800 backdrop-blur-sm">
              <span className="mr-2">⚠️</span>
              Authentication failed. Please try again.
            </div>
          )}

          {/* Google sign-in button */}
          <button
            onClick={handleGoogleLogin}
            className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-white/30 bg-white px-5 py-4 text-sm font-semibold text-gray-800 shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-violet-500/10 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:ring-offset-2"
          >
            {/* Google "G" logo SVG */}
            <svg className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-900/10" />
            <span className="text-xs font-semibold text-gray-700">SECURE LOGIN</span>
            <div className="h-px flex-1 bg-gray-900/10" />
          </div>

          {/* Trust badges */}
          <div className="mt-6 flex items-center justify-center gap-6 text-gray-800">
            <div className="flex items-center gap-1.5 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Encrypted
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Private
            </div>
            <div className="flex items-center gap-1.5 text-xs">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              Fast
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-700">
            By signing in you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Login page — wrapped in Suspense for useSearchParams(). */
export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400" />
          <div className="relative z-10 h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </div>
      }
    >
      <LoginInner />
    </Suspense>
  );
}
