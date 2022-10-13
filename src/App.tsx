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
import { useDispatch, useSelector } from "react-redux";
import appSlice from "./redux/slices/app";
import LoginCallback from "./session/LoginCallback";
import axios from "axios";
function App() {
  //Redux
  const dispatch = useDispatch();
  const {
    setScreenWidth,
    setNavActive,
    setSpotifyAccessCode,
    setSpotifyExpiresAt,
  } = appSlice.actions;
  const {
    screenWidth,
    navActive,
    spotify_access_code,
    spotify_refresh_code,
    spotify_token_expiresAt,
  } = useSelector((state: any) => state.app);
  useEffect(() => {
    const handleResize = () => {
      dispatch(setScreenWidth(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (screenWidth <= 900) {
      dispatch(setNavActive(false));
    } else {
      dispatch(setNavActive(true));
    }
  }, [screenWidth]);

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
  }, [spotify_refresh_code, spotify_access_code]);

  if (!spotify_access_code || spotify_access_code === "") {
    return (
      <main className="flex h-full">
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
      </main>
    );
  }
  //We are logged in!
  return (
    <main className="flex h-full">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Default />}>
            <Route index element={<Dashboard />} />
            <Route path="search" element={<Search />} />
            <Route path="playlists" element={<Playlists />} />
            <Route path="playlist" element={<Playlist />} />
            <Route path="artists" element={<Artists />} />
            <Route path="artist" element={<Artist />} />
            <Route path="albums" element={<Albums />} />
            <Route path="album" element={<Album />} />
            <Route path="me" element={<Me />} />
            <Route path="loginCallback" element={<Navigate replace to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
