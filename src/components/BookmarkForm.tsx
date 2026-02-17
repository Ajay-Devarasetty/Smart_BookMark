"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function BookmarkForm({ user, onAdded }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    await supabase.from("bookmarks").insert({
      title,
      url,
      user_id: user.id,
    });

    setTitle("");
    setUrl("");
    onAdded?.();
  };

  return (
    <div className="mb-4 flex flex-col sm:flex-row items-center gap-3 justify-center">
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/2"
      />

      <input
        placeholder="URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="border p-2 rounded w-full sm:w-1/2"
      />

      <button
        onClick={addBookmark}
        className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded shadow cursor-pointer"
      >
        Add
      </button>
    </div>
  );
}
