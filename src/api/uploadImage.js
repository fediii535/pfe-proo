import supabase from "../supabase/supabaseClient";

export const uploadimage = async (file) => {
  if (!file) return;

  const { data, error } = await supabase.storage
    .from("images")
    .upload(`assets/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return null;
  }
  return data?.path;
};

export const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from("images").getPublicUrl(filePath);

  if (!data?.publicUrl) throw new Error("something went wrong");

  return data?.publicUrl;
};
