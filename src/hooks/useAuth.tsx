import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import appSlice from "../redux/slices/app";

const useAuth = (code: string) => {
  const { spotify_access_code, spotify_refresh_code, spotify_expires_in } =
    useSelector((state: any) => state.app);
  const dispatch = useDispatch<AppDispatch>();
  const { setSpotifyAccessCode, setSpotifyRefreshCode, setSpotifyExpiresIn } =
    appSlice.actions;

  useEffect(() => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;

    if (code && !spotify_access_code) {
      axios
        .post(
          "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/login",
          {
            code,
          },
          {
            signal: signal,
          }
        )
        .then((res) => {
          dispatch(setSpotifyAccessCode(res.data.accessToken));
          dispatch(setSpotifyRefreshCode(res.data.refreshToken));
          dispatch(setSpotifyExpiresIn(res.data.expiresIn));
          window.history.pushState({}, "", "/");
        })
        .catch((err) => {
          if (err.code !== "ERR_CANCELED") console.log(err);
        });
    }
    //cleanup function
    return () => {
      controller.abort();
    };
  }, [code]);

  useEffect(() => {
    if (!spotify_refresh_code || !spotify_expires_in) return;
    const timeout = setInterval(() => {
      axios
        .post(
          "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/refresh",
          {
            spotify_refresh_code,
          }
        )
        .then((res) => {
          dispatch(setSpotifyAccessCode(res.data.accessToken));
          dispatch(setSpotifyExpiresIn(res.data.expiresIn));
          window.history.pushState({}, "", "/dashboard");
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/dashboard";
        });
    }, (spotify_expires_in - 60) * 1000);

    return () => clearInterval(timeout);
  }, [spotify_refresh_code, spotify_expires_in]);
};

export default useAuth;
