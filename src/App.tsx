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
import { spotifyApi, useTestQuery } from "./redux/api/spotify";
import { useAllPlaylistsQuery } from "./redux/api/spotify";
import UserMiddleware from "./middleware/UserMiddleware";

function App() {
  //Redux
  const dispatch = useAppDispatch();
  const { setScreenWidth, setNavActive } = appSlice.actions;
  const { setSpotifyAccessCode, setSpotifyExpiresAt, setSpotifyRefreshCode } =
    spotifySlice.actions;
  const { screenWidth, navActive } = useAppSelector((state: any) => state.app);
  const { spotify_access_code, spotify_refresh_code, spotify_token_expiresAt } =
    useAppSelector((state: any) => state.spotify);
  spotifyApi.endpoints.getUser.useQuery(null, {
    skip: !spotify_refresh_code,
  });

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
  //We are logged in!
  if (!spotify_access_code) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route path="/loginCallback" element={<LoginCallback />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
  return (
    <BrowserRouter>
      <UserMiddleware>
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
      </UserMiddleware>
    </BrowserRouter>
  );
}

export default App;
