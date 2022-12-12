import React from "react";
import { NavLink } from "react-router-dom";
import { useAllPlaylistsQuery } from "../redux/api/spotify";
import { IPlaylist } from "../types/playlistTypes";
import Spinner from "./Spinner";

const PlaylistsList = () => {
  const {
    data: playlists,
    isError,
    isFetching,
    isLoading,
    isSuccess,
  } = useAllPlaylistsQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return (
      <div>
        <p>...ERROR LOADING PLAYLISTS</p>
      </div>
    );
  }

  const activeLink = `bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-white font-bold border-l-4 border-green-500 line-clamp-1`;
  const inactiveLink = `bg-gray-900 pl-6 mb-2 text-sm tracking-wide text-gray-400 hover:text-white font-medium border-l-4 border-transparent line-clamp-1`;

  return (
    <>
      {playlists.items?.map((playlist: IPlaylist, index: number) => {
        return (
          <NavLink
            to={`/playlist/${playlist.id}`}
            key={index}
            end
            className={({ isActive }) => {
              return isActive ? activeLink : inactiveLink;
            }}
          >
            {playlist.name}
          </NavLink>
        );
      })}
    </>
  );
};

export default PlaylistsList;
