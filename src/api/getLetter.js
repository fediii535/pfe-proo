import supabase from "../supabase/supabaseClient";

export const getLetterData = async (id) => {
  const { data, error } = await supabase
    .from("job_submissions")
    .select("letter")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data?.letter) throw new Error("No letter found.");

  return {
    fileUrl: data.letter, //detching the letter url and placing it into file_url
  };
};
