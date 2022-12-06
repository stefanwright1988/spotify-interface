import React, { FC } from "react";
import Spinner from "../components/Spinner";
import { useAuthUser } from "../hooks/useAuthUser";
import { Dashboard, Default } from "../pages";
import { spotifyApi } from "../redux/api/spotify";
import { RootState, useTypedSelector } from "../redux/store";

const UserMiddleware = ({ children }) => {
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
  //return <Default />;
};

export default UserMiddleware;
