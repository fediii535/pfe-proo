import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const deleteLeave = async (id: string) => {
  const { error } = await supabase
    .from("leaves")
    .update({ status: "Rejected" })
    .eq("id", id);

  if (error) message.error(error.message);
};
