'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      if (session) setOk(true);
      else window.location.replace('/login');
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_, session) => {
      if (!mounted) return;
      if (session) setOk(true);
      else window.location.replace('/login');
    });
    return () => { mounted = false; sub.subscription.unsubscribe(); };
  }, []);

  if (!ok) return null; // or a spinner
  return <>{children}</>;
}
