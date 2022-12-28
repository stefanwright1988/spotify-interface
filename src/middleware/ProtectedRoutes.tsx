import React, { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Navbar, Sidebar } from "../components";
import Playback from "../components/Playback";
import { useAuthUser } from "../hooks/useAuthUser";
import { RootState, useTypedSelector } from "../redux/store";
import UserMiddleware from "./UserMiddleware";

const ProtectedRoutes = () => {
  const {
    spotify_access_code: accessToken,
    spotify_refresh_code: refreshToken,
  } = useTypedSelector((state: RootState) => state.spotify);
  let location = useLocation();

  if (!accessToken && !refreshToken) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <UserMiddleware>
      <div className="max-w-full w-full h-screen overflow:auto xl:overflow-hidden bg-slate-800">
        <div className="flex flex-wrap flex-row w-full max-h-[90vh] min-h-[90vh] aside-container">
          <aside
            id="content__left"
            className="max-h-[10vh] lg:max-h-[90vh] min-h-[10vh] lg:min-h-[90vh] w-full lg:w-1/6 text-gray-200 order-3 lg:order-1 overflow-hidden"
          >
            <Sidebar />
          </aside>
          <main className="flex flex-col h-full w-full lg:w-5/6 text-gray-200 order-1 lg:order-2 max-h-[80vh] lg:max-h-[90vh] min-h-[80vh] lg:min-h-[90vh]">
            <Navbar />
            <div className="min-h-full overflow-y-auto flex-grow mx-2">
              <Outlet />
            </div>
          </main>
          <Playback />
        </div>
      </div>
    </UserMiddleware>
  );
};

export default ProtectedRoutes;
