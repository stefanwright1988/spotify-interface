import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import Playback from "../components/Playback";
import { useAppSelector } from "../hooks/reduxHooks";

const Default = () => {
  const { navActive } = useAppSelector((state: any) => state.app);

  return (
    <>
      <div className="max-w-full w-full h-screen overflow:auto xl:overflow-hidden">
        <div className="flex flex-wrap flex-row w-full max-h-[90vh] min-h-[90vh] aside-container">
          <aside
            id="content__left"
            className="max-h-[5vh] lg:max-h-[90vh] min-h-[5vh] lg:min-h-[90vh] w-full lg:w-1/6 bg-gray-900 text-gray-200 order-3 lg:order-1 overflow-hidden"
          >
            <Sidebar />
          </aside>
          <main className="flex flex-col h-full w-full lg:w-5/6 bg-gray-800 text-gray-200 order-1 lg:order-2 max-h-[85vh] lg:max-h-[90vh] min-h-[85vh] lg:min-h-[90vh]">
            <Navbar />
            <div className="min-h-full overflow-y-auto flex-grow mx-2">
              <Outlet />
            </div>
          </main>
          <Playback />
        </div>
      </div>
    </>
  );
};

export default Default;
