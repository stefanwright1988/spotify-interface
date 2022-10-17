import { useAppSelector } from "../hooks/reduxHooks";

const Navbar = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  const state = useAppSelector((state: any) => state);
  return (
    <div className="flex justify-between p-2 relative">
      <div className="flex">{state.app.screenWidth}</div>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  );
};

export default Navbar;
