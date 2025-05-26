import React from "react";
import Sidebar from "./layout/Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="layout-root">
      <Sidebar />
      <main className="main-content">{children}</main>
    </div>
  );
}

export default Layout;
