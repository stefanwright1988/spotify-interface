import { Link, NavLink } from "react-router-dom";
import appSlice from "../redux/slices";
import { useDispatch, useSelector } from "react-redux";
//import icons....

const Sidebar = () => {
  const { toggleNav } = appSlice.actions;
  const dispatch = useDispatch();
  const { navActive } = useSelector((state:any) => state.app);

  const activeLink = `flex items-center gap-2 pl-4 pt-4 pb-2.5 rounded-lg text-white text-md m-2`;

  const inactiveLink = `flex items-center gap-2 pl-4 pt-4 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md m-2 dark:hover:text-black hover:bg-light-gray`;
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {navActive && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="items-center gap-3 flex ml-4 mt-4 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              Home
            </Link>
            <span onClick={() => dispatch(toggleNav(false))}>X</span>
          </div>
          <div className="mt-10">
            <div className="text-gray-400 m-3 ml-0 mt-4 uppercase">
              <NavLink
                to="/playlists"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                Icon <span className="capitalize">Playlists</span>
              </NavLink>

              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                Icon <span className="capitalize">Playlists</span>
              </NavLink>

              <NavLink
                to="/me"
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
              >
                Icon <span className="capitalize">Me</span>
              </NavLink>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
