// app/api/cards/[id]/get/route.ts
export const runtime = "edge";
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
  const { data, error } = await supabase.from("cards").select("*").eq("id", params.id).single();
  if (error || !data) return NextResponse.json({ error: error?.message || "Not found" }, { status: 404 });
  return NextResponse.json({ card: data });
}
