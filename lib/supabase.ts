import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!url || !publishableKey) {
  throw new Error(
    "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
  );
}

export const supabase = createClient(url, publishableKey, {
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
