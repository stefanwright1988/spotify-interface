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
        <div className="rounded-xl shadow-lg shadow-black p-2 bg-slate-900">
          {userDataLoading ? (
            "Loading"
          ) : (
            <>
              <img
                src={userData.images[0].url}
                style={{ height: "28px", width: "28px" }}
              />{" "}
              {userData.display_name}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
