export const runtime = "edge";
import { NextResponse } from "next/server";
import { supabaseFromAuthHeader } from "../../_supabase-edge";

export async function GET(req: Request) {
  const supabase = supabaseFromAuthHeader(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data, error } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ cards: data });
}
