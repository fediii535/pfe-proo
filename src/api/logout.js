import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const handleLogout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    message.error("Failed to log out: " + error.message);
    return;
  }

  // clean up the local storae
  localStorage.removeItem("userInfo");
  message.success("Logged out successfully");

  // redirect to login page
  window.location.href = "/login";
};
