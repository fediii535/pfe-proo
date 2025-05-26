import supabase from "../supabase/supabaseClient";
export const getMe = async () => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw authError;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user?.id)
    .single();

  if (error) throw error;
  return data;
};
