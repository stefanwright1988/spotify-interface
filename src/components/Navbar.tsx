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
        <div className="rounded-xl shadow-lg shadow-black p-2 flex bg-white fixed justify-between w-80 items-start z-10 h-64">
          <div className="userArea flex items-center relative content-end">
            {userDataLoading ? (
              "Loading"
            ) : (
              <>
                <img
                  src={userData.images[0].url}
                  style={{ height: "28px", width: "28px" }}
                />
                <span className="px-2">{userData.display_name}</span>
              </>
            )}
          </div>
          <div className="userMenuToggle relative w-16 flex justify-center items-center h-7"></div>
          <ul className="userMenu absolute mt-16 p-5 border-t-1 border-gray-900">
            <li className="list-none">
              <a href="#">Profile</a>
            </li>
            <li className="list-none">
              <a href="#">Messages</a>
            </li>
            <li className="list-none">
              <a href="#">Notification</a>
            </li>
            <li className="list-none">
              <a href="#">Settings</a>
            </li>
            <li className="list-none">
              <a href="#">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
