import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components";

const Default = () => {
  const activeMenu = true;
  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-50">X</div>
      </div>
      {activeMenu ? (
        <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-0">
          <Sidebar />
        </div>
      )}
      <div
        className={`dark:bg-main-bg bg-main-bg min-h-screen w-full
            ${activeMenu ? `md:ml-72` : `flex-2`}`}
      >
        <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"></div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Default;
