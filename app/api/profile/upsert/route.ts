// app/api/profile/upsert/route.ts
export const runtime = "edge";
import { NextResponse } from "next/server";
import { supabaseFromAuthHeader } from "@/app/api/_supabase-edge";

export async function POST(req: Request) {
  const supabase = supabaseFromAuthHeader(req);
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json(); // { username, display_name, avatar_url, bio }
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: user.id, ...body })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ profile: data });
}
