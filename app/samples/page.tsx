import Link from 'next/link'

const samples = [
  { title: 'Cold Email — V3', handle: 'demo', id: 'card-001' },
  { title: 'Lesson Plan — Socratic', handle: 'demo', id: 'card-002' },
  { title: 'UX Microcopy — Tone Guide', handle: 'demo', id: 'card-003' },
]

export default function Samples() {
  return (
    <div className="space-y-6">
      <h1 className="h1">Sample Portfolio</h1>
      <ul className="grid gap-3">
        {samples.map(s => (
          <li key={s.id} className="card flex items-center justify-between">
            <div>
              <div className="font-medium">{s.title}</div>
              <div className="text-sm text-slate-500">by @{s.handle}</div>
            </div>
            <Link href={`/card/${s.id}`} className="link">Open</Link>
          </li>
        ))}
      </ul>
      <p className="text-slate-600">These are static placeholders — wire to Supabase later.</p>
    </div>
  )
}
