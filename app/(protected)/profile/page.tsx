'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

type Profile = {
  id: string;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);
  const [uid, setUid] = useState<string | null>(null);
  const [p, setP] = useState<Profile | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const user = session?.user;
      setSessionEmail(user?.email ?? null);
      setUid(user?.id ?? null);

      if (!user) { setLoading(false); return; }

      // fetch or initialize profile
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // not-found code varies; treat as empty
        setMsg(error.message);
      }

      const initial: Profile = data ?? {
        id: user.id, username: null, display_name: null, avatar_url: null, bio: null
      };
      setP(initial);
      setLoading(false);
    })();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!uid || !p) return;
    setMsg(null);

    const { error } = await supabase
      .from('profiles')
      .upsert(
        { id: uid, username: p.username, display_name: p.display_name, avatar_url: p.avatar_url, bio: p.bio },
        { onConflict: 'id' }
      );

    setMsg(error ? `Error: ${error.message}` : 'Saved.');
    if (!error && p.username) window.location.href = `/u/${p.username}`;
  }


  if (loading) return <main className="p-6">Loading…</main>;
  if (!uid) return (
    <main className="p-6">
      <p className="mb-3">You’re not signed in.</p>
      <a className="underline" href="/auth/signin">Go to Sign in</a>
    </main>
  );

  return (
    <main className="p-6 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <p className="text-sm text-gray-500">Signed in as {sessionEmail}</p>

      <form onSubmit={save} className="space-y-3">
        <label className="block">
          <span className="text-sm">Username</span>
          <input className="w-full border rounded px-3 py-2"
            value={p?.username ?? ''} onChange={e=>setP(v=>v ? {...v, username:e.target.value} : v)} />
        </label>

        <label className="block">
          <span className="text-sm">Display name</span>
          <input className="w-full border rounded px-3 py-2"
            value={p?.display_name ?? ''} onChange={e=>setP(v=>v ? {...v, display_name:e.target.value} : v)} />
        </label>

        <label className="block">
          <span className="text-sm">Avatar URL</span>
          <input className="w-full border rounded px-3 py-2"
            value={p?.avatar_url ?? ''} onChange={e=>setP(v=>v ? {...v, avatar_url:e.target.value} : v)} />
        </label>

        <label className="block">
          <span className="text-sm">Bio</span>
          <textarea className="w-full border rounded px-3 py-2" rows={4}
            value={p?.bio ?? ''} onChange={e=>setP(v=>v ? {...v, bio:e.target.value} : v)} />
        </label>

        <button className="rounded bg-black text-white px-4 py-2">Save</button>
        {msg && <p className="text-sm">{msg}</p>}
      </form>
    </main>
  );
}
