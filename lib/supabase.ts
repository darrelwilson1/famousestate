import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!url || !anonKey) {
  throw new Error(
    "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
  );
}

export const supabase = createClient(url, anonKey, {
  auth: { persistSession: false },
});

export type Listing = {
  id: string;
  name: string;
  location: string;
  price: string;
  image_url: string;
  alt: string;
  tag: "Off-Market" | "Private" | "Pre-Listing";
  display_order: number;
};
