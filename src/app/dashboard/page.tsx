"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import BookmarkForm from "@/components/BookmarkForm";
import BookmarkList from "@/components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const listRef = useRef<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (!u) router.push("/login");
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, [router]);

  if (!user)
    return (
      <main className="min-h-[60vh] flex items-center justify-center">
        <p className="text-center">Loading...</p>
      </main>
    );

  return (
    <main className="max-w-3xl mx-auto px-4">
      <div className="mt-6">
        <BookmarkForm
          user={user}
          onAdded={() => listRef.current?.fetchBookmarks()}
        />

        <section className="mt-6">
          <BookmarkList ref={listRef} user={user} />
        </section>
      </div>
    </main>
  );
}
