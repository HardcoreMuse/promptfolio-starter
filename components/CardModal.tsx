// components/CardModal.tsx
"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import LikeButton from "@/app/(protected)/card/[id]/like-button";
import { supabase } from "@/lib/supabase-browser";

export default function CardModal({ id, onClose }: { id: string; onClose: () => void }) {
  const [card, setCard] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/cards/${id}/get`).then(r => r.json()).then(d => setCard(d.card));
    supabase.auth.getSession().then(({ data }) => setToken(data.session?.access_token ?? null));
    fetch(`/api/cards/${id}/view`, { method: "POST", headers: token ? { Authorization: `Bearer ${token}` } : {} });
  }, [id, token]);

  if (!card) return <Modal onClose={onClose}><div>Loading…</div></Modal>;

  return (
    <Modal onClose={onClose}>
      <h2 className="text-xl font-semibold mb-2">{card.title}</h2>
      <pre className="whitespace-pre-wrap border rounded p-3 text-sm mb-3">{card.content}</pre>
      <LikeButton cardId={card.id} initialLiked={false} initialCount={card.like_count} />
    </Modal>
  );
}
