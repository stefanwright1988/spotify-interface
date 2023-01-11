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
  } = useGetUserQuery();

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
    <header className="flex w-full p-4">
      <div id="pageNavigation" className="flex h-full items-center w-1/2">
        <div className="rounded-xl shadow-lg shadow-black p-2 bg-slate-900">
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
      <div id="user" className="flex h-full w-1/2 justify-end pr-4">
        <div
          className={`navigation relative ${
            userMenuOpen ? `w-fit` : `w-28`
          } h-12 flex justify-between bg-slate-500 overflow-hidden z-10 ${
            userMenuOpen ? `active` : ``
          } transition`}
        >
          <div
            className={`user-box relative ${
              userMenuOpen ? `w-fit` : `w-12`
            } h-12 flex items-center overflow-hidden`}
          >
            <div className="image-box relative min-w-[3rem] h-12 overflow-hidden">
              <img
                src="https://i.pravatar.cc/150?img=49"
                alt="avatar"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
            <p className="username whitespace-nowrap">Jenifer Lopez</p>
          </div>
          <div
            onClick={() => setUserMenuOpen((prevState) => !prevState)}
            className="menu-toggle relative w-12 h-12 flex justify-center items-center cursor-pointer"
          ></div>
          <ul className="menu absolute w-full h-[calc(100%_-_48px) mt-12 p-5">
            <li className="list-none">
              <a href="#" className="flex items-center gap-3 my-5">
                Profile
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="flex items-center gap-3 my-5">
                Messages
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="flex items-center gap-3 my-5">
                Notification
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="flex items-center gap-3 my-5">
                Settings
              </a>
            </li>
            <li className="list-none">
              <a href="#" className="flex items-center gap-3 my-5">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
