import React, { useEffect } from "react";
import { FaRegClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { convertMsToTime, formatUTCDateToISO } from "../helpers/datetime";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { fetchPlaylist } from "../redux/slices/spotifyPlaylists";
import { IPlaylist } from "../types/playlistTypes";

const Playlist = () => {
  const params = useParams();
  const {
    selectedPlaylist,
    selectedPlaylistFetchState,
  }: {
    selectedPlaylist: IPlaylist;
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
  }, [dispatch, params.playlistId]);

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
      <div className="w-full">
        <div className="pt-4 pb-4 flex flex-col lg:flex-row">
          <img
            className="w-56 mx-8 aspect-square shadow-xl self-center"
            src={selectedPlaylist.images[0]?.url}
          />
          <div className="w-full lg:w-5/6 px-4 flex flex-col justify-end">
            <span className="py-2 font-semibold">
              {selectedPlaylist.public ? "Public Playlist" : "Private Playlist"}
            </span>
            <h1 className="line-clamp-1 break-words text-3xl my-2">
              {selectedPlaylist.name}
            </h1>
            <p className="line-clamp-2">{selectedPlaylist.description}</p>
            <span className="py-2">
              {selectedPlaylist.followers.total} likes,{" "}
              {selectedPlaylist.tracks.total} songs,{" "}
              <span className="font-thin">{convertedTotalTrackLength}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full min-h-[calc(66.66%_-_3.5rem)] flex flex-col">
        <div className="w-full h-14">controls</div>
        <div className="w-full flex flex-col">
          <table
            role="table"
            className="w-11/12 m-auto grid border-collapse grid-cols-[15px__2fr_1fr_75px] xl:grid-cols-[15px_3fr_1fr_1fr_1fr_75px]"
          >
            <thead role="rowgroup" className="contents border-b">
              <tr role="row" className="contents">
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-2 py-4 text-left"
                >
                  #
                </th>
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-6 py-4 text-left"
                >
                  Title
                </th>
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-6 py-4 text-left"
                >
                  Album
                </th>
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-6 py-4 text-left hidden xl:table-cell"
                >
                  Added By
                </th>
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-6 py-4 text-left hidden xl:table-cell"
                >
                  Date Added
                </th>
                <th
                  role="columnheader"
                  className="text-sm uppercase font-medium px-2 py-4"
                >
                  <div className=" md:flex flex-row justify-center items-center content-center flex-wrap">
                    <FaRegClock />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="contents">
              {selectedPlaylist.tracks.items.map((tracks, index) => {
                const { added_at, added_by } = tracks;
                const { name, album, duration_ms } = tracks.track;
                const albumThumb = album.images.filter((image) => {
                  return image.height === 64;
                })[0];
                return (
                  <tr role="row" className="contents border-b">
                    <td role="cell" className="px-2 py-4 text-sm font-medium ">
                      {index + 1}
                    </td>
                    <td role="cell" className="text-sm font-light px-6 py-4">
                      <div className="flex flex-row">
                        <div>
                          <img
                            src={albumThumb?.url}
                            className="min-w-[48px] aspect-square"
                          />
                        </div>
                        <div className="flex flex-col">
                          <p>{name}</p>
                          <span>Artists</span>
                        </div>
                      </div>
                    </td>
                    <td role="cell" className="text-sm font-light px-6 py-4">
                      <span>{album.name}</span>
                    </td>
                    <td
                      role="cell"
                      className="text-sm font-light px-6 py-4 hidden xl:table-cell"
                    >
                      {added_by.id}
                    </td>
                    <td
                      role="cell"
                      className="text-sm font-light px-6 py-4 hidden xl:table-cell"
                    >
                      {formatUTCDateToISO(added_at).toLocaleDateString()}
                    </td>
                    <td role="cell" className="text-sm font-light px-2 py-4">
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
