import supabase from "../supabase/supabaseClient";

export const approveSubmission = async (submissionId) => {
  //update status in job_submissions (using submissionId)
  const { error, data: SubmissionData } = await supabase
    .from("job_submissions")
    .update({ status: "Approved" })
    .eq("id", submissionId)
    .select("email"); //getting the email of the user with approved submission

  if (error) {
    throw new Error(error.message);
  }
  const userEmail = SubmissionData?.[0]?.email;
  if (!userEmail) {
    throw new Error("Email not found ");
  }
  const { error: userError } = await supabase
    .from("users")
    .update({ role: "employee" })
    .eq("email", userEmail);
  if (userError) {
    throw new Error(userError.message);
  }
};
export const updateUserInfo = async (email: string, data) => {
  const { error } = await supabase
    .from("users")
    .update({
      hiring_date: data.hiring_date,
      department: data.department,
      rate_per_month: data.rate_per_month,
    })
    .eq("email", email);

  if (error) throw error;
};
