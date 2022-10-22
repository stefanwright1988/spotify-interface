import { useAppSelector } from "../hooks/reduxHooks";

const Navbar = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  const state = useAppSelector((state: any) => state);
  return (
    <div
      className={`fixed flex p-2 ${
        state.app.navActive ? `w-[calc(100%_-_18rem)]` : `w-[calc(100%_-_4rem)]`
      } justify-end items-center bg-white`}
    >
      <div className="mr-auto">Back / Forward</div>
      <div className="">
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
