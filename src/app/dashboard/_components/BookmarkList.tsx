"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/lib/types";
import AddBookmarkForm from "./AddBookmarkForm";
import BookmarkCard from "./BookmarkCard";
import { useRouter } from "next/navigation";

type Props = {
  initialBookmarks: Bookmark[];
  user: { id: string; email: string };
};

/**
 * Client component that owns bookmark state and subscribes
 * to Supabase Realtime for live INSERT / DELETE events.
 */
export default function BookmarkList({ initialBookmarks, user }: Props) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const router = useRouter();
  const supabase = createClient();

  // ── Realtime subscription ──────────────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("bookmarks-realtime")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const newBookmark = payload.new as Bookmark;
          setBookmarks((prev) => {
            // Avoid duplicates (e.g. optimistic add already in list)
            if (prev.some((b) => b.id === newBookmark.id)) return prev;
            return [newBookmark, ...prev];
          });
        }
      )
      .on(
        "postgres_changes",
        {
          event: "DELETE",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          const deletedId = (payload.old as { id: string }).id;
          setBookmarks((prev) => prev.filter((b) => b.id !== deletedId));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  // ── Delete handler ─────────────────────────────────────────
  const handleDelete = async (id: string) => {
    // Optimistic removal
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
    const { error } = await supabase.from("bookmarks").delete().eq("id", id);
    if (error) {
      // Revert on failure
      const { data } = await supabase
        .from("bookmarks")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setBookmarks(data as Bookmark[]);
    }
  };

  // ── Sign out ───────────────────────────────────────────────
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ── Gradient background (same as landing page) ── */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-500 via-fuchsia-400 to-cyan-400" />

      {/* ── Blobs ── */}
      <div className="absolute -left-40 top-0 h-150 w-150 rounded-full bg-purple-500/50 blur-[150px]" />
      <div className="absolute -right-20 top-0 h-125 w-125 rounded-full bg-cyan-400/40 blur-[130px]" />
      <div className="absolute bottom-0 left-0 h-125 w-175 rounded-full bg-cyan-300/30 blur-[140px]" />
      <div className="absolute -bottom-20 right-0 h-125 w-125 rounded-full bg-violet-400/30 blur-[120px]" />

      {/* ── Sparkles ── */}
      <div className="absolute left-[10%] top-[15%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/80" />
      <div className="absolute right-[15%] top-[10%] h-2 w-2 animate-pulse rounded-full bg-white/70 delay-500" />
      <div className="absolute left-[5%] top-[65%] h-1 w-1 animate-pulse rounded-full bg-white/60 delay-300" />
      <div className="absolute right-[8%] top-[50%] h-1.5 w-1.5 animate-pulse rounded-full bg-white/70 delay-700" />

      {/* ── Content ── */}
      <div className="relative z-10">
        {/* ── Header bar ── */}
        <header className="w-full">
          <div className="flex h-20 items-center justify-between px-8">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🔖</span>
              <span className="text-2xl font-bold text-gray-900">Smart Bookmark</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="hidden text-base font-semibold text-gray-900 sm:inline">
                {user.email}
              </span>
              <button
                onClick={handleSignOut}
                className="rounded-xl border border-white/30 bg-white/20 px-4 py-2 text-sm font-semibold text-gray-900 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/40 hover:shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="mx-auto max-w-3xl px-6 py-8">
          {/* Add bookmark form */}
          <AddBookmarkForm userId={user.id} />

          {/* Bookmark list */}
          {bookmarks.length === 0 ? (
            <div className="mt-16 text-center">
              <p className="text-6xl">📑</p>
              <p className="mt-4 text-lg font-semibold text-gray-900">
                No bookmarks yet
              </p>
              <p className="mt-1 text-base text-gray-800">
                Add your first bookmark above to get started.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {bookmarks.map((bookmark) => (
                <BookmarkCard
                  key={bookmark.id}
                  bookmark={bookmark}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
