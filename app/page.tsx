import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-6">
      <h1 className="h1">Promptfolio — Starter</h1>
      <p className="text-slate-600">
        Library-first prompt portfolio on a near-zero-cost stack. This scaffold is ready for Cloudflare Pages + Supabase.
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="h2">Sample Portfolio</h2>
          <p className="text-slate-600">A read-only example you can clone later.</p>
          <Link className="btn mt-3" href="/samples">View samples</Link>
        </div>
        <div className="card">
          <h2 className="h2">Getting Started</h2>
          <p className="text-slate-600">Set environment keys and deploy to Cloudflare Pages.</p>
          <a className="btn mt-3" href="https://github.com/" target="_blank">Open README</a>
        </div>
      </div>
    </div>
  )
}
