"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Props = {
  userId: string;
};

/**
 * Form to add a new bookmark.
 * The insert is done client-side so the realtime subscription
 * in BookmarkList automatically picks up the new row.
 */
export default function AddBookmarkForm({ userId }: Props) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    const trimmedTitle = title.trim();
    const trimmedUrl = url.trim();

    if (!trimmedTitle || !trimmedUrl) {
      setError("Title and URL are required.");
      return;
    }

    if (!/^https?:\/\/.+/i.test(trimmedUrl)) {
      setError("URL must start with http:// or https://");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: insertError } = await supabase
      .from("bookmarks")
      .insert({ title: trimmedTitle, url: trimmedUrl, user_id: userId });

    setLoading(false);

    if (insertError) {
      setError("Failed to save bookmark. Please try again.");
      return;
    }

    // Clear form — realtime subscription handles adding to list
    setTitle("");
    setUrl("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl bg-white p-6 shadow-sm"
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Add a Bookmark
      </h2>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <input
          type="text"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-2 rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Saving…" : "Add"}
        </button>
      </div>

      {error && (
        <p className="mt-3 text-sm text-red-600">{error}</p>
      )}
    </form>
  );
}
