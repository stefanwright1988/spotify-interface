import { CgPlayButtonO } from "react-icons/cg";
import { GiMusicalNotes } from "react-icons/gi";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  spotifyApi,
  useFeaturedPlaylistsQuery,
  useGetRelatedArtistsQuery,
  useGetTopArtistsAndGenresQuery,
  useRecentGenrePlaylistsQuery,
} from "../redux/api/spotify";
import { RootState, useTypedSelector } from "../redux/store";

const Dashboard = () => {
  const {
    spotify_access_code: accessToken,
    spotify_refresh_code: refreshToken,
  } = useTypedSelector((state: RootState) => state.spotify);

  const {
    data: featuredData,
    isLoading: featuredLoading,
    isError: featuredError,
    isSuccess: featuredSuccess,
    isUninitialized: featuredUninitialized,
  } = useFeaturedPlaylistsQuery(undefined, { skip: !accessToken });
  const {
    data: topArtistsData,
    isLoading: topArtistsLoading,
    isError: topArtistsError,
    isSuccess: topArtistsSuccess,
    isUninitialized: topArtistsUninitialized,
  } = useGetTopArtistsAndGenresQuery(undefined, { skip: !accessToken });
  const {
    data: recentGenrePlaylistsData,
    isLoading: recentGenrePlaylistsLoading,
    isError: recentGenrePlaylistsError,
    isSuccess: recentGenrePlaylistsSuccess,
    isUninitialized: recentGenrePlaylistsUninitialized,
  } = useRecentGenrePlaylistsQuery(topArtistsData, {
    skip: !accessToken || !topArtistsData,
  });
  const {
    data: relatedArtistsData,
    isLoading: relatedArtistsLoading,
    isError: relatedArtistsError,
    isSuccess: relatedArtistsSuccess,
    isUninitialized: relatedArtistsUninitialized,
  } = useGetRelatedArtistsQuery(topArtistsData, {
    skip: !accessToken || !topArtistsData,
  });
  if (
    featuredLoading ||
    recentGenrePlaylistsLoading ||
    topArtistsLoading ||
    relatedArtistsLoading
  ) {
    return <Spinner />;
  }
  if (
    featuredError ||
    recentGenrePlaylistsError ||
    topArtistsError ||
    relatedArtistsError
  ) {
    return <h1>An error occured</h1>;
  }

  const featuredPlaylists = featuredData.playlists.items,
    recentGenrePlaylists = recentGenrePlaylistsData,
    relatedArtists = relatedArtistsData;
  return (
    <div className="h-full">
      <div className="flex flex-col justify-center px-6 ">
        <div>
          <h1 className="text-3xl">{featuredData.message!}</h1>

          <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-5 py-6 grid-rows-1">
            {featuredPlaylists.map((playlist, index) => {
              if (index < 6)
                return (
                  <div
                    key={index}
                    className="flex text-black text-2xl flex-col justify-end p-3 rounded-md overflow-hidden bg-[#00EEE4] group border-black border-2"
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
                        <Link to={`/playlist/${playlist.id}`}>
                          {playlist.name}
                        </Link>
                      </p>

                      <p className="text-14 line-clamp-2 leading-4">
                        {playlist.description ||
                          `By ${playlist.owner.display_name}`}
                      </p>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
        {Object.keys(recentGenrePlaylists).map((key, index) => {
          return (
            <div key={index}>
              <h1 className="text-3xl">
                Because you recently listened to{" "}
                <span className="capitalize">
                  {recentGenrePlaylists[key]["name"]}
                </span>
              </h1>
              <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-5 py-6">
                {recentGenrePlaylists[key]["playlists"].items.map(
                  (recent, index) => {
                    if (index < 6)
                      return (
                        <div
                          key={index}
                          className="flex text-black text-2xl flex-col justify-end p-3 rounded-md overflow-hidden bg-[#00EEE4] hover:bg-gray-700 group border-black border-2"
                          style={{ boxShadow: "5px 5px black" }}
                        >
                          <div
                            className="relative rounded-md border-black border-2 overflow-hidden "
                            style={{
                              boxShadow: "5px 5px black",
                              background: `url(${recent.images[0]?.url})`,
                              backgroundSize: "cover",
                              aspectRatio: "1/1",
                            }}
                          >
                            {/* TODO Fix when no image
                             */}
                            {recent.images[0] ? (
                              <img
                                className="w-full aspect-square "
                                src={recent.images[0]?.url}
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
                                  <Link to={`/playlist/${recent.id}`}>
                                    <CgPlayButtonO size="2em" color="black" />
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full h-16">
                            <p className=" text-14 font-bold truncate">
                              <Link
                                to={`/playlist/${recent.id}`}
                                className="capitalize"
                              >
                                {recent.name}
                              </Link>
                            </p>
                          </div>
                        </div>
                      );
                  }
                )}
              </div>
            </div>
          );
        })}
        <div>
          <h1 className="text-3xl">
            Because you listened to {relatedArtistsData.queryArtist}
          </h1>
          <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-5 py-6 grid-rows-1">
            {relatedArtistsData.artists.map((artist, index) => {
              if (index < 6)
                return (
                  <div
                    key={index}
                    className="flex text-black text-2xl flex-col justify-end p-3 rounded-md overflow-hidden bg-[#00EEE4] hover:bg-gray-700 group border-black border-2"
                    style={{ boxShadow: "5px 5px black" }}
                  >
                    <div
                      className="relative rounded-md border-black border-2 overflow-hidden "
                      style={{
                        boxShadow: "5px 5px black",
                        background: `url(${artist.images[0]?.url})`,
                        backgroundSize: "cover",
                        aspectRatio: "1/1",
                      }}
                    >
                      {/* TODO Fix when no image
                       */}
                      {artist.images[0] ? (
                        <img
                          className="w-full aspect-square "
                          src={artist.images[0]?.url}
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
                            <Link to={`/playlist/${artist.id}`}>
                              <CgPlayButtonO size="2em" color="black" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-16">
                      <p className=" text-14 font-bold truncate">
                        <Link to={`/playlist/${artist.id}`}>{artist.name}</Link>
                      </p>
                    </div>
                  </div>
                );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
