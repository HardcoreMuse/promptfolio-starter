// app/card/CardListClient.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import CardModal from "@/components/CardModal";

export default function CardListClient({ cards }: { cards: any[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Cards</h1>
        <Link href="/card/new" className="px-3 py-2 rounded bg-black text-white">New</Link>
      </div>
      <ul className="space-y-3">
        {cards.map(c => (
          <li key={c.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <button className="font-semibold underline" onClick={() => setOpenId(c.id)}>{c.title}</button>
              <span className="text-xs text-gray-500">{c.is_public ? "Public" : "Private"}</span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{c.content}</p>
          </li>
        ))}
      </ul>
      {openId && <CardModal id={openId} onClose={() => setOpenId(null)} />}
    </div>
  );
}
