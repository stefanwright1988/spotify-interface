import { FaSpinner } from "react-icons/fa";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import spotifySlice from "../redux/slices/spotifyAuth";
import { useAppDispatch } from "../hooks/reduxHooks";
import { useCallbackQuery } from "../redux/api/spotify";

const LoginCallback = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const accessCode = searchParams.get("code");
  const { setSpotifyAccessCode, setSpotifyRefreshCode, setSpotifyExpiresAt } =
    spotifySlice.actions;

  let navigate = useNavigate();
  let location = useLocation();

  let from = location.state?.from?.pathname || "/";

  if (accessCode != null) {
    const { data, isLoading, isFetching, isSuccess } =
      useCallbackQuery(accessCode);

    if (isFetching || isLoading) {
      return (
        <div>
          <FaSpinner />
          <p>Logging you in...</p>
        </div>
      );
    }
  }

  return <Navigate to={from} replace />;
};

export default LoginCallback;
