'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function AuthStatus() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      setUserEmail(user?.email ?? null);

      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('username')
          .eq('id', user.id)
          .single();

        if (profile?.username) {
          setUsername(profile.username);
        }
      }
    };

    getSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 text-sm bg-white shadow px-4 py-2 rounded border space-y-1">
      {userEmail ? (
        <>
          <p>Signed in as <strong>{userEmail}</strong></p>

          {username && (
            <p>
              <a href={`/u/${username}`} className="text-blue-600 underline">My profile</a>
            </p>
          )}

          <button onClick={handleSignOut} className="underline text-red-600">
            Sign out
          </button>
        </>
      ) : (
        <p className="text-gray-500">Not signed in</p>
      )}
    </div>
  );
}
