import { useSelector } from "react-redux";

const Navbar = () => {
  const AUTH_URL = import.meta.env.VITE_AUTH_URL;
  console.log(`Auth_URL = ${AUTH_URL}`);
  const { screenWidth } = useSelector((state: any) => state.app);
  return (
    <div className="flex justify-between p-2 relative">
      <div className="flex">{screenWidth}</div>
      <a className="btn btn-success btn-lg" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  );
};

export default Navbar;
