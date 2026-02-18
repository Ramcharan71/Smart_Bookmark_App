"use client";

import type { Bookmark } from "@/lib/types";

type Props = {
  bookmark: Bookmark;
  onDelete: (id: string) => void;
};

/**
 * Displays a single bookmark card with title, URL, favicon, and delete button.
 */
export default function BookmarkCard({ bookmark, onDelete }: Props) {
  // Extract hostname for display & favicon
  let hostname = "";
  try {
    hostname = new URL(bookmark.url).hostname;
  } catch {
    hostname = bookmark.url;
  }

  // Relative time label (e.g. "2 hours ago")
  const timeAgo = getRelativeTime(bookmark.created_at);

  return (
    <div className="group flex items-center gap-4 rounded-2xl border border-white/30 bg-white/20 px-5 py-4 shadow-md backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/30 hover:shadow-lg">
      {/* Favicon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`https://www.google.com/s2/favicons?domain=${hostname}&sz=32`}
        alt=""
        width={24}
        height={24}
        className="h-6 w-6 shrink-0 rounded"
      />

      {/* Content */}
      <div className="min-w-0 flex-1">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block truncate font-semibold text-gray-900 transition-colors hover:text-violet-700"
        >
          {bookmark.title}
        </a>
        <p className="truncate text-sm text-gray-800">{hostname}</p>
      </div>

      {/* Timestamp */}
      <span className="hidden shrink-0 text-sm font-medium text-gray-800 sm:inline">
        {timeAgo}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(bookmark.id)}
        className="shrink-0 rounded-xl p-1.5 text-gray-800 transition-all hover:bg-red-400/20 hover:text-red-600"
        aria-label="Delete bookmark"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

// ── Helper: human-readable relative time ────────────────────
function getRelativeTime(dateString: string): string {
  const now = Date.now();
  const then = new Date(dateString).getTime();
  const seconds = Math.floor((now - then) / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
