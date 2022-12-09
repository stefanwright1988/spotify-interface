import React, { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Spinner from "../components/Spinner";
import { useAuthUser } from "../hooks/useAuthUser";
import { Dashboard, Default } from "../pages";
import { spotifyApi } from "../redux/api/spotify";
import { RootState, useTypedSelector } from "../redux/store";

const UserMiddleware: FC = ({ children }) => {
  const accessToken = useTypedSelector(
    (state: RootState) => state.spotify.spotify_access_code
  );
  const user = useAuthUser();

  spotifyApi.endpoints.getUser.useQuery(null, {
    skip: !accessToken,
  });

  if (!user && accessToken) {
    return <Spinner />;
  }

  return children as React.ReactElement;
};

export default UserMiddleware;
