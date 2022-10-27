import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const Navbar = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  const globalState = useAppSelector((state: any) => state);
  const navigate = useNavigate();

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
    <div className="flex flex-row flex-wrap items-center p-3 h-[6vh]">
      <div id="pageNavigation" className="w-1/12">
        <span>
          <FiChevronLeft
            className="mr-4 p-1 bg-slate-700 rounded-full h-8 w-8 inline-flex items-center justify-center text-white"
            onClick={() => handleBack()}
          />
        </span>
        <span>
          <FiChevronRight
            className={`p-1 bg-slate-700 rounded-full h-8 w-8 inline-flex items-center justify-center text-white ${
              userWentBack ? `` : `cursor-not-allowed`
            }`}
            onClick={userWentBack ? () => handleForward() : () => false}
          />
        </span>
      </div>
      <div id="search" className="w-4/12 ml-1">
        <p>Search</p>
      </div>
      <div
        id="user"
        className="flex flex-row flex-wrap items-end basis-1 flex-grow flex-shrink"
      >
        <div>
          <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
