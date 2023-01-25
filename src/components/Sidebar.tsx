import { NavLink } from "react-router-dom";
import appSlice from "../redux/slices/globalApp";
import { links } from "../maps/sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import PlaylistsList from "./PlaylistsList";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { setNavActive } = appSlice.actions;
  const { navActive, screenWidth } = useAppSelector((state: any) => state.app);

  const handleCloseSidebar = () => {
    if (navActive && screenWidth <= 900) {
      dispatch(setNavActive(!navActive));
    }
  };

  const activeLink = `bg-[#0097FF] flex flex-wrap items-center fill-current text-white font-bold xl:border-l-4 xl:border-[#FEF08A]`;
  const inactiveLink = `bg-[#0097FF] flex flex-wrap items-center fill-current text-white font-bold xl:border-l-4 xl:border-transparent`;

  return (
    <>
      <div className="flex flex-col max-h-full min-h-full xl:grid xl:grid-rows-[1fr_1fr_2fr]">
        {links.map((subLink, index) => (
          <nav
            className="mb-0 xl:mb-2 mt-0 xl:mt-2 bg-[#0097FF] m-2 rounded-md xl:py-2 border-2 border-black"
            style={{ boxShadow: "5px 5px black" }}
          >
            <ul className="flex flex-row justify-around content-center items-center flex-nowrap lg:block">
              <li key={index}>
                <NavLink
                  to={`${subLink.link}`}
                  end
                  key={index}
                  className={({ isActive }) => {
                    return isActive ? activeLink : inactiveLink;
                  }}
                  onClick={handleCloseSidebar}
                >
                  <div className="h-6 w-6 mr-4 ml-4 flex items-center content-center">
                    {subLink.icon}
                  </div>
                  <span className="capitalize">{subLink.name}</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        ))}
        <div
          className="mb-2 hidden xl:block bg-[#0097ff] rounded-md m-2 py-2 border-2 border-black"
          style={{ boxShadow: "5px 5px black" }}
        >
          <h2 className="pl-4 uppercase text-xs tracking-widest mb-2">
            Your Library
          </h2>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Made For You
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Recently Played
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Liked Songs
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Albums
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Artists
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Podcasts
          </p>
        </div>
        <div
          className="hidden xl:block overflow-hidden bg-[#0097ff] rounded-md m-2 mb-4 py-2 border-2 border-black"
          style={{ boxShadow: "5px 5px black" }}
        >
          <h2 className="hidden xl:block uppercase text-xs tracking-widest mb-2 pl-4">
            Playlists
          </h2>
          <div className="overflow-y-auto mr-2 h-[calc(100%_-_26px)]">
            <div className="pr-2 h-full">
              <PlaylistsList />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
