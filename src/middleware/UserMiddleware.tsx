import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthUser } from "../hooks/useAuthUser";
import { Dashboard, Default } from "../pages";
import { spotifyApi, useAllPlaylistsQuery } from "../redux/api/spotify";
import { RootState, useTypedSelector } from "../redux/store";

interface Props {
  children: React.ReactNode;
}

const UserMiddleware: FC<Props> = ({ children }) => {
  const accessToken = useTypedSelector(
    (state: RootState) => state.spotify.spotify_access_code
  );
  const user = useAuthUser();

  spotifyApi.endpoints.getUser.useQuery(null, {
    skip: !accessToken,
  });

  spotifyApi.endpoints.allPlaylists.useQuery(undefined, {
    pollingInterval: 30000,
    skip: !accessToken,
  });

  if (!user && accessToken) {
    return <Spinner />;
  }

  return children as React.ReactElement;
};

export default UserMiddleware;
