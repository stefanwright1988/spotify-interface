import { FaSpinner } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import spotifySlice from "../redux/slices/spotifyAuth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useCallbackQuery } from "../redux/api/auth";

const LoginCallback = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const accessCode = searchParams.get("code");
  const { setSpotifyAccessCode, setSpotifyRefreshCode, setSpotifyExpiresAt } =
    spotifySlice.actions;

  /* useEffect(() => {
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
          dispatch(
            setSpotifyExpiresAt(Date.now() + res.data.expires_in * 1000 - 10000)
          );
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
  }, [accessCode]); */

  if (accessCode != null) {
    const { data, isLoading, isFetching, isSuccess } =
      useCallbackQuery(accessCode);

    if (isSuccess) {
      dispatch(setSpotifyAccessCode(data.access_token));
      dispatch(setSpotifyRefreshCode(data.refresh_token));
      dispatch(
        setSpotifyExpiresAt(Date.now() + data.expires_in * 1000 - 10000)
      );
      window.history.pushState({}, "", "/");
    }

    if (isFetching || isLoading) {
      return (
        <div>
          <FaSpinner />
          <p>Logging you in...</p>
        </div>
      );
    }
  }
  return (
    <div>
      <p>some return</p>
    </div>
  );
};

export default LoginCallback;
