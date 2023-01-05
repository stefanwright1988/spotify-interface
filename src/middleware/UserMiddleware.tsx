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
  const {
    spotify_access_code: accessToken,
    spotify_refresh_code: refreshToken,
  } = useTypedSelector((state: RootState) => state.spotify);
  const user = useAuthUser();

  spotifyApi.endpoints.refreshToken.useQuery(null, {
    skip: (!accessToken && !refreshToken) || !refreshToken,
  });

  spotifyApi.endpoints.getUser.useQuery(null, {
    skip: !accessToken,
  });

  spotifyApi.endpoints.allPlaylists.useQuery(undefined, {
    pollingInterval: 300000,
    skip: !accessToken,
  });

  spotifyApi.endpoints.featuredPlaylists.useQuery(undefined, {
    skip: !accessToken,
  });

  if (!accessToken && !refreshToken) {
    return children as React.ReactElement;
  }

  if (!user && !accessToken) {
    return <Spinner />;
  }

  return children as React.ReactElement;
};

export default UserMiddleware;
