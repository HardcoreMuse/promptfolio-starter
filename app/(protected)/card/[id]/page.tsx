import { supabaseServer } from "@/lib/supabase-server";
import LikeButton from "./like-button";

export default async function CardPage({ params }: { params: { id: string } }) {
  const supabase = await supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();

  const { data: card } = await supabase
    .from("cards")
    .select("*")
    .eq("id", params.id)
    .single();

  if (!card) return <div className="p-6">Card not found.</div>;

  // record view on server-render (anon allowed)
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cards/${params.id}/view`, {
    method: "POST",
    cache: "no-store",
    headers: session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {},
  }).catch(() => {});

  let hasLiked = false;
  if (session) {
    const { data: liked } = await supabase
      .from("card_likes")
      .select("card_id")
      .eq("card_id", params.id)
      .eq("user_id", session.user.id)
      .maybeSingle();
    hasLiked = !!liked;
  }

  return (
    <div className="mx-auto max-w-2xl p-6 space-y-3">
      <h1 className="text-3xl font-bold">{card.title}</h1>
      <pre className="whitespace-pre-wrap rounded border p-3 text-sm">{card.content}</pre>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-600">{new Date(card.created_at).toLocaleString()}</span>
        <span className="text-sm text-gray-600 ml-auto">Likes: {card.like_count}</span>
        <LikeButton cardId={card.id} initialLiked={hasLiked} initialCount={card.like_count} />
      </div>
    </div>
  );
}
