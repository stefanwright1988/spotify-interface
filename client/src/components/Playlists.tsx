import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlists = ({ playlists }) => {
  return (
    <div className="col-1">
      {playlists.map((playlist, index) => (
        <PlaylistItem key={index} playlistItem={playlist} />
      ))}
    </div>
  );
};

export default Playlists;
