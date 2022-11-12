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

  const activeLink = `flex flex-wrap items-center fill-current text-white font-bold pt-2 pb-2 xl:border-l-4 xl:border-green-500`;
  const inactiveLink = `flex flex-wrap items-center fill-current text-white font-bold pt-2 pb-2 xl:border-l-4 xl:border-transparent`;

  return (
    <>
      <div className="flex flex-col justify-center max-h-full xl:max-h-[90%] min-h-full xl:min-h-[90%]">
        <nav className="mb-0 xl:mb-4 mt-0 xl:mt-4">
          <ul className="flex flex-row justify-around content-center items-center flex-nowrap lg:block">
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
        <div className="mb-4 hidden xl:block">
          <h2 className="pl-4 uppercase text-xs text-gray-400 tracking-widest mb-2">
            Your Library
          </h2>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Made For You
          </p>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Recently Played
          </p>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Liked Songs
          </p>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Albums
          </p>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Artists
          </p>
          <p className="bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1">
            Podcasts
          </p>
        </div>
        <h2 className="hidden xl:block uppercase text-xs text-gray-400 tracking-widest mb-2 pl-4">
          Playlists
        </h2>
        <div className="hidden xl:block side-lists max-h-full overflow-y-auto mr-2">
          <div className="mb-10 pr-2">
            <PlaylistsList />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:align-middle lg:min-h-[10%] lg:max-h-[10%] lg:pl-6 lg:pr-6 lg:border-t-2 lg:border-gray-800 lg:fill-current lg:text-gray-400 lg:hover:text-white">
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
