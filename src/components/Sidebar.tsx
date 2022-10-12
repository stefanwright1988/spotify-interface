import { Link, NavLink } from "react-router-dom";
import appSlice from "../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { links } from "../maps/sidebar";
import { NavButton } from "./buttons/NavButton";
//import icons....

const Sidebar = () => {
  const dispatch = useDispatch();
  const { setNavActive } = appSlice.actions;
  const { navActive, screenWidth } = useSelector((state: any) => state.app);

  const handleCloseSidebar = () => {
    if (navActive && screenWidth <= 900) {
      dispatch(setNavActive(!navActive));
    }
  };

  const activeLink = navActive
    ? `flex items-center gap-5 w-full pt-4 pb-2.5 rounded-lg text-white text-md`
    : `flex justify-center gap-5 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md`;
  const inactiveLink = navActive
    ? `flex items-center gap-5 w-full pt-4 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md dark:hover:text-black hover:bg-light-gray`
    : `flex justify-center gap-5 w-12 pt-4 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md dark:hover:text-black hover:bg-light-gray`;

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 mx-2">
      <div className="flex justify-between items-center">
        <NavButton
          title="Hey"
          buttonFunc={() => dispatch(setNavActive(!navActive))}
        />
        {navActive && (
          <Link
            to="/"
            className="items-center gap-3 flex ml-4 mt-2 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            onClick={handleCloseSidebar}
          >
            Home
          </Link>
        )}
      </div>
      <div className="mt-10">
        {links.map((topLink, index) => (
          <div key={index}>
            <p className="text-gray-400 m-0 ml-0 mt-4 uppercase">
              {topLink.title}
            </p>
            {topLink.links.map((subLink, index) => (
              <NavLink
                to={`/${subLink.name}`}
                key={index}
                className={({ isActive }) =>
                  isActive ? activeLink : inactiveLink
                }
                onClick={handleCloseSidebar}
              >
                <div className="flex w-16 h-6 items-center justify-center">
                  {subLink.icon}
                </div>
                {navActive && (
                  <span className="capitalize">{subLink.name}</span>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
