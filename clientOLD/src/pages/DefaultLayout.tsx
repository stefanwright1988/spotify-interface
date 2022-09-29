import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const DefaultLayout = () => {
  return (
    <div className="container-fluid d-flex flex-column overflow-hidden vh-100">
      <Sidebar></Sidebar>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
