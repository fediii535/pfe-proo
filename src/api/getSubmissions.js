import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const GetSubmissionsById = async (jobId: string) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select(
      `
      *,
      job:jobId (
        id,
        title,
        department
      )
    `
    )
    .eq("jobId", jobId)
    .order("created_at", { ascending: false });
  if (error) message.error(error.message);
  return data;
};
//get submisiion by status
export const getSubmissionsByStatus = async (status: string) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select("*")
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (error) message.error(error.message);
  return data;
};
//get all submissions
export const getAllSubmissions = async () => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) message.error(error.message);
  return data;
};
//getting submissions of a certain user (by user)
export const getSubmissionsByUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return []; //return an empty array if not logged in
  }
  const { data, error } = await supabase
    .from("job_submissions")
    .select("*")
    .eq("email", user.email)
    .order("created_at", { ascending: false });
  if (error) {
    console.error(error);
    throw new Error("Failed to fetch submissions");
  }

  return data || [];
};

export const getSubmissionDetailsById = async (id: string) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select("*")
    .eq("id", id)
    .single(); //so that it returns one object and not an array

  if (error) message.error(error.message);
  return data ;
};
