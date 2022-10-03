import React from "react";
import PlaylistItem from "./PlaylistItem";

const Playlists = ({ playlists }) => {
  return (
    <div>
      {playlists.map((playlist, index) => (
        <PlaylistItem key={index} playlistItem={playlist} />
      ))}
    </div>
  );
};

export default Playlists;