import { BurgerSexy } from "react-burger-icons";
import { useSelector } from "react-redux";

export const NavButton = ({ title, buttonFunc, color }: any) => {
  const { navActive } = useSelector((state: any) => state.app);
  return (
    <button
      type="button"
      onClick={buttonFunc}
      className="flex justify-center items-center w-16 h-7 mt-2 text-black"
    >
      <BurgerSexy isClosed={navActive} />
    </button>
  );
};
