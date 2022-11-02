import { FaHome, FaSearch, FaBookOpen } from "react-icons/fa";
import { FiBookOpen, FiSearch, FiHome } from "react-icons/fi";

export const links = [
  {
    name: "home",
    link: "/",
    icon: <FiHome />,
  },
  {
    name: "Search",
    link: "/search",
    icon: <FiSearch />,
  },
  {
    name: "playlists",
    link: "/playlists",
    icon: <FiBookOpen />,
  },
];
