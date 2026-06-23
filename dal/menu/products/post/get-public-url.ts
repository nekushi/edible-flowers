import { supabase } from "@/lib/supabase";

export async function getPublicUrl(filename: string) {
  const { data } = supabase.storage
    .from("edible-blossoms")
    .getPublicUrl(filename); // filename from bucket

  const publicUrl = data.publicUrl;

  return publicUrl;
}
