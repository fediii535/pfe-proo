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
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jgqhkvlhqsxobscfsfkv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpncWhrdmxocXN4b2JzY2ZzZmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyOTA1NjQsImV4cCI6MjA1Nzg2NjU2NH0.TX0xSmGL5tArOgwLq24UlBQit3AYNMxyCGb8B7AvRmw";
const supabase = createClient(supabaseUrl, supabaseAnonKey);


const Sidebar = () => {
  const [email, setEmail] = useState("");
  // const { user, logout } = useAuthContext(); // Remove this line

  // TODO: Replace with real user context
  const user = { first_name: "User", email: email, role: "admin", verified: "approved" };
  const logout = async () => { localStorage.clear(); };

  const [regCount, setRegCount] = useState(0);

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) setEmail(storedEmail);

    // Fetch registrations count (non-admin)
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
        setRegCount(
          typeof approvedCount === "number" ? count - approvedCount : count
        );
      }
    };
    fetchProfilesCount();
  }, []);

  const renderNavLinks = () => {
    const baseLinkClass =
      "sidebar-link";
    const hoverClass =
      "sidebar-link-hover";
    const iconClass =
      "sidebar-icon";
    const activeClass = "sidebar-active";

    if (user?.role === "admin") {
      return (
        <ul className="sidebar-nav">
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Home size={20} className={iconClass + " " + activeClass} />
            <a href="/home">Home</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass} sidebar-relative`}>
            <ClipboardList size={20} className={iconClass + " " + activeClass} />
            <a href="/registrations">Registrations</a>
            <span className="sidebar-badge">
              {regCount}
            </span>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <UserPlus size={20} className={iconClass + " " + activeClass} />
            <a href="/leaves">Leaves</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Users size={20} className={iconClass + " " + activeClass} />
            <a href="/employee">Employee</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Briefcase size={20} className={iconClass + " " + activeClass} />
            <a href="/jobs">Jobs</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <CheckCircle size={20} className={iconClass + " " + activeClass} />
            <a href="/recordings">Recordings</a>
          </li>
        </ul>
      );
    } else if (user?.role === "employee" && user?.verified === "approved") {
      return (
        <ul className="sidebar-nav">
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Home size={20} className={iconClass + " " + activeClass} />
            <a href="/users">Home</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <UserPlus size={20} className={iconClass + " " + activeClass} />
            <a href="/leaves">Leaves</a>
          </li>
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Briefcase size={20} className={iconClass + " " + activeClass} />
            <a href="/jobs">Jobs</a>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="sidebar-nav">
          <li className={`${baseLinkClass} ${hoverClass}`}>
            <Briefcase size={20} className={iconClass + " " + activeClass} />
            <a href="/jobs">Jobs</a>
          </li>
        </ul>
      );
    }
  };

  return (
    <div className="sidebar">
      {/* Logo Section */}
      <p className="sidebar-logo">
        Yuna
      </p>
      {/* Navigation Links */}
      <nav className="sidebar-nav-container">{renderNavLinks()}</nav>
      {/* Settings Button */}
      <div className="sidebar-settings">
        <button className="sidebar-settings-btn">
          <Settings size={20} className="sidebar-settings-icon" />
          <a href="/settings">Settings</a>
        </button>
      </div>
      {/* User Info */}
      <div className="sidebar-user">
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="sidebar-avatar"
        />
        <div className="sidebar-user-info">
          <div>
            <p className="sidebar-user-name">{user?.first_name}</p>
            <p className="sidebar-user-email" title={user?.email}>
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