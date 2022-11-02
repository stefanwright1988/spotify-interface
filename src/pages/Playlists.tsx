import { useAppSelector } from "../hooks/reduxHooks";
import { IPlaylist } from "../types/playlistTypes";
import { Link } from "react-router-dom";

const Playlists = () => {
  const playlistsFetchState = useAppSelector((state: any) => state.playlists);

  if (playlistsFetchState.fetchState === "loading") {
    return (
      <div>
        <p>...LOADING PLAYLISTS</p>
      </div>
    );
  }

  if (playlistsFetchState.fetchState === "error") {
    return (
      <div>
        <p>...ERROR LOADING PLAYLISTS</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-6 px-12 py-6">
      {playlistsFetchState.playlists.items?.map(
        (playlist: IPlaylist, index: number) => {
          return (
            <div
              key={index}
              className="flex text-white text-2xl flex-col justify-end bg-zinc-800 p-3 rounded-xl overflow-hidden"
            >
              <div className="shadow-lg">
                <img
                  className="w-full aspect-square "
                  src={playlist.images[0]?.url}
                />
                <Link to={`/playlist/${playlist.id}`}>Play</Link>
              </div>
              <div className="w-full h-16">
                <p className=" text-14 font-bold truncate">{playlist.name}</p>
                <p className="text-14 line-clamp-2 leading-4">
                  {playlist.description || `By ${playlist.owner.display_name}`}
                </p>
              </div>
            </div>
          );
        }
      )}
    </div>
  );
};

export default Playlists;
