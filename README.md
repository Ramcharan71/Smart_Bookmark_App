# 🔖 Smart Bookmark App

> A beautiful, real-time bookmark manager with Google authentication — save, organize, and sync your links across all your devices.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Postgres%20%2B%20Auth-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000?logo=vercel)

---

## ✨ Features

- **Google OAuth** — Sign in securely with your Google account (powered by Supabase Auth)
- **Add Bookmarks** — Save any link with a title and URL in one click
- **Private & Secure** — Each user can only see and manage their own bookmarks (Row Level Security)
- **Real-time Sync** — Bookmarks update instantly across all open tabs via Supabase Realtime
- **Delete Bookmarks** — Remove bookmarks with a single click (optimistic UI)
- **Stunning UI** — Dreamy cosmic gradient theme with glassmorphism cards and animated sparkles
- **Fully Responsive** — Works beautifully on desktop, tablet, and mobile
- **Vercel Ready** — One-click deploy to Vercel

---

## 🖼️ Screenshots

| Landing Page | Login Page | Dashboard |
|:---:|:---:|:---:|
| Cosmic gradient hero with feature cards | Glassmorphism sign-in card | Real-time bookmark list |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js 16** (App Router) | React framework with server/client components |
| **React 19** | UI rendering |
| **TypeScript 5** | Type safety |
| **Supabase** | Postgres database, Google OAuth, Realtime subscriptions |
| **@supabase/ssr** | Cookie-based session management for Next.js |
| **Tailwind CSS v4** | Utility-first styling |
| **Vercel** | Hosting & deployment |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page (cosmic theme)
│   ├── layout.tsx                  # Root layout with Geist fonts
│   ├── globals.css                 # Tailwind v4 imports
│   ├── auth/
│   │   ├── login/page.tsx          # Google sign-in page
│   │   └── callback/route.ts      # OAuth code → session exchange
│   └── dashboard/
│       ├── page.tsx                # Server component (fetches user + bookmarks)
│       └── _components/
│           ├── BookmarkList.tsx     # Client component with realtime subscription
│           ├── AddBookmarkForm.tsx  # Add bookmark form
│           └── BookmarkCard.tsx     # Individual bookmark card
├── lib/
│   ├── types.ts                    # Bookmark TypeScript type
│   └── supabase/
│       ├── client.ts               # Browser Supabase client
│       ├── server.ts               # Server Supabase client (cookies)
│       └── middleware.ts           # Session refresh + route protection
├── middleware.ts                    # Next.js edge middleware
supabase-setup.sql                  # Database schema, RLS policies, realtime
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ installed
- A **Supabase** account ([supabase.com](https://supabase.com))
- A **Google Cloud** project with OAuth credentials

### 1. Clone the Repository

```bash
git clone https://github.com/Ramcharan71/Smart_Bookmark_App.git
cd Smart_Bookmark_App
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com/dashboard](https://supabase.com/dashboard)
2. Go to **SQL Editor** and run the contents of `supabase-setup.sql` to create:
   - `bookmarks` table with columns: `id`, `user_id`, `title`, `url`, `created_at`
   - Row Level Security (RLS) policies for select, insert, and delete
   - Realtime publication for the bookmarks table
3. Copy your **Project URL** and **anon (public) key** from **Settings → API**

### 4. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or use an existing one)
3. Navigate to **APIs & Services → Credentials**
4. Create an **OAuth 2.0 Client ID** (Web application)
5. Add authorized redirect URI:
   ```
   https://<your-supabase-ref>.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** and **Client Secret**
7. In Supabase dashboard, go to **Authentication → Providers → Google**
8. Enable Google and paste your Client ID and Client Secret

### 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

> **Note:** The anon key is a long JWT string starting with `eyJ...`

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🗄️ Database Schema

```sql
CREATE TABLE bookmarks (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title      TEXT NOT NULL,
  url        TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Row Level Security
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- Users can only read their own bookmarks
CREATE POLICY "Users read own bookmarks"  ON bookmarks FOR SELECT USING (auth.uid() = user_id);
-- Users can only insert their own bookmarks
CREATE POLICY "Users insert own bookmarks" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
-- Users can only delete their own bookmarks
CREATE POLICY "Users delete own bookmarks" ON bookmarks FOR DELETE USING (auth.uid() = user_id);
```

---

## 🌐 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import your repository
3. Add the environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy**
5. Update your Google OAuth redirect URI to include your Vercel domain:
   ```
   https://your-app.vercel.app/auth/callback
   ```

---

## 🔒 Security

- **Row Level Security (RLS)** ensures users can only access their own data
- **Server-side session validation** protects the `/dashboard` route
- **Cookie-based auth** via `@supabase/ssr` for secure session management
- **No sensitive keys exposed** — only the public anon key is used client-side

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on `localhost:3000` |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using Next.js, Supabase & Tailwind CSS
</p>
