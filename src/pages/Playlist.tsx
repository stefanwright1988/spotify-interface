import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchPlaylist } from "../redux/slices/spotifyPlaylists";

const Playlist = () => {
  const params = useParams();
  const playlistState = useAppSelector((state: any) => state.playlists);
  const { spotify_access_code } = useAppSelector((state: any) => state.spotify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    dispatch(
      fetchPlaylist({
        apiUrl: `http://localhost:5001/spotify-react-ts-vite/us-central1/app/playlist?playlistId=${params.playlistId}&accessToken=${spotify_access_code}`,
        opts: opts,
      })
    );
    return () => {
      abortCtrl.abort();
    };
  }, [dispatch]);

  if (playlistState.fetchState === "loading") {
    return (
      <div>
        <p>...LOADING PLAYLISTS</p>
      </div>
    );
  }

  if (playlistState.fetchState === "error") {
    return (
      <div>
        <p>...ERROR LOADING PLAYLISTS</p>
      </div>
    );
  }
  return <div>Playlist id: {params.playlistId}</div>;
};

export default Playlist;
