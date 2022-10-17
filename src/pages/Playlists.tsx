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
    <div className="h-full">
      <div className="pt-14 flex justify-center">
        <div className="rounded-xl w-full p-8 pt-9 m-3 flex justify-center overflow-hidden">
          <div className=" w-full">
            <div className="flex justify-center">
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-6 w-full">
                {playlistState.data.items?.map(
                  (playlist: PlaylistAttributes, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex text-white text-2xl flex-col justify-end bg-zinc-800 p-3 rounded-xl w-full overflow-hidden"
                      >
                        <div className="shadow-lg">
                          <img
                            className="w-full aspect-square "
                            src={playlist.images[0]?.url}
                          />
                        </div>
                        <div className="w-full h-16">
                          <p className=" text-14 font-bold truncate">
                            {playlist.name}
                          </p>
                          <p className="text-14 line-clamp-2 leading-4">
                            {playlist.description ||
                              `By ${playlist.owner.display_name}`}
                          </p>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
