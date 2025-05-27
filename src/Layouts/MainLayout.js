import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUserRole } from "../api/getUser";
import { Skeleton } from "antd";
import supabase from '../supabase/supabaseClient';
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/getMe";
import Sidebar from "./Sidebar";
import { Menu } from "lucide-react";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const HeaderTitle = location.state?.title;
  const [userInfo, setUserInfo] = useState({ name: "", email: "", avatar: "" });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
    <div className="layout-container">
      <Sidebar/>
      <div className="child-container">
        {/* Header */}
        <header className={`h-16 bg-white shadow-sm px-8 flex items-center justify-between fixed top-0 right-0 transition-all duration-300 ${isSidebarOpen ? 'left-[240px]' : 'left-0'} z-10`}>
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button> */}
            <h1 className="text-xl font-semibold text-gray-800">{HeaderTitle}</h1>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 pt-16 px-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
