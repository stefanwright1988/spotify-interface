import { FaHome, FaSearch, FaBookOpen } from "react-icons/fa";
import { FiBookOpen, FiSearch, FiHome } from "react-icons/fi";

export const links = [
  {
    title: "Menu",
    links: [
      {
        name: "Home",
        icon: <FiHome />,
      },
      {
        name: "Search",
        icon: <FiSearch />,
      },
      {
        name: "playlists",
        icon: <FiBookOpen />,
      },
    ],
  },
];
