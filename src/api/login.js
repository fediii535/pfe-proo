import { message } from "antd";
import supabase from "../supabase/supabaseClient";

export const handleLogin = async (email, password) => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  message.success("You're Logged in successfully!");
};

export const handleSignup = async (email, password, name) => {
  console.log("Signing up with:", email, password, name);

  const { data: session, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: name,
      },
    },
  });

  if (error) message.error(error.message);
  else {
    message.success("✅ Sign up done successfully !");
    const token = session;
    console.log(token);
  }

  const { data: userData } = await supabase.auth.getUser();
  const user = userData.user;
  console.log(user?.user_metadata?.display_name);
};

export const handleGoogleAuth = async () => {
  const { data: session, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) message.error(error.message);
  else {
    message.success("✅ Sign up done successfully !");
    const token = session;
    console.log(token);
  }
};
