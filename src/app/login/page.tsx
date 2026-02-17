"use client";

import { supabase } from "@/lib/supabaseClient";

export default function Login() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <main className="w-full flex justify-center mt-8 px-4">
      <div className="w-full max-w-md flex justify-center">
        <button
          onClick={login}
          className="bg-white text-blue-600 px-5 py-3 rounded shadow flex items-center gap-3 hover:opacity-90 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
            <path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.6 33 30 36 24 36c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.3 0 6.3 1.2 8.6 3.2l6-6C34.6 3.8 29.6 2 24 2 12.3 2 2.7 11.6 2.7 23.3S12.3 44.7 24 44.7c11.7 0 21.3-9.6 21.3-21.3 0-1.4-.1-2.8-.7-4.2z"/>
          </svg>
          <span className="font-medium">Sign in with Google</span>
        </button>
      </div>
    </main>
  );
}
