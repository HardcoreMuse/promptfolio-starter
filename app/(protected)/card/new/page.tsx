// app/(protected)/card/new/page.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function NewCardPage() {
  const [form, setForm] = useState<any>({ title: "", content: "", visibility: "public", model_provider: "", model_name: "", model_version: "", output_text: "", output_image_url: "", notes: "", tags: "" });
  const [token, setToken] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  useEffect(() => { supabase.auth.getSession().then(({ data }) => setToken(data.session?.access_token ?? null)); }, []);
  const upd = (k: string) => (e: any) => setForm((s: any) => ({ ...s, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Saving…");
    const payload = { ...form, tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [] };
    const res = await fetch("/api/cards/create", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) });
    const data = await res.json();
    if (!res.ok) return setStatus(data.error || "Failed");
    window.location.href = "/card";
  }

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">New Prompt Card</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <input className="border rounded p-2" placeholder="Title" value={form.title} onChange={upd("title")} required />
        <textarea className="border rounded p-2 h-32" placeholder="Prompt text" value={form.content} onChange={upd("content")} required />
        <select className="border rounded p-2" value={form.visibility} onChange={upd("visibility")}>
          <option value="public">Public</option>
          <option value="unlisted">Unlisted</option>
          <option value="private">Private</option>
        </select>
        <div className="grid grid-cols-3 gap-3">
          <input className="border rounded p-2" placeholder="Model provider (e.g. OpenAI)" value={form.model_provider} onChange={upd("model_provider")} />
          <input className="border rounded p-2" placeholder="Model name (e.g. GPT-4o)" value={form.model_name} onChange={upd("model_name")} />
          <input className="border rounded p-2" placeholder="Version" value={form.model_version} onChange={upd("model_version")} />
        </div>
        <textarea className="border rounded p-2 h-24" placeholder="Output text (optional)" value={form.output_text} onChange={upd("output_text")} />
        <input className="border rounded p-2" placeholder="Output image URL (optional)" value={form.output_image_url} onChange={upd("output_image_url")} />
        <textarea className="border rounded p-2 h-20" placeholder="Notes (optional)" value={form.notes} onChange={upd("notes")} />
        <input className="border rounded p-2" placeholder="Tags (comma separated)" value={form.tags} onChange={upd("tags")} />
        <button className="px-4 py-2 rounded bg-black text-white">Create</button>
        {status && <p className="text-sm text-gray-600">{status}</p>}
      </form>
    </div>
  );
}
