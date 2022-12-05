import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
  Dashboard,
  Albums,
  Album,
  Artist,
  Artists,
  Playlist,
  Playlists,
  Search,
  Me,
  Default,
} from "./pages";
import "./app.css";
import { useSelector } from "react-redux";
import appSlice from "./redux/slices/globalApp";
import LoginCallback from "./session/LoginCallback";
import axios from "axios";
import spotifySlice from "./redux/slices/spotifyAuth";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchAllPlaylists } from "./redux/slices/spotifyPlaylists";
import { useTestQuery } from "./redux/api/auth";

function App() {
  //Redux
  const dispatch = useAppDispatch();
  const { setScreenWidth, setNavActive } = appSlice.actions;
  const { setSpotifyAccessCode, setSpotifyExpiresAt, setSpotifyRefreshCode } =
    spotifySlice.actions;
  const { screenWidth, navActive } = useAppSelector((state: any) => state.app);
  const { spotify_access_code, spotify_refresh_code, spotify_token_expiresAt } =
    useAppSelector((state: any) => state.spotify);

  const { data, status, error, refetch } = useTestQuery("hi");

  if (spotify_refresh_code) {
    /* const { data, status, error, refetch } = useReauthQuery(
      spotify_refresh_code,
      {
        pollingInterval: 1800000,
      }
    ); */
    /* if (data) {
      dispatch(setSpotifyAccessCode(data.access_token));
      dispatch(
        setSpotifyExpiresAt(Date.now() + data.expires_in * 1000 - 10000)
      );
    } */
  }

  /* useEffect(() => {
    if (spotify_refresh_code) {
      const controller: AbortController = new AbortController();
      const signal: AbortSignal = controller.signal;
      const performLogin = async () => {
        await axios
          .get(
            `http://localhost:5001/spotify-react-ts-vite/us-central1/app/refresh_token?refreshToken=${spotify_refresh_code}`,
            { signal: signal }
          )
          .then((res) => {
            dispatch(setSpotifyAccessCode(res.data.access_token));
            dispatch(
              setSpotifyExpiresAt(
                Date.now() + res.data.expires_in * 1000 - 10000
              )
            );
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
    }
  }, []);

  useEffect(() => {
    if (spotify_access_code) {
      const timeout = setInterval(() => {
        if (Date.now() > spotify_token_expiresAt - 30000) {
          axios
            .get(
              `http://localhost:5001/spotify-react-ts-vite/us-central1/app/refresh_token?refreshToken=${spotify_refresh_code}`
            )
            .then((res) => {
              dispatch(setSpotifyAccessCode(res.data.access_token));
              dispatch(
                setSpotifyExpiresAt(
                  Date.now() + res.data.expires_in * 1000 - 10000
                )
              );
            });
        }
      }, 10000);

      return () => clearInterval(timeout);
    }
  }, [spotify_refresh_code, spotify_access_code]); */

  useEffect(() => {
    if (spotify_access_code) {
      const abortCtrl = new AbortController();
      const opts = { signal: abortCtrl.signal };
      dispatch(
        fetchAllPlaylists({
          apiUrl: `http://localhost:5001/spotify-react-ts-vite/us-central1/app/allPlaylists?accessToken=${spotify_access_code}`,
          opts: opts,
        })
      );
      return () => {
        abortCtrl.abort();
      };
    }
  }, [dispatch, spotify_access_code]);

  if (!spotify_access_code || spotify_access_code === "") {
    return (
      <div className="flex h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Default />}>
              <Route
                index
                element={
                  <>
                    <p>Not signed in</p>
                  </>
                }
              />
              <Route path="/loginCallback" element={<LoginCallback />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    );
  }
  //We are logged in!
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Default />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<Search />} />
          <Route path="playlists" element={<Playlists />} />
          <Route path="playlist/:playlistId" element={<Playlist />} />
          <Route path="artists" element={<Artists />} />
          <Route path="artist" element={<Artist />} />
          <Route path="albums" element={<Albums />} />
          <Route path="album" element={<Album />} />
          <Route path="me" element={<Me />} />
          <Route path="loginCallback" element={<Navigate replace to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
