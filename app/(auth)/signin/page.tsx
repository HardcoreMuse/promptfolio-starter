'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  // If already signed in (or when a session appears), go home.
  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted && session) window.location.replace('/');
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      if (session) window.location.replace('/');
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        // This URL should be your app root so users land on the homepage
        emailRedirectTo: "http://localhost:3000" //"${NEXT_PUBLIC_BASE_URL}", // e.g. http://localhost:3000 or https://yourdomain
      },
    });
    if (!error) setSent(true); else alert(error.message);
  }

  if (sent) return <p className="p-6">Check your email for a magic link.</p>;

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm p-6 space-y-3">
      <h1 className="text-xl font-semibold">Sign in</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        className="w-full border rounded px-3 py-2"
      />
      <button className="w-full rounded bg-black text-white py-2">Send magic link</button>
    </form>
  );
}
