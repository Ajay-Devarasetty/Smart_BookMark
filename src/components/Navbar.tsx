"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener?.subscription?.unsubscribe?.();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className="p-4 bg-blue-600 text-white shadow mb-4">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="flex items-center">
          <h1 className="text-xl font-bold">Smart Bookmark App</h1>
          {user && (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer text-sm ml-4"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
