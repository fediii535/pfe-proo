import { lazy } from "react";

const routes = [
  {
    exact: true,
    path: "/login",
    component: lazy(() => import("../pages/auth/login/Login")),
    guard: lazy(() => import("../guards/GuestGuard")),
  },
  {
    exact: true,
    path: "/signup",
    component: lazy(() => import("../pages/auth/register/SignUp")),
    guard: lazy(() => import("../guards/GuestGuard")),
  },
];

export default routes;