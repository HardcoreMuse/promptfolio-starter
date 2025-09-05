// (shared helper for route handlers)
import { createClient } from "@supabase/supabase-js";

export function supabaseFromAuthHeader(req: Request) {
  const auth = req.headers.get("authorization") || "";
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      global: { headers: auth ? { Authorization: auth } : {} },
    }
  );
}
