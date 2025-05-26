import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SupaBaseConnectionProvider } from "./context/supabase/AuthProvider.js"; // fixed path
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SupaBaseConnectionProvider>
        <App />
      </SupaBaseConnectionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
