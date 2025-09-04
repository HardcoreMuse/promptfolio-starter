'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}` }
    });
    if (!error) setSent(true); else alert(error.message);
  }

  if (sent) return <p>Check your email for a magic link.</p>;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm p-6 space-y-3">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <input
        type="email" value={email} onChange={e=>setEmail(e.target.value)}
        placeholder="you@example.com" required
        className="w-full border rounded px-3 py-2"
      />
      <button className="w-full rounded bg-black text-white py-2">Send magic link</button>
    </form>
  );
}
