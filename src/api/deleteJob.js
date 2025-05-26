import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const deleteJob = async (id: string) => {
  const { error } = await supabase.from("Jobs").delete().eq("id", id);

  if (error) message.error(error.message);
};
