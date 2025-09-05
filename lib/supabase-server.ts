import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function supabaseServer() {
  const cookieStore = await cookies(); // Next 15: async

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      // New (non-deprecated) cookie interface
      cookies: {
        // read-only in RSC
        getAll() {
          return cookieStore.getAll();
        },
        // RSC cannot write cookies; keep as no-op
        setAll(_cookies) {
          /* noop */
        },
      },
    }
  );
}
