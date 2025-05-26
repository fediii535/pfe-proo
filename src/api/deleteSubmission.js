import supabase from "../supabase/supabaseClient";

export const deleteSubmission = async (submissionId: string) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .update({ status: "Rejected" })
    .eq("id", submissionId);

  if (error) {
    console.error("Error deleting submission:", error);
  }
  return data;
};
