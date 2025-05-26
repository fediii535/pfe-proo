import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/icons/logo.png";
import Home from "../assets/icons/homeLogo.png";
import regisrations from "../assets/icons/registration.png";
import leaves from "../assets/icons/leaves.png";
import employees from "../assets/icons/employees.png";
import jobs from "../assets/icons/jobs.png";
import recordings from "../assets/icons/recordings.png";
import settings from "../assets/icons/settings.png";
import avatar from "../assets/images/girl.jpg";
import { handleLogout } from "../api/logout";
import { useUserRole } from "../api/getUser";
import { Skeleton, Tooltip } from "antd";
import supabase from '../supabase/supabaseClient';
import { GrLogout } from "react-icons/gr";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/getMe";
import Sidebar from "./Sidebar";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const HeaderTitle = location.state?.title;
  const [userInfo, setUserInfo] = useState({ name: "", email: "", avatar: "" });

  const { data: currentUser, isLoading: isMeLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMe,
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    } else {
      const fetchUserInfo = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const email = session?.user.email || "";
        let name =
          session?.user.user_metadata?.full_name ||
          session?.user.user_metadata?.name ||
          "";

        const { data: profile, error: profileErr } = await supabase
          .from("users")
          .select("name,avatar")
          .eq("id", session?.user.id)
          .single();

        if (!profileErr && profile?.name) name = profile.name;
        const avatar = profile?.avatar || "";

        const userData = { email, name, avatar };
        setUserInfo(userData);
        localStorage.setItem("userInfo", JSON.stringify(userData));
      };

      fetchUserInfo();
    }
  }, []);

  const isActive = (path) => location.pathname === path;
  const { role, loading } = useUserRole();

  if (loading) {
    return <Skeleton active />;
  }

  return (
    <div className="flex w-full h-screen">

      <Sidebar/>
      {/* Main Content */}
      <div className="flex flex-col w-full h-screen pt-8 pb-12 gap-8 ml-[243px]">
        {/* Header */}
        <header className="w-full h-[38px] items-center px-8 py-3 fixed mb-[38px] bg-white z-10 shadow-sm flex justify-between">
          <h1 className="text-xl font-semibold text-gray-800">{HeaderTitle}</h1>
        </header>

        {/* Children Content */}
        <main className="pt-[64px] px-8 h-full overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
