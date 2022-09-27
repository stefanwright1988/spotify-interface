import React from "react";

const PlaylistItem = ({ playlistItem }) => {
  return (
    <span className="d-inline-block text-truncate w-100">
      {playlistItem.name}
    </span>
  );
};

export default PlaylistItem;
