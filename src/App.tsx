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
  Login,
} from "./pages";
import "./app.css";
import LoginCallback from "./session/LoginCallback";
import { useAppSelector } from "./hooks/reduxHooks";
import UserMiddleware from "./middleware/UserMiddleware";

function App() {
  //Redux
  const { spotify_access_code, spotify_refresh_code, spotify_token_expiresAt } =
    useAppSelector((state: any) => state.spotify);

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

  if (!spotify_access_code || spotify_access_code === "") {
    return (
      <BrowserRouter>
        <UserMiddleware>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/loginCallback" element={<LoginCallback />} />
          </Routes>
        </UserMiddleware>
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
