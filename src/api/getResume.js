import supabase from "../supabase/supabaseClient";
//getting resumes from job_submissions
export const getResumeData = async (id: string) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select("resume")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.resume) throw new Error("No resume found.");

  return {
    fileUrl: data.resume, //detching the resume url and placing it into file_url
  };
};
//getting resumes from users
export const getUserResume = async (id: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("resume")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.resume) throw new Error("No resume found.");
  const { data: publicUrlData } = supabase.storage
    .from("resumes")
    .getPublicUrl(data.resume);
  return {
    fileUrl: publicUrlData?.publicUrl || "", //fetching the resume url and placing it into file_url
  };
};
