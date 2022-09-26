import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

const Player = ({ accessToken, trackUri }) => {
  if (!accessToken) return null;
  const [play, setPlay] = useState(false);

  useEffect(() => setPlay(true), [trackUri]);

  return (
    <SpotifyPlayer
      token={accessToken}
      showSaveIcon
      uris={trackUri ? [trackUri] : []}
      play={play}
      callback={(state) => {
        if (!state.isPlaying) {
          setPlay(false);
        }
      }}
    />
  );
};

export default Player;
