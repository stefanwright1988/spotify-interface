import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import appSlice from "../redux/slices/app";

const LoginCallback = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [searchParams] = useSearchParams();
  const accessCode = searchParams.get("code");
  const { setSpotifyAccessCode, setSpotifyRefreshCode, setSpotifyExpiresIn } =
    appSlice.actions;

  useEffect(() => {
    const controller: AbortController = new AbortController();
    const signal: AbortSignal = controller.signal;
    const performLogin = async () => {
      await axios
        .get(
          `http://localhost:5001/spotify-react-ts-vite/us-central1/app/callback?code=${accessCode}`,
          { signal: signal }
        )
        .then((res) => {
          dispatch(setSpotifyAccessCode(res.data.access_token));
          dispatch(setSpotifyRefreshCode(res.data.refresh_token));
          dispatch(setSpotifyExpiresIn(res.data.expires_in));
          window.history.pushState({}, "", "/");
        })
        .catch((err) => {
          if (controller.signal.aborted) return;
          console.log(err);
        });
    };
    performLogin();
    return () => {
      controller.abort();
    };
  }, [accessCode]);

  return (
    <div>
      <FaSpinner />
      <p>Logging you in...</p>
    </div>
  );
};

export default LoginCallback;
