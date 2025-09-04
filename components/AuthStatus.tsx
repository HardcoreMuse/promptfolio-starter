'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase-browser';

export default function AuthStatus() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setUserEmail(session?.user?.email ?? null);
    };

    getSession();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  return (
    <div className="fixed bottom-4 right-4 text-sm bg-white shadow px-4 py-2 rounded border">
      {userEmail ? (
        <>
          <p>Signed in as <strong>{userEmail}</strong></p>
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
