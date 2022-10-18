import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { convertMsToTime } from "../helpers/datetime";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchPlaylist } from "../redux/slices/spotifyPlaylists";
import { PlaylistAttributes } from "../types/playlistTypes";

const Playlist = () => {
  const params = useParams();
  const {
    selectedPlaylist,
    selectedPlaylistFetchState,
  }: {
    selectedPlaylist: PlaylistAttributes;
    selectedPlaylistFetchState: string;
  } = useAppSelector((state: any) => state.playlists);
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

  if (
    selectedPlaylistFetchState === "loading" ||
    selectedPlaylistFetchState === "idle"
  ) {
    return (
      <div>
        <p>...LOADING PLAYLISTS</p>
      </div>
    );
  }

  if (selectedPlaylistFetchState === "error") {
    return (
      <div>
        <p>...ERROR LOADING PLAYLISTS</p>
      </div>
    );
  }

  const totalTrackLength = selectedPlaylist.tracks.items.reduce(
    (sum, track) => {
      return (sum += track.track.duration_ms);
    },
    0
  );

  const convertedTotalTrackLength: string = convertMsToTime(
    Number(totalTrackLength)
  );

  return (
    <div className="h-full justify-center">
      <div className="w-full h-[calc(33.33%_+_3.5rem)] bg-slate-50">
        <div className="pt-14 h-full flex flex-row">
          <img
            className="w-1/6 mx-4 my-auto aspect-square"
            src={selectedPlaylist.images[0]?.url}
          />
          <div className="w-5/6 mx-4 my-auto">
            <span>
              Playlist type: {selectedPlaylist.public ? "Public" : "Private"}
            </span>
            <h1>{selectedPlaylist.name}</h1>
            <p>{selectedPlaylist.description}</p>
            <span>
              {selectedPlaylist.followers.total} likes,{" "}
              {selectedPlaylist.tracks.total} songs, {convertedTotalTrackLength}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
