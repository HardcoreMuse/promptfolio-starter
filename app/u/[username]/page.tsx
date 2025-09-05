// app/u/[username]/page.tsx
import Image from "next/image";
import { supabaseServer } from "@/lib/supabase-server";

export default async function UserProfilePage({
  params,
}: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  const supabase = await supabaseServer();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .single();

  if (!profile) return <main className="p-6"><h1 className="text-xl">User not found</h1></main>;

  const { data: cards } = await supabase
    .from("cards")
    .select("id,title,created_at,is_public")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <header className="flex items-center gap-4">
        {profile.avatar_url ? (
          <Image src={profile.avatar_url} alt="" width={64} height={64} className="rounded-full" />
        ) : <div className="w-16 h-16 rounded-full bg-gray-200" />}
        <div>
          <h1 className="text-2xl font-semibold">{profile.display_name || profile.username || "User"}</h1>
          {profile.username && <p className="text-gray-500">@{profile.username}</p>}
        </div>
      </header>

      {profile.bio && <p className="text-gray-700 whitespace-pre-wrap">{profile.bio}</p>}

      <section className="space-y-2">
        <h2 className="text-lg font-semibold">Public prompts</h2>
        <ul className="divide-y border rounded">
          {(cards ?? []).length ? cards!.map((c) => (
            <li key={c.id} className="p-3">
              <a className="font-medium underline" href={`/card/${c.id}`}>{c.title}</a>
            </li>
          )) : <li className="p-3 text-gray-500">No public prompts yet.</li>}
        </ul>
      </section>
    </main>
  );
}
