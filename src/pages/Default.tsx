import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import { useAppSelector } from "../hooks/reduxHooks";

const Default = () => {
  const { navActive } = useAppSelector((state: any) => state.app);

  return (
    <>
      <Navbar />
      <section
        id="content"
        className="flex flex-row flex-wrap flex-grow basis-full flex-shrink max-h-[88vh]"
      >
        <aside id="content__left" className="flex flex-col w-2/12">
          <Sidebar />
        </aside>
        <div id="content__middle" className="w-10/12">
          <main className="overflow-y-scroll block max-h-[88vh]">
            <Outlet />
          </main>
        </div>
      </section>
      <section
        id="current__track"
        className="bg-blue-400 px-4 py-2 flex flex-row flex-wrap items-center h-[6vh]"
      >
        Playback bar
      </section>
    </>
  );
};

export default Default;
