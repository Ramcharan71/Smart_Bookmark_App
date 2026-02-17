import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Bookmark } from "@/lib/types";
import BookmarkList from "./_components/BookmarkList";

/**
 * Dashboard page (server component).
 * Fetches the authenticated user and their bookmarks, then
 * hands off to the client-side BookmarkList for realtime updates.
 */
export default async function DashboardPage() {
  const supabase = await createClient();

  // Get current user (middleware already protects this route,
  // but we need the user object for queries & props)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  // Fetch initial bookmarks (newest first)
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <BookmarkList
      initialBookmarks={(bookmarks as Bookmark[]) ?? []}
      user={{ id: user.id, email: user.email ?? "" }}
    />
  );
}
