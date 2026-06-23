import { supabase } from "@/lib/supabase";

// export async function uploadImage(filename: string) {
// i thought only the name of the file is needed. turns out that the whole file is needed ofc cause it covers whole data related to the image file.
export async function uploadImage(file: File) {
  if (!(file instanceof File)) return;

  const filename = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("edible-blossoms")
    .upload(filename, file); // name to be stored in bucket, file to be stored

  console.log(data);

  return filename;
}
