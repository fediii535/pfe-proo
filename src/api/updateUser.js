import { message } from "antd";
import supabase from "../supabase/supabaseClient";
import dayjs from "dayjs";

export const updateUser = async (updatedUser) => {
  const { id, ...formValues } = updatedUser;

  //fetch original data for comparison
  const { data: job, error: fetchError } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !job) {
    message.error("Failed to fetch current job data.");
    return { data: null, error: fetchError };
  }
  // only take non empty fields and changed data
  const updatedData = {};
  for (const key in formValues) {
    const value = formValues[key];
    const isEmpty = value === "" || value === null || value === undefined;
    const isChanged = value !== job[key];
    if (isChanged && !isEmpty) {
      updatedData[key] =
        key === "hiring_date" ? dayjs(value).format("YYYY-MM-DD") : value;
    }
  }
  // cancel if no changes to be submitted
  if (Object.keys(updatedData).length === 0) {
    message.error("No changes to update.");
    return;
  } else {
    //send the updated data
    const { data, error } = await supabase
      .from("users")
      .update(updatedData)
      .eq("id", id)
      .select();

    if (error) {
      message.error(error.message);
      return { data: null, error };
    }
    message.success("User updated successfully!");
    return data;
  }
};

// export const updatePhoto = async (file?: RcFile) => {
//   if (!file) return;

//   const { data, error } = await supabase.storage
//     .from("users")
//     .upload(`avatars/${file.name}`, file, {
//       cacheControl: "3600",
//       upsert: true,
//     });

//   if (error) {
//     return null;
//   }
//   return data?.path;
// };

export const updatePhoto = async (file) => {
  if (!file) return null;

  const sanitizedName = file.name.replace(/\s+/g, "_").replace(/[^\w.-]/g, "");

  const filePath = `avatars/${Date.now()}_${sanitizedName}`;

  const { error } = await supabase.storage
    .from("users")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  if (error) {
    console.error("Upload error:", error.message);
    return null;
  }

  return filePath;
};

export const getPublicUrl = (filePath) => {
  const { data } = supabase.storage.from("users").getPublicUrl(filePath);
  console.log("data:", data);

  if (!data?.publicUrl) throw new Error("something went wrong");

  return data?.publicUrl;
};
