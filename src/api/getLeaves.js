import { message } from "antd";
import supabase from "../supabase/supabaseClient";
//get all leaves
export const getAllLeaves = async () => {
  const { data, error } = await supabase
    .from("leaves")
    .select("*, user:users(name, avatar, specialty)")
    .order("created_at", { ascending: false });
  if (error) {
    message.error(error.message);
    return [];
  }
  // Flatten the user data into the leave object
  return data.map((leave) => ({
    ...leave,
    name: leave.users?.name,
    specialty: leave.users?.specialty,
    avatar: leave.users?.avatar,
  }));
};
//getting the total of leaves in each type
export const fetchLeaveCounts = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("leaves")
    .select("type")
    .eq("employee_id", user?.id); // getting leaves of the current user

  if (error) throw new Error(error.message);

  const defaultCounts = {
    Vacation: 0,
    Sick: 0,
    Personal: 0,
    Casual: 0,
  };
  data.forEach((leave) => {
    const type = leave.type;
    if (type && Object.keys(defaultCounts).includes(type)) {
      defaultCounts[type] += 1;
    }
  });
  return defaultCounts;
};
//get leaves of current user
export const fetchUserLeaves = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) throw new Error("Not logged in");

  const { data, error } = await supabase
    .from("leaves")
    .select("*")
    .eq("employee_id", user.id);

  if (error) throw error;
  return data;
};
//get leaves by status
export const getLeavesByStatus = async (status) => {
  const { data, error } = await supabase
    .from("leaves")
    .select("*, user:users(name, avatar, specialty)")
    .eq("status", status)
    .order("created_at", { ascending: false });
  if (error) message.error(error.message);
  return data;
};
// getting the total amount of leaves
export const fetchTotalLeaves = async () => {
  const { data, error } = await supabase
    .from("leaves")
    .select("*", { count: "exact", head: true });

  if (error) {
    console.error("Error fetching total leaves:", error);
  }
  return data?.length ?? 0;
};
