import { NavLink } from "react-router-dom";
import appSlice from "../redux/slices/globalApp";
import { links } from "../maps/sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const { setNavActive } = appSlice.actions;
  const { navActive, screenWidth } = useAppSelector((state: any) => state.app);

  const handleCloseSidebar = () => {
    if (navActive && screenWidth <= 900) {
      dispatch(setNavActive(!navActive));
    }
  };

  return (
    <div className="flex flex-grow flex-shrink h-[calc(100%_-_56px)]">
      <nav className="flex flex-col flex-wrap mb-2 ">
        {links.map((topLink, index) => (
          <div key={index}>
            {topLink.links.map((subLink, index) => (
              <NavLink
                to={`${subLink.link}`}
                key={index}
                className="flex py-2 flex-nowrap flex-row items-center"
                onClick={handleCloseSidebar}
              >
                <div className="block w-6 h-6 items-center justify-center">
                  {subLink.icon}
                </div>
                <span className="capitalize">{subLink.name}</span>
              </NavLink>
            ))}
          </div>
        ))}
        <hr />
      </nav>
    </div>
  );
};

export default Sidebar;
