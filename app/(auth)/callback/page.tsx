// app/auth/callback/page.tsx
"use client";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function AuthCallbackPage() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/card";

  useEffect(() => {
    (async () => {
      const { error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error(error);
        alert(error.message);
        router.replace("/login");
        return;
      }
      router.replace(next); // <- now obeys ?next=
    })();
  }, [router, next]);

  return <div className="p-6">Signing you in…</div>;
}
