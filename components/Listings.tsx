import { supabase, type Listing } from "@/lib/supabase";
import ListingsClient from "./ListingsClient";

export const revalidate = 60; // refresh listings server-side every minute

export default async function Listings() {
  const { data, error } = await supabase
    .from("listings")
    .select("id, name, location, price, image_url, alt, tag, display_order")
    .eq("published", true)
    .order("display_order", { ascending: true });

  if (error) {
    console.error("[listings] fetch failed", error);
  }

  const properties = (data ?? []) as Listing[];
  return <ListingsClient properties={properties} />;
}
