import Spinner from "../components/Spinner";
import { useFeaturedPlaylistsQuery } from "../redux/api/spotify";

const Dashboard = () => {
  const {
    data: featured,
    isLoading,
    isError,
    isSuccess,
  } = useFeaturedPlaylistsQuery();
  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <h1>An error occured</h1>;
  }
  const playlists = featured.playlists.items;
  return (
    <div className="h-full">
      <div className="flex flex-col justify-center">
        <h1>{featured.message!}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-11/12">
          {playlists.map((recent, index) => {
            return (
              <div
                key={index}
                className="flex justify-center p-6 text-2xl bg-gray-100 border-2 border-gray-300 rounded-xl"
              >
                Recent {recent.description}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
