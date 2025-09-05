export const runtime = "edge";
import { NextResponse } from "next/server";
import { supabaseFromAuthHeader } from "../../_supabase-edge";

export async function POST(req: Request) {
  const supabase = supabaseFromAuthHeader(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { title, content, is_public } = await req.json();
  const { data, error } = await supabase
    .from("cards")
    .insert({ user_id: user.id, title, content, is_public: !!is_public })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ card: data });
}
