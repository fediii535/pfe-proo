import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const deleteUser = async (id: string) => {
  const { error } = await supabase.from("users").delete().eq("id", id);

  if (error) message.error(error.message);
};
