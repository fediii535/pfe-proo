import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const addJob = async (newJob) => {
  const { data, error } = await supabase.from("Jobs").insert([newJob]);

  if (error) message.error(error.message);
  return data;
};
