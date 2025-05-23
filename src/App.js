import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import routes from "./routes/authentication"; // adapte le chemin si besoin

function App() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <Routes>
        {routes.map((route, index) => {
          const Component = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={<Component />}
            />
          );
        })}
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Suspense>
  );
}

export default App;