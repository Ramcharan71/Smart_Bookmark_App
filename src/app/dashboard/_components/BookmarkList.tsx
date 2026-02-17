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
    <div className="min-h-screen bg-gray-50">
      {/* ── Header bar ── */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-6">
          <span className="text-lg font-bold text-indigo-600">🔖 Smart Bookmark</span>
          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-gray-500 sm:inline">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
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
          <div className="mt-12 text-center">
            <p className="text-5xl">📑</p>
            <p className="mt-4 text-lg font-medium text-gray-600">
              No bookmarks yet
            </p>
            <p className="mt-1 text-sm text-gray-400">
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
  );
}
