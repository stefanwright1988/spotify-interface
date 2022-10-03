import { Link, NavLink } from "react-router-dom";
import appSlice from "../redux/slices/app";
import { useDispatch, useSelector } from "react-redux";
import { NavButton } from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";
import { links } from "../maps/sidebar";
//import icons....

const Sidebar = () => {
  const dispatch = useDispatch();
  const { toggleNav } = appSlice.actions;
  const { navActive } = useSelector((state: any) => state.app);

  const activeLink = navActive
    ? `flex items-center justify-center gap-5 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md`
    : `flex justify-center gap-5 pl-2 pt-3 pb-2.5 rounded-lg text-white text-md`;
  const inactiveLink = navActive
    ? `flex items-center gap-5 w-full pt-4 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md dark:hover:text-black hover:bg-light-gray`
    : `flex justify-center gap-5 w-10 pt-4 pb-2.5 rounded-lg text-gray-700 dark:text-gray-200 text-md dark:hover:text-black hover:bg-light-gray`;

  return (
    <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      <div className="flex justify-between items-center">
        {navActive && (
          <Link
            to="/"
            className="items-center gap-3 flex ml-4 mt-4 text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
          >
            Home
          </Link>
        )}
        <NavButton title="Hey" buttonFunc={() => dispatch(toggleNav())} />
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
              >
                <div className="flex w-10 h-6 items-center justify-center">
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
