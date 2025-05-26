import { message } from "antd";
import supabase from "../supabase/supabaseClient";

//get all jobs
export const getAllJobs = async () => {
  const { data, error } = await supabase
    .from("Jobs")
    .select("id,title,description,deadline,job_image,department");
  if (error) message.error(error.message);
  return data;
};

//get jobs by department
export const GetJobByDepartment = async (department) => {
  const { data, error } = await supabase
    .from("Jobs")
    .select("*")
    .eq("department", department);
  if (error) message.error(error.message);
  return data;
};

//get jobs by id
export const GetJobsById = async (id) => {
  const { data, error } = await supabase
    .from("Jobs")
    .select(
      "id,title,description,deadline,job_image,open_seats,department,skills"
    )
    .eq("id", id)
    .single();

  if (error) message.error(error.message);
  return data;
};
