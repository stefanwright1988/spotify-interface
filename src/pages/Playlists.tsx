import { useAppSelector } from "../hooks/reduxHooks";
import { IPlaylist } from "../types/playlistTypes";
import { Link } from "react-router-dom";
import { GiMusicalNotes } from "react-icons/gi";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { CgPlayButtonO } from "react-icons/cg";

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
    <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-4 px-12 py-6">
      {playlistsFetchState.playlists.items?.map(
        (playlist: IPlaylist, index: number) => {
          return (
            <div
              key={index}
              className="flex text-white text-2xl flex-col justify-end p-3 rounded-md overflow-hidden bg-gray-900 hover:bg-gray-700 group "
            >
              <div className="shadow-xl relative">
                {/* TODO Fix when no image
                 */}
                {playlist.images[0] ? (
                  <img
                    className="w-full aspect-square "
                    src={playlist.images[0]?.url}
                  />
                ) : (
                  <div className="w-full aspect-square flex items-center content-center justify-center bg-gray-500">
                    <GiMusicalNotes />
                  </div>
                )}
                <div
                  className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-40 bg-gray-900
                  "
                ></div>
                <div
                  className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center opacity-0 group-hover:h-full group-hover:opacity-100
                  "
                >
                  {/* TODO onClick handle, sizing?
                   */}

                  <div className="absolute bottom-2 right-2 rounded-full h-12 aspect-square bg-green-400">
                    <div className="flex items-center justify-center content-center w-full h-full">
                      <Link to={`/playlist/${playlist.id}`}>
                        <CgPlayButtonO size="2em" color="black" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full h-16">
                <p className=" text-14 font-bold truncate">
                  <Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link>
                </p>
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
