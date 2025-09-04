import './globals.css'
import type { Metadata } from 'next'
import { initAnalytics } from '@/lib/analytics'
import ConsentBanner from '@/components/ConsentBanner'

export const metadata: Metadata = {
  title: 'Promptfolio (Starter)',
  description: 'Library-first prompt portfolio — starter scaffold',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  openGraph: { title: 'Promptfolio', description: 'Prompt portfolio starter', type: 'website' },
  twitter: { card: 'summary_large_image', creator: '@promptfolio' }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  if (typeof window !== 'undefined') {
    const c = localStorage.getItem('pf-consent')
    if (c === 'yes') initAnalytics()
  }
  return (
    <html lang="en">
      <body>
        <ConsentBanner />
        <main className="container py-10">{children}</main>
      </body>
    </html>
  )
}
