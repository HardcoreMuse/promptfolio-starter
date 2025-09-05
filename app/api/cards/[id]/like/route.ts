export const runtime = "edge";
import { NextResponse } from "next/server";
import { supabaseFromAuthHeader } from "../../../_supabase-edge";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const supabase = supabaseFromAuthHeader(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action } = await req.json(); // "like" | "unlike"

  if (action === "like") {
    const { error } = await supabase.from("card_likes")
      .insert({ user_id: user.id, card_id: params.id });
    if (error && !/duplicate key/i.test(error.message)) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  }

  if (action === "unlike") {
    const { error } = await supabase.from("card_likes")
      .delete()
      .eq("user_id", user.id)
      .eq("card_id", params.id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Bad action" }, { status: 400 });
}
