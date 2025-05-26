import supabase from "../supabase/supabaseClient";

export const addSubmission = async (newSubmission) => {
  //make sure all fields are filled
  for (const [key, value] of Object.entries(newSubmission)) {
    if (value === null || value === undefined || value === "") {
      throw new Error(`Field "${key}" is required and cannot be empty.`);
    }
  }
  const { data, error } = await supabase
    .from("job_submissions")
    .insert([newSubmission]);

  if (error) throw new Error(error.message);
  console.log(data);
  return data;
};
