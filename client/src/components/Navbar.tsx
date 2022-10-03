import { useDispatch, useSelector } from "react-redux";
import appSlice from "../redux/slices/app";
import { BurgerArrow as Burger } from "react-burger-icons";

const Navbar = () => {
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">Navbar</div>
  );
};

export const NavButton = ({ title, buttonFunc, color }: any) => {
  const { navActive } = useSelector((state: any) => state.app);
  return (
    <button
      type="button"
      onClick={buttonFunc}
      className="flex justify-center items-center w-10 h-7 mt-4 text-black"
    >
      <Burger isClosed={navActive} />
    </button>
  );
};

export default Navbar;
