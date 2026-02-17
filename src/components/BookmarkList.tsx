"use client";

import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { supabase } from "@/lib/supabaseClient";

const BookmarkList = forwardRef(({ user }: any, ref) => {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    if (!user) return;

    // initial load for this user
    fetchBookmarks();

    // subscribe to realtime changes for this user's bookmarks
    const channel = supabase
      .channel(`bookmarks:user=${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setBookmarks((prev) => [payload.new, ...prev]);
        }
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setBookmarks((prev) => prev.map((b) => (b.id === payload.new.id ? payload.new : b)));
        }
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "bookmarks", filter: `user_id=eq.${user.id}` },
        (payload) => {
          setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  useImperativeHandle(ref, () => ({
    fetchBookmarks,
  }));

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
    await fetchBookmarks();
  };

  return (
    <div className="w-full">
      <ul className="flex flex-col items-center">
        {bookmarks.map((b) => (
          <li key={b.id} className="w-full max-w-2xl flex items-center justify-between gap-4 mb-3 bg-white p-3 rounded shadow">
            <a href={b.url} target="_blank" className="text-blue-600 truncate">
              {b.title}
            </a>

            <button
              onClick={() => deleteBookmark(b.id)}
              className="text-red-600 text-sm cursor-pointer"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default BookmarkList;
