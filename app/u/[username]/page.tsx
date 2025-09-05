import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export default async function UserPublicPage({ params }: { params: { username: string }}) {
  const supabase = await supabaseServer();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, username")
    .eq("username", params.username)
    .single();

  if (!profile) notFound();

  const { data: cards } = await supabase
    .from("cards")
    .select("id, title, content, created_at")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold mb-4">@{profile.username}</h1>
      <ul className="space-y-3">
        {(cards ?? []).map(c => (
          <li key={c.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <Link href={`/card/${c.id}`} className="font-semibold">{c.title}</Link>
              <span className="text-xs text-gray-500">{new Date(c.created_at).toLocaleDateString()}</span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{c.content}</p>
          </li>
        ))}
        {(!cards || cards.length === 0) && <p className="text-sm text-gray-600">No public cards yet.</p>}
      </ul>
    </div>
  );
}
