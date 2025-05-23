import React, { Suspense } from "react";
import { Route } from "react-router-dom";

const RouteWithGuard = ({ path, exact, component: Component, guard: Guard }) => {
  return (
    <Route
      path={path}
      exact={exact}
      element={
        <Suspense fallback={<div>Loading...</div>}>
          <Guard>
            <Component />
          </Guard>
        </Suspense>
      }
    />
  );
};

export default RouteWithGuard;
