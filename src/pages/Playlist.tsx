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
    <div className="h-full justify-center flex flex-col">
      <div className="w-full max-h-[calc(33.33%_+_3.5rem)] bg-slate-50">
        <div className="pt-14 pb-4 h-full flex flex-row">
          <img
            className="w-1/6 mx-4 aspect-square"
            src={selectedPlaylist.images[0]?.url}
          />
          <div className="w-5/6 mx-4">
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

      <div className="w-full min-h-[calc(66.66%_-_3.5rem)] bg-slate-200 flex flex-col">
        <div className="w-full h-14 bg-slate-400">controls</div>
        <div className="w-full bg-slate-600 flex-1">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  #
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  First
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Last
                </th>
                <th
                  scope="col"
                  className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                >
                  Handle
                </th>
              </tr>
            </thead>
            <tbody>
              {selectedPlaylist.tracks.items.map((tracks, index) => {
                const { name, album, duration_ms } = tracks.track;
                const albumThumb = album.images.filter((image) => {
                  return image.height === 64;
                })[0];
                return (
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-row">
                        <div>
                          <img src={albumThumb.url} />
                        </div>
                        <div className="flex flex-col">
                          <p>{name}</p>
                          <span>Artists</span>
                        </div>
                      </div>
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {album.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {convertMsToTime(Number(duration_ms))}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
