import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import { redirect } from "next/navigation";

export default async function MyCardsPage() {
  const supabase = await supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) redirect("/login");

  const { data: cards, error } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">My Cards</h1>
        <Link href="/card/new" className="px-3 py-2 rounded bg-black text-white">New</Link>
      </div>
      <ul className="space-y-3">
        {(cards ?? []).map(c => (
          <li key={c.id} className="border rounded p-3">
            <div className="flex items-center justify-between">
              <Link href={`/card/${c.id}`} className="font-semibold">{c.title}</Link>
              <span className="text-xs text-gray-500">{c.is_public ? "Public" : "Private"}</span>
            </div>
            <p className="text-sm text-gray-700 line-clamp-2">{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
