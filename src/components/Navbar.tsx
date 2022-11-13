import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import {
  CgArrowLongLeftC,
  CgChevronLeftO,
  CgChevronRightO,
} from "react-icons/cg";

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
    <header className="flex justify-center items-center w-full p-4">
      <div id="pageNavigation" className="flex h-full items-center w-1/2">
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
      <div id="user" className="flex items-center justify-end w-1/2 mr-8">
        <div>
          <a className="btn btn-success btn-lg" href={AUTH_URL}>
            Login with Spotify
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
