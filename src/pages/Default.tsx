import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { useAppSelector } from "../hooks/reduxHooks";

const Default = () => {
  const { navActive } = useAppSelector((state: any) => state.app);

  return (
    <>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4 z-50">X</div>
      </div>
      {navActive ? (
        <div className="w-72 fixed sidebar dark:bg-black bg-white">
          <Sidebar />
        </div>
      ) : (
        <div className="w-16 fixed sidebar dark:bg-black bg-white transition-all">
          <Sidebar />
        </div>
      )}

      <div
        className={`dark:bg-zinc-900 bg-main-bg min-h-screen w-full flex flex-col
            ${navActive ? `md:ml-72` : `ml-16`}`}
      >
        <div className="fixed md:static w-full h-10 z-10">
          <Navbar />
        </div>
        <div className="-mt-10 h-full z-0">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Default;
