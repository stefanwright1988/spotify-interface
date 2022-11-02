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

  const activeLink = `flex flex-wrap items-center fill-current text-white font-bold pt-2 pb-2 border-l-4 border-green-500`;
  const inactiveLink = `flex flex-wrap items-center fill-current text-white font-bold pt-2 pb-2 border-l-4 border-transparent`;

  return (
    <>
      <div className="flex flex-col max-h-[90%] min-h-[90%]">
        <div className="h-8 w-8 mt-2 ml-4 fill-current text-white">&nbsp;</div>
        <nav className="mb-4 mt-4">
          <ul>
            {links.map((subLink, index) => (
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
            ))}
          </ul>
        </nav>
        <div className="mb-4">
          <h2 className="pl-4 uppercase text-xs text-gray-400 tracking-widest mb-2">
            Your Library
          </h2>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Made For You
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Recently Played
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Liked Songs
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Albums
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Artists
          </p>
          <p className="pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium">
            Podcasts
          </p>
        </div>
        <h2 className="uppercase text-xs text-gray-400 tracking-widest mb-2 pl-4">
          Playlists
        </h2>
        <div className="side-lists max-h-full overflow-y-auto">
          <div className="mb-10">
            <PlaylistsList />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center align-middle min-h-[10%] max-h-[10%] pl-6 pr-6 border-t-2 border-gray-800 fill-current text-gray-400 hover:text-white">
        <svg
          className="h-8 w-8 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path d="M346.5 240H272v-74.5c0-8.8-7.2-16-16-16s-16 7.2-16 16V240h-74.5c-8.8 0-16 6-16 16s7.5 16 16 16H240v74.5c0 9.5 7 16 16 16s16-7.2 16-16V272h74.5c8.8 0 16-7.2 16-16s-7.2-16-16-16z" />
          <path d="M256 76c48.1 0 93.3 18.7 127.3 52.7S436 207.9 436 256s-18.7 93.3-52.7 127.3S304.1 436 256 436c-48.1 0-93.3-18.7-127.3-52.7S76 304.1 76 256s18.7-93.3 52.7-127.3S207.9 76 256 76m0-28C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z" />
        </svg>
        <p className="text-sm tracking-wide font-medium">New Playlist</p>
      </div>
    </>
  );
};

export default Sidebar;
