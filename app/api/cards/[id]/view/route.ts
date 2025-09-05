export const runtime = "edge";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request, { params }: { params: { id: string }}) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // Optional: try to attach user if present
  let user_id: string | null = null;
  try {
    const auth = req.headers.get("authorization") || "";
    if (auth) {
      const sb = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: auth } } }
      );
      const { data: { user } } = await sb.auth.getUser();
      user_id = user?.id ?? null;
    }
  } catch {}

  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0]?.trim() || null;
  const { error } = await supabase
    .from("card_views")
    .insert({ card_id: params.id, viewer_ip: ip, user_id });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ ok: true });
}
