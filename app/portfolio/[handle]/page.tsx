type Props = { params: { handle: string } }

export default function Portfolio({ params }: Props) {
  const { handle } = params
  return (
    <div className="space-y-6">
      <h1 className="h1">@{handle}</h1>
      <p className="text-slate-600">Public portfolio page (SSR). Replace with data from Supabase.</p>
    </div>
  )
}
