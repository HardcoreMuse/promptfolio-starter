// app/api/cards/create/route.ts
export const runtime = "edge";
import { NextResponse } from "next/server";
import { supabaseFromAuthHeader } from "@/app/api/_supabase-edge";

export async function POST(req: Request) {
  const supabase = supabaseFromAuthHeader(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, visibility = "public", model_provider, model_name, model_version, output_text, output_image_url, notes, tags } = await req.json();

  const { data: card, error } = await supabase
    .from("cards")
    .insert({ user_id: user.id, title, content, visibility, model_provider, model_name, model_version, output_text, output_image_url, notes })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  if (Array.isArray(tags) && tags.length) {
    const tagRows = tags.map((n: string) => ({ name: n.trim().toLowerCase() })).filter(t => t.name);
    if (tagRows.length) {
      await supabase.from("tags").upsert(tagRows).select("id,name");
      const { data: all } = await supabase.from("tags").select("id,name").in("name", tagRows.map(t => t.name));
      const pairs = (all ?? []).map(t => ({ card_id: card.id, tag_id: t.id }));
      if (pairs.length) await supabase.from("card_tags").upsert(pairs);
    }
  }

  return NextResponse.json({ card });
}
