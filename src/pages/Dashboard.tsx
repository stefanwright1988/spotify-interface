import { CgPlayButtonO } from "react-icons/cg";
import { GiMusicalNotes } from "react-icons/gi";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import {
  spotifyApi,
  useFeaturedPlaylistsQuery,
  useGetTopArtistsQuery,
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
  } = useGetTopArtistsQuery(undefined, { skip: !accessToken });
  const {
    data: recentGenrePlaylistsData,
    isLoading: recentGenrePlaylistsLoading,
    isError: recentGenrePlaylistsError,
    isSuccess: recentGenrePlaylistsSuccess,
    isUninitialized: recentGenrePlaylistsUninitialized,
  } = useRecentGenrePlaylistsQuery(topArtistsData, {
    skip: !accessToken || !topArtistsData,
  });
  if (featuredLoading || recentGenrePlaylistsLoading || topArtistsLoading) {
    return <Spinner />;
  }
  if (featuredError || recentGenrePlaylistsError) {
    return <h1>An error occured</h1>;
  }

  const featuredPlaylists = featuredData.playlists.items;
  const recentGenrePlaylists = recentGenrePlaylistsData;
  return (
    <div className="h-full">
      <div className="flex flex-col justify-center px-6 ">
        <h1 className="text-3xl">{featuredData.message!}</h1>

        <div className="scrollable-cards py-6">
          {featuredPlaylists.map((playlist, index) => {
            return (
              <div
                key={index}
                className="card flex text-white text-2xl flex-col justify-end p-3 rounded-xl overflow-hidden bg-gray-900 hover:bg-gray-700 group shadow-md shadow-black"
              >
                <div className="relative rounded-3xl overflow-hidden">
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
                </div>
              </div>
            );
          })}
        </div>
        {Object.keys(recentGenrePlaylists).map((key) => {
          return (
            <>
              <h1 className="text-3xl">
                Because you recently listened to{" "}
                <span className="capitalize">
                  {recentGenrePlaylists[key]["name"]}
                </span>
              </h1>
              <div className="scrollable-cards grid gap-5 py-6">
                {recentGenrePlaylists[key]["playlists"].items.map(
                  (recent, index) => {
                    return (
                      <div
                        key={index}
                        className="card flex text-white text-2xl flex-col justify-end p-3 rounded-xl overflow-hidden bg-gray-900 hover:bg-gray-700 group shadow-md shadow-black"
                      >
                        <div className="relative rounded-3xl overflow-hidden">
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
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
