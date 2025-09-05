// app/login/page.tsx
"use client";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

const baseUrl = () =>
  typeof window !== "undefined"
    ? window.location.origin
    : process.env.NEXT_PUBLIC_BASE_URL!;

export default function LoginPage() {
  const search = useSearchParams();
  const redirectedFrom = search.get("redirectedFrom") || "/card";

  async function signInWithMagicLink(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email") as string;
    const redirectTo = `${baseUrl()}/auth/callback?next=${encodeURIComponent(
      redirectedFrom
    )}`;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo },
    });
    if (error) alert(error.message);
    else alert("Check your email for the sign-in link.");
  }

  async function signInWithGoogle() {
    const redirectTo = `${baseUrl()}/auth/callback?next=${encodeURIComponent(
      redirectedFrom
    )}`;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo },
    });
    if (error) alert(error.message);
  }

  return (
    <div className="mx-auto max-w-sm p-6 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={signInWithMagicLink} className="space-y-3">
        <input name="email" type="email" className="w-full border rounded p-2" placeholder="you@example.com" required />
        <button className="w-full px-4 py-2 rounded bg-black text-white">Send Magic Link</button>
      </form>
      <div className="text-center text-xs text-gray-500">or</div>
      <button onClick={signInWithGoogle} className="w-full px-4 py-2 rounded border">
        Continue with Google
      </button>
    </div>
  );
}
