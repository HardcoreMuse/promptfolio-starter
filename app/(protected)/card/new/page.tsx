"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function NewCardPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setToken(data.session?.access_token ?? null);
    });
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving...");
    const res = await fetch("/api/cards/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ title, content, is_public: isPublic }),
    });
    const data = await res.json();
    if (!res.ok) return setStatus(data.error || "Failed");
    setStatus("Saved!");
    window.location.href = `/card`;
  }

  return (
    <div className="mx-auto max-w-xl p-6">
      <h1 className="text-2xl font-bold mb-4">New Prompt Card</h1>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full border rounded p-2 h-40"
          placeholder="Content (your prompt)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPublic} onChange={(e) => setIsPublic(e.target.checked)} />
          <span>Public</span>
        </label>
        <button className="px-4 py-2 rounded bg-black text-white" type="submit">Create</button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </div>
  );
}
