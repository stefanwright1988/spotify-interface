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
import { Sidebar } from "./components";
import { useDispatch, useSelector } from "react-redux";
import appSlice from "./redux/slices/app";
import useAuth from "./hooks/useAuth";
import LoginCallback from "./session/LoginCallback";
const accessCode =
  new URLSearchParams(window.location.search).get("code") || "";
function App() {
  //Redux
  const dispatch = useDispatch();
  const { setScreenWidth, setNavActive } = appSlice.actions;
  const { screenWidth, navActive, spotify_access_code } = useSelector(
    (state: any) => state.app
  );
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
