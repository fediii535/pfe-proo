import { useEffect, useState } from "react";
import supabase from "../supabase/supabaseClient";
import { message } from "antd";

export const useUserRole = () => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem("user-role");
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRole = async () => {
      // Get user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      //stops loading if there is no user and returns.
      if (!user) {
        setLoading(false);
        setRole(null);
        return;
      }
      //gets role from my public 'users' table where id matches the one in auth users
      const { data, error } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (data && !error) {
        setRole(data.role); // role might be 'admin', 'user' (or employee later ...)
        localStorage.setItem("user-role", data.role); // keep it in the storage to prevent UI lag
      }

      setLoading(false); // stops the loading regardless of outcome (regardless of what is the role)
    };

    getRole(); // Call the function once when the component appears
  }, []);

  return { role, loading }; // Return role and loading status
};
//get all users
export const getAllUsers = async () => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("role", "employee");
  if (error) message.error(error.message);
  return data;
};
//get User details by id
export const getUserDetailsById = async (id) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", id)
    .single(); //so that it returns one object and not an array

  if (error) {
    console.error("Error fetching user details:", error.message);
    message.error(error.message);
  }
  console.log(data);
  return data;
};
