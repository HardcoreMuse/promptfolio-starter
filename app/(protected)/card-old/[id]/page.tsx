// app/(protected)/card/[id]/page.ts
import { supabaseServer } from '@/lib/supabase-server';

type RouteParams = { id: string };

export default async function CardPage({
  params,
}: {
  params: Promise<RouteParams>;
}) {
  const { id } = await params; // 👈 important: await the params

  const { data: card, error } = await supabaseServer
    .from('prompt_cards')
    .select('id, title, prompt_text, model_hint, visibility, created_at')
    .eq('id', id)
    .maybeSingle();

  if (error) {
    return <main className="p-6">Error: {error.message}</main>;
  }
  if (!card) {
    return <main className="p-6">Card not found.</main>;
  }

  return (
    <main className="p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">{card.title}</h1>
      {card.model_hint && (
        <p className="text-sm text-gray-500">Model: {card.model_hint}</p>
      )}
      <pre className="whitespace-pre-wrap rounded border p-3">
        {card.prompt_text}
      </pre>
    </main>
  );
}
