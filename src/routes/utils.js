import { lazy } from "react";

const routes = [
  {
    exact: true,
    path: "*",
    component: lazy(() => import("../pages/Error/NotFound")),
  },
];

export default routes;
