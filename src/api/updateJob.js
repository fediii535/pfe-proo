import { message } from "antd";
import supabase from "../supabase/supabaseClient";
import dayjs from "dayjs";

export const updateJob = async (updatedJob) => {
  const { id, ...formValues } = updatedJob;
  //fetch original data for comparison
  const { data: job, error: fetchError } = await supabase
    .from("Jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !job) {
    message.error("Failed to fetch current job data.");
    throw new Error(fetchError?.message || "Job not found.");
  }

  // only take non empty fields and changed data
  const updatedData = {};
  for (const key in formValues) {
    const value = formValues[key];
    const isEmpty = value === "" || value === null || value === undefined;
    const isChanged = value !== job[key];

    if (isChanged && !isEmpty) {
      updatedData[key] =
        key === "deadline" ? dayjs(value).format("YYYY-MM-DD") : value; //to make sure if the field is deadline its value to be formatted first
    }
  }
  console.log("Updating with:", updatedData);

  // cancel if no changes to be submitted
  if (Object.keys(updatedData).length === 0) {
    message.error("No changes to update.");
    return;
  } else {
    //send the updated data
    const { data, error } = await supabase
      .from("Jobs")
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
