// app/card/page.tsx (wrap list with a client launcher)
import Link from "next/link";
import { supabaseServer } from "@/lib/supabase-server";
import CardListClient from "./CardListClient";

export default async function MyCardsPage() {
  const supabase = await supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;

  const { data: cards } = await supabase
    .from("cards")
    .select("*")
    .eq("user_id", session.user.id)
    .order("created_at", { ascending: false });

  return <CardListClient cards={cards ?? []} />;
}
