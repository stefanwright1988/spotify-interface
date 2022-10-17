import { fetchAllPlaylists } from "../redux/slices/spotifyPlaylists";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { PlaylistAttributes } from "../types/playlistTypes";

const Playlists = () => {
  const playlistState = useAppSelector((state: any) => state.playlists);
  const { spotify_access_code } = useAppSelector((state: any) => state.spotify);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortCtrl = new AbortController();
    const opts = { signal: abortCtrl.signal };
    dispatch(
      fetchAllPlaylists({
        apiUrl: `http://localhost:5001/spotify-react-ts-vite/us-central1/app/playlists?accessToken=${spotify_access_code}`,
        opts: opts,
      })
    );
    return () => {
      abortCtrl.abort();
    };
  }, [dispatch]);

  if (playlistState.fetchState === "loading") {
    return (
      <div>
        <p>...LOADING PLAYLISTS</p>
      </div>
    );
  }

  if (playlistState.fetchState === "error") {
    return (
      <div>
        <p>...ERROR LOADING PLAYLISTS</p>
      </div>
    );
  }

  return (
    <div className="h-full bg-slate-300">
      <div className="pt-14 flex justify-center">
        <div className="bg-secondary-dark-bg rounded-xl w-11/12 p-8 pt-9 m-3 flex justify-center">
          <div className="border-t border-gray-200 w-full">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <div className="text-sm font-medium text-gray-500">One</div>
                <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                  Two
                </div>
              </div>
              {playlistState.data.items?.map(
                (playlist: PlaylistAttributes, index: number) => {
                  const oddRowclassName =
                      "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
                    evenRowClassName =
                      "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6";
                  return (
                    <div
                      className={
                        index % 2 === 0 ? evenRowClassName : oddRowclassName
                      }
                      key={index}
                    >
                      <div className="text-sm font-medium text-gray-500">
                        {playlist.name}
                      </div>
                      <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                        {playlist.description}
                      </div>
                    </div>
                  );
                }
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
