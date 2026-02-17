/** A single bookmark owned by a user. */
export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
};
