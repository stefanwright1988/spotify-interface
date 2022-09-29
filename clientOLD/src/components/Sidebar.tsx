import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="col-2 bg-danger">
      <Link to="/dashboard/playlists">Playlists</Link>
    </div>
  );
};

export default Sidebar;
