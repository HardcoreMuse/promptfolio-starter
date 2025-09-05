// app/profile/page.tsx
import { supabaseServer } from "@/lib/supabase-server";

export default async function ProfileEditPage() {
  const supabase = await supabaseServer();
  const { data: { session } } = await supabase.auth.getSession();
  const { data: me } = await supabase.from("profiles").select("*").eq("id", session?.user.id).maybeSingle();

  return (
    <form className="mx-auto max-w-lg p-6 space-y-3" action="/api/profile/upsert" method="post" onSubmit={async (e) => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const payload = Object.fromEntries(new FormData(form).entries());
      const token = (await (await import("@/lib/supabase-browser")).supabase.auth.getSession()).data.session?.access_token;
      const res = await fetch("/api/profile/upsert", { method: "POST", headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(payload) });
      if (!res.ok) alert((await res.json()).error || "Failed");
      else alert("Saved");
    }}>
      <h1 className="text-2xl font-semibold">Your Profile</h1>
      <label className="block">
        <div className="text-sm text-gray-600">Username</div>
        <input name="username" defaultValue={me?.username ?? ""} className="w-full border rounded p-2" required />
      </label>
      <label className="block">
        <div className="text-sm text-gray-600">Display name</div>
        <input name="display_name" defaultValue={me?.display_name ?? ""} className="w-full border rounded p-2" />
      </label>
      <label className="block">
        <div className="text-sm text-gray-600">Avatar URL</div>
        <input name="avatar_url" defaultValue={me?.avatar_url ?? ""} className="w-full border rounded p-2" />
      </label>
      <label className="block">
        <div className="text-sm text-gray-600">Bio</div>
        <textarea name="bio" defaultValue={me?.bio ?? ""} className="w-full border rounded p-2 h-28" />
      </label>
      <button className="px-4 py-2 rounded bg-black text-white">Save</button>
    </form>
  );
}
