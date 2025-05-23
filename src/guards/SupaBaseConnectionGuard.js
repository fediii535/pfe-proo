import React, { useEffect } from "react";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/supabase/SupaBaseConnectionCtx";

const commonPages = [
  "/jobs",
  "/profile",
  "/settings",
  "/leaves",
  "/recordings",
  "/registrations",
  "/vue-more",
  "/home",
  "/CreateEmployee",
];

const rolePages = {
  admin: [
    "/home",
    "/jobs",
    "/leaves",
    "/recordings",
    "/registrations",
    "/vue-more",
    "/employee",
    "/portfolio",
    "/settings",
  ],
  employee: {
    verified: [
      "/users",
      "/leaves",
      "/jobs",
      "/CreateEmployee",
      "/settings",
    ],
    unverified: [
      "/jobs",
      "/settings",
    ],
  },
};

export default function SupabaseConnectionGuard({ children }) {
  const { isAuthenticated, isInitialized, user } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isInitialized && isAuthenticated && user) {
      const userRole = user.role || "employee";
      const currentPath = location.pathname;

      const isCommonPage = commonPages.some((page) =>
        currentPath.startsWith(page)
      );

      let isRoleSpecificPage = false;
      if (userRole === "admin") {
        isRoleSpecificPage = rolePages.admin.some((page) =>
          currentPath.startsWith(page)
        );
      } else {
        const employeePages =
          user.verified === "approuved"
            ? rolePages.employee.verified
            : rolePages.employee.unverified;
        isRoleSpecificPage = employeePages.some((page) =>
          currentPath.startsWith(page)
        );
      }

      if (!isCommonPage && !isRoleSpecificPage) {
        if (userRole === "admin") {
          navigate("/home");
        } else {
          if (user.verified !== "pending") {
            navigate("/users");
          } else {
            navigate("/jobs");
          }
        }
      }
    }
  }, [isInitialized, isAuthenticated, user, location.pathname, navigate]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
