import { useDispatch, useSelector } from "react-redux";
import appSlice from "../redux/slices/app";
import { BurgerArrow as Burger } from "react-burger-icons";

const Navbar = () => {
  const { toggleNav } = appSlice.actions;
  const dispatch = useDispatch();
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <NavButton
        title="Hey"
        buttonFunc={() => dispatch(toggleNav())}
        color="red"
      />
      Navbar
    </div>
  );
};

const NavButton = ({ title, buttonFunc, color }: any) => {
  const { navActive } = useSelector((state: any) => state.app);
  return (
    <div>
      <button type="button" onClick={buttonFunc}>
        <Burger isClosed={navActive} />
      </button>
    </div>
  );
};

export default Navbar;
