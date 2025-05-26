import { RcFile } from "antd/es/upload";
import supabase from "../supabase/supabaseClient";

export const uploadLetter = async (file?: RcFile) => {
  if (!file) return;
  const { data, error } = await supabase.storage
    .from("files")
    .upload(`letters/${file.name}`, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    return null;
  }
  return data?.path;
};
