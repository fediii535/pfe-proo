import supabase from "../supabase/supabaseClient";

export const approveLeave = async (id) => {
  const { error, data: leavesData } = await supabase
    .from("leaves")
    .update({ status: "Approved" })
    .eq("id", id)
    .select("*");

  if (error) {
    throw new Error(error.message);
  }

  return leavesData;
};
