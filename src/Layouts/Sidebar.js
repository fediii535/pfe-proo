import React, { useEffect, useState } from "react";
import {
  Home,
  ClipboardList,
  UserPlus,
  Users,
  Briefcase,
  CheckCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { useAuthContext } from "../context";
import { createClient } from "@supabase/supabase-js";
import "./Sidebar.css";
import Avatar from "../assets/avatar.svg";

const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Sidebar = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const { user, logout } = useAuthContext();
  const [regCount, setRegCount] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);

    const fetchProfilesCount = async () => {
      const { count, error } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .neq("role", "admin");
      const { count: approvedCount } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true })
        .eq("role", "employee")
        .eq("verified", "approved");
      if (!error && typeof count === "number") {
        setRegCount(typeof approvedCount === "number" ? count - approvedCount : count);
      }
    };
    fetchProfilesCount();
  }, []);

  const baseLinkClass = "sidebar-link flex items-center space-x-3";

  return (
    <aside className={`sidebarleft transition-all duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex justify-between items-center mb-8">
        <p className="sidebar-logo">RHM </p>
        {/* <button 
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button> */}
      </div>

      <div className="flex-1 flex flex-col">
        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="sidebar-navlist">
            <li className={baseLinkClass}>
              <Home size={20} />
              <a href="/" className="text-gray-700 hover:text-indigo-600">Home</a>
            </li>
            <li className={baseLinkClass}>
              <ClipboardList size={20} />
              <a href="/registrations" className="text-gray-700 hover:text-indigo-600">Registrations</a>
            </li>
            <li className={baseLinkClass}>
              <UserPlus size={20} />
              <a href="/leaves" className="text-gray-700 hover:text-indigo-600">Leaves</a>
            </li>
            <li className={baseLinkClass}>
              <Users size={20} />
              <a href="/employee" className="text-gray-700 hover:text-indigo-600">Employee</a>
            </li>
            <li className={baseLinkClass}>
              <Briefcase size={20} />
              <a href="/jobs" className="text-gray-700 hover:text-indigo-600">Jobs</a>
            </li>
            <li className={baseLinkClass}>
              <CheckCircle size={20} />
              <a href="/recordings" className="text-gray-700 hover:text-indigo-600">Recordings</a>
            </li>

            <li className={baseLinkClass}>
            <Settings size={20} className="sidebar-settings-icon" />
              <a href="/settings" className="sidebar-settings-link">Settings</a>
            </li>
          </ul>
        </nav>

       
      </div>

      {/* User info */}
      <div className="sidebar-userinfo">
        <img
          src={Avatar}
          alt="User Avatar"
          className="sidebar-avatar"
        />
        <div className="sidebar-userdetails">
          <div>
            <p className="sidebar-username">{user?.first_name}</p>
            <p className="sidebar-useremail" title={user?.email}>
              {email}
            </p>
          </div>
          <LogOut
            size={20}
            className="sidebar-logout"
            onClick={async () => {
              await logout();
              window.location.href = "/login";
            }}
          />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
