import { FaPlayCircle, FaRegClock } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import { convertMsToTime, formatUTCDateToISO } from "../helpers/datetime";
import { useSinglePlaylistQuery } from "../redux/api/spotify";

const Playlist = () => {
  const params = useParams();
  const {
    data: playlist,
    isError,
    isLoading,
    isFetching,
  } = useSinglePlaylistQuery(params.playlistId);

  if (isLoading || isFetching) {
    return <Spinner />;
  }

  if (playlist) {
    const totalTrackLength = playlist.tracks.items.reduce((sum, track) => {
      return (sum += track.track.duration_ms);
    }, 0);

    const convertedTotalTrackLength: string = convertMsToTime(
      Number(totalTrackLength)
    );

    return (
      <div className="h-full justify-center flex flex-col">
        <div className="w-full">
          <div className="pt-4 pb-4 flex flex-col lg:flex-row">
            <img
              className="w-56 mx-8 aspect-square shadow-xl self-center"
              src={playlist.images[0]?.url}
            />
            <div className="w-full lg:w-5/6 px-4 flex flex-col justify-around items-start">
              <span className="py-2 font-semibold">
                {playlist.public ? "Public Playlist" : "Private Playlist"}
              </span>
              <h1 className="line-clamp-1 break-words text-3xl my-2">
                {playlist.name}
              </h1>
              <p className="line-clamp-2">{playlist.description}</p>
              <span className="py-2">
                {/* TODO follower and track counts needs to have seperators added */}
                {playlist.followers.total} likes, {playlist.tracks.total} songs,{" "}
                <span className="font-thin">{convertedTotalTrackLength}</span>
              </span>
            </div>
          </div>
        </div>

        <div className="w-full min-h-[calc(66.66%_-_3.5rem)] flex flex-col">
          <div className="w-full h-14">controls</div>
          <div className="w-full flex flex-col">
            <table
              role="table"
              className="w-11/12 m-auto grid border-collapse gap-1 grid-cols-[15px_1fr] sm:grid-cols-[15px__1fr_1fr_75px] xl:grid-cols-[15px_minmax(200px,_2fr)_1fr_1fr_1fr_75px]"
            >
              <thead role="rowgroup" className="contents border-b">
                <tr role="row" className="contents">
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-2 py-4 text-left"
                  >
                    #
                  </th>
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-6 py-4 text-left"
                  >
                    Title
                  </th>
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-6 py-4 text-left hidden sm:table-cell"
                  >
                    Album
                  </th>
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-6 py-4 text-left hidden xl:table-cell"
                  >
                    Added By
                  </th>
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-6 py-4 text-left hidden xl:table-cell"
                  >
                    Date Added
                  </th>
                  <th
                    role="columnheader"
                    className="text-sm uppercase font-medium px-2 py-4 hidden sm:table-cell"
                  >
                    <div className=" md:flex flex-row justify-center items-center content-center flex-wrap">
                      <FaRegClock />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody role="rowgroup" className="contents">
                {playlist.tracks.items.map((tracks, index) => {
                  const { added_at, added_by } = tracks;
                  const { name, album, duration_ms, artists } = tracks.track;
                  const albumThumb = album.images.filter((image) => {
                    return image.height === 64;
                  })[0];
                  return (
                    <tr role="row" className="contents border-b" key={index}>
                      <td
                        role="cell"
                        className="px-2 py-2 text-sm font-medium "
                      >
                        <div className="flex flex-row items-center h-full">
                          <span>{index + 1}</span>
                        </div>
                      </td>
                      <td role="cell" className="text-sm font-light px-6 py-2">
                        <div className="flex flex-row items-center">
                          <div className="min-w-[48px] aspect-square group relative">
                            <img
                              src={albumThumb?.url}
                              className="object-cover w-full"
                            />
                            <div
                              id="overlay"
                              className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-indigo-700 opacity-0 group-hover:h-full group-hover:opacity-100"
                            >
                              {/* TODO onClick handle, sizing?
                               */}
                              <FaPlayCircle />
                            </div>
                          </div>
                          <div className="flex flex-col ml-4">
                            <p>{name}</p>
                            {/* TODO This should be the result of reducing the array for multiple artists
                             */}
                            {/* TODO Also need to make individual links
                             */}
                            <span>{artists[0].name}</span>
                          </div>
                        </div>
                      </td>
                      <td
                        role="cell"
                        className="text-sm font-light px-6 py-2 hidden sm:table-cell"
                      >
                        <div className="flex flex-row items-center h-full">
                          {/*TODO Also need to make album link
                           */}
                          <span>{album.name}</span>
                        </div>
                      </td>
                      <td
                        role="cell"
                        className="text-sm font-light px-6 py-2 hidden xl:table-cell"
                      >
                        <div className="flex flex-row items-center h-full">
                          <span>{added_by.id}</span>
                        </div>
                      </td>
                      <td
                        role="cell"
                        className="text-sm font-light px-6 py-2 hidden xl:table-cell"
                      >
                        <div className="flex flex-row items-center h-full">
                          <span>
                            {formatUTCDateToISO(added_at).toLocaleDateString()}
                          </span>
                        </div>
                      </td>
                      <td
                        role="cell"
                        className="text-sm font-light px-2 py-2 hidden sm:table-cell"
                      >
                        <div className="flex flex-row items-center h-full">
                          <span>{convertMsToTime(Number(duration_ms))}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p>...ERROR LOADING PLAYLISTS</p>
    </div>
  );
};

export default Playlist;
