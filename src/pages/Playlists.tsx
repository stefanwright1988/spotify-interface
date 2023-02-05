import { useAppSelector } from "../hooks/reduxHooks";
import { IPlaylist } from "../types/playlistTypes";
import { Link } from "react-router-dom";
import { GiMusicalNotes } from "react-icons/gi";
import { FaPlay, FaPlayCircle } from "react-icons/fa";
import { CgPlayButtonO } from "react-icons/cg";
import Spinner from "../components/Spinner";
import { useAllPlaylistsQuery } from "../redux/api/spotify";

const Playlists = () => {
  const { data: playlists, isError, isLoading } = useAllPlaylistsQuery();
  if (playlists) {
    return (
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-5 px-6 py-6">
        {playlists.items?.map((playlist: IPlaylist, index: number) => {
          return (
            <div
              key={index}
              className="flex text-black text-2xl flex-col justify-end p-3 rounded-md overflow-hidden bg-[#00eee4] hover:bg-gray-700 group border-black border-2"
              style={{ boxShadow: "5px 5px black" }}
            >
              <div
                className="relative rounded-md border-black border-2 overflow-hidden "
                style={{
                  boxShadow: "5px 5px black",
                  background: `url(${playlist.images[0]?.url})`,
                  backgroundSize: "cover",
                  aspectRatio: "1/1",
                }}
              >
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
        })}
      </div>
    );
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div>
      <p>...ERROR LOADING PLAYLISTS</p>
    </div>
  );
};

export default Playlists;
