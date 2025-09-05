// app/portfolio/[handle]/page.tsx
import { redirect } from 'next/navigation';

export default async function Portfolio({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  redirect(`/u/${handle}`);
}
