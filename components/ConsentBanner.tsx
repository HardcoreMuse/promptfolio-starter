'use client'
import { useEffect, useState } from 'react'

export default function ConsentBanner() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const c = localStorage.getItem('pf-consent')
    if (!c) setVisible(true)
  }, [])
  if (!visible) return null
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-white/95 backdrop-blur">
      <div className="container py-3 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-600">
          We use minimal analytics to improve Promptfolio. You can opt out anytime.
        </p>
        <div className="flex gap-2">
          <button className="btn" onClick={() => { localStorage.setItem('pf-consent', 'yes'); location.reload(); }}>
            Accept
          </button>
          <button className="btn bg-slate-200 text-slate-900 hover:bg-slate-300"
            onClick={() => { localStorage.setItem('pf-consent', 'no'); location.reload(); }}>
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
