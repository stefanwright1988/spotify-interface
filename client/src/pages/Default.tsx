import React from "react";
import { Outlet } from "react-router-dom";
import Drawer from "@mui/material/Drawer";
import { DashboardSidebar } from "../components/Sidebar";

const Default = () => {
  return (
    <>
      <DashboardSidebar />
      <Outlet />
      <div>Footern</div>
    </>
  );
};

export default Default;
