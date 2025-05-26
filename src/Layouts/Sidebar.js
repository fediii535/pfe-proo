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
} from "lucide-react";
import { useAuthContext } from "../context";
import { createClient } from "@supabase/supabase-js";
import "./Sidebar.css";

const supabaseUrl = 'https://agbpojgpdponyeigrsfs.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFnYnBvamdwZHBvbnllaWdyc2ZzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxODk5NzUsImV4cCI6MjA2MTc2NTk3NX0.oWElgbY0Wk9gyFv9tH13pYCePHHQ1vbiqQNarf_zUko";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const Sidebar = () => {
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
    <div className="sidebarleft">
      {/* Logo */}
      <p className="sidebar-logo">Yuna</p>

      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navigation */}
        <nav className="sidebar-nav">
          <ul className="sidebar-navlist">
            <li className={baseLinkClass}>
              <Home size={20} />
              <a href="/home" style={{ textDecoration: "none" }}>Home</a>
            </li>
            <li className={baseLinkClass}>
              <ClipboardList size={20} />
              <a href="/registrations" style={{ textDecoration: "none" }}>Registrations</a>
            </li>
            <li className={baseLinkClass}>
              <UserPlus size={20} />
              <a href="/leaves" style={{ textDecoration: "none" }}>Leaves</a>
            </li>
            <li className={baseLinkClass}>
              <Users size={20} />
              <a href="/employee" style={{ textDecoration: "none" }}>Employee</a>
            </li>
            <li className={baseLinkClass}>
              <Briefcase size={20} />
              <a href="/jobs" style={{ textDecoration: "none" }}>Jobs</a>
            </li>
            <li className={baseLinkClass}>
              <CheckCircle size={20} />
              <a href="/recordings" style={{ textDecoration: "none" }}>Recordings</a>
            </li>
          </ul>
        </nav>

        {/* Settings */}
        <div className="sidebar-settings">
          <button className="sidebar-settings-btn">
            <Settings size={20} className="sidebar-settings-icon" />
            <a href="/settings" className="sidebar-settings-link" style={{ textDecoration: "none" }}>Settings</a>
          </button>
        </div>
      </div>

      {/* User info */}
      <div className="sidebar-userinfo" style={{ background: "#f8f8ff", padding: 10 }}>
        <img
          src="https://via.placeholder.com/40"
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
    </div>
  );
};

export default Sidebar;
