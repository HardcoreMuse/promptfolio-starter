"use client";
import { useEffect, useState, useTransition } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function LikeButton({
  cardId, initialLiked, initialCount
}: { cardId: string; initialLiked: boolean; initialCount: number; }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [token, setToken] = useState<string | null>(null);
  const [isPending, start] = useTransition();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null);
    });
  }, []);

  async function toggle() {
    if (!token) {
      alert("Please sign in to like.");
      return;
    }
    const next = !liked;
    setLiked(next);
    setCount(c => c + (next ? 1 : -1));

    const res = await fetch(`/api/cards/${cardId}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ action: next ? "like" : "unlike" }),
    });

    if (!res.ok) {
      setLiked(!next);
      setCount(c => c + (next ? -1 : 1));
    }
  }

  return (
    <button onClick={() => start(toggle)} className="px-3 py-1 rounded border" disabled={isPending}>
      {liked ? "♥" : "♡"} {count}
    </button>
  );
}
