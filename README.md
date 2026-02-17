# Smart Bookmark

A small Next.js 13 app that lets authenticated users save and manage bookmarks. Key features:

- Google OAuth sign-in via Supabase
- Add / delete bookmarks scoped to the signed-in user
- Real-time updates across browser tabs using Supabase Realtime
- Responsive UI with client-side React components

---

## Tech stack

- Next.js (App Router)
- React (client components for interactive parts)
- Supabase (Auth + Postgres + Realtime)
- Tailwind CSS for styling

---

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Supabase project and set the following environment variables (in `.env.local`):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Enable Realtime (publications) for the `bookmarks` table in your Supabase project so realtime events are delivered.

4. Run the dev server:

```bash
npm run dev
```

Open http://localhost:3000 — the app redirects to `/login` which shows the centered **Sign in with Google** button.

---

## How it works (high level)

- On login the app shows a `Logout` control in the navbar and displays a bookmark form + list for the signed-in user.
- Adding a bookmark inserts a row with `user_id` = current user. The UI updates locally and other tabs receive realtime events to update their lists.
- The `BookmarkList` component subscribes to Supabase realtime events filtered to `user_id` for INSERT/UPDATE/DELETE and applies payloads directly to state.

---

## Problems I ran into & how I fixed them

- New bookmarks didn't show up right away. I fixed this by making the form tell the list to refresh, and later added realtime updates so other browser tabs see new bookmarks instantly.

- I saw errors about React hooks. That happened because some files were running as server components — I marked interactive files with "use client" so hooks work properly.

- The navbar and layout had visibility/alignment issues. I adjusted colors, centered the main content, and moved the sign-in button to the login page so the UI feels cleaner.

- After deploying to Vercel, Google sign-in initially failed (redirect/env settings). I fixed it by adding the app URL to Supabase redirect URLs and setting the Supabase env vars in Vercel.

---

## How to test realtime (quick)

1. Run the app and sign in with Google in two browser tabs.
2. In tab A, add a bookmark. In tab B you should see the new bookmark appear instantly.
