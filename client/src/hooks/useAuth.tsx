import React, { useEffect, useState } from "react";
import axios from "axios";

const useAuth = (code: string) => {
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (code) {
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
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          setExpiresIn(res.data.expiresIn);
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
    if (!refreshToken || !expiresIn) return;
    const timeout = setInterval(() => {
      axios
        .post(
          "http://localhost:5001/spotify-react-ts-vite/us-central1/webApi/refresh",
          {
            refreshToken,
          }
        )
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, "", "/");
        })
        .catch((err) => {
          console.log(err);
          window.location.href = "/";
        });
    }, (expiresIn - 60) * 1000);

    return () => clearInterval(timeout);
  }, [refreshToken, expiresIn]);

  return accessToken;
};

export default useAuth;
