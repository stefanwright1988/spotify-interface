import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
  CgArrowLongLeftC,
  CgChevronLeftO,
  CgChevronRightO,
} from "react-icons/cg";
import { useGetUserQuery } from "../redux/api/spotify";

const Navbar = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  const globalState = useAppSelector((state: any) => state);
  const navigate = useNavigate();

  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
    isSuccess: userDataSuccess,
    isUninitialized: userDataUninitialized,
  } = useGetUserQuery(null);

  const [userWentBack, setUserWentBack] = useState(false);
  const [backCount, setBackCount] = useState(0);

  const handleBack = () => {
    setBackCount((prevState) => ++prevState);
    navigate(-1);
  };
  const handleForward = () => {
    if (backCount > 0) {
      setBackCount((prevState) => --prevState);
    }
    navigate(1);
  };

  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    if (backCount > 0) {
      setUserWentBack(true);
    } else {
      setUserWentBack(false);
    }
  }, [backCount]);

  return (
    <header className="flex pl-8 pr-[calc(2rem_+_10px)] py-2 z-10">
      <div
        id="pageNavigation"
        className="flex h-full items-center justify-start w-1/2"
      >
        <div
          className="rounded-md border-black border-2 p-2 bg-[#00D6FE]"
          style={{ boxShadow: "5px 5px black" }}
        >
          <span>
            <CgChevronLeftO
              className="p-1 bg-slate-700 rounded-full h-8 w-8 inline-flex items-center justify-center mr-2"
              onClick={() => handleBack()}
            />
          </span>
          <span>
            <CgChevronRightO
              className={`p-1 bg-slate-700 rounded-full h-8 w-8 inline-flex items-center justify-center text-white ${
                userWentBack ? `` : `cursor-not-allowed`
              }`}
              onClick={userWentBack ? () => handleForward() : () => false}
            />
          </span>
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
        <div
          className={`absolute p-2 dropdown ${
            userMenuOpen ? "open" : ""
          } border-black border-2 bg-[#FEF08A] text-black rounded-md`}
          id="dropdown"
          style={{ boxShadow: "5px 5px black" }}
        >
          <button onClick={() => setUserMenuOpen((prevState) => !prevState)}>
            <img
              src={userData.images[0].url || ""}
              alt="avatar"
              className="w-8 h-8 object-cover"
            />
            {userData.display_name}
            <span className="chevron material-symbols-outlined"> &gt; </span>
          </button>
          <div
            id="menu"
            className={`menu bg-[#FEF08A] ${
              !userMenuOpen ? "hidden invisible" : ""
            }`}
          >
            <div id="menu-inner" className="menu-inner bg-[#FEF08A]">
              <div className="main-menu">
                <button>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
