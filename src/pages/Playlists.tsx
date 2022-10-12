import { fetchAllPlaylists } from "../redux/slices/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import store, { AppDispatch } from "../redux/store";

const Playlists = () => {
  const state = useSelector((state: any) => state.playlists);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    store.dispatch(
      fetchAllPlaylists("https://jsonplaceholder.typicode.com/posts/1")
    );
  }, [dispatch]);

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
              {[
                { name: 1, comment: 2 },
                { name: 1, comment: 2 },
                { name: 1, comment: 2 },
                { name: 1, comment: 2 },
                { name: 1, comment: 2 },
              ].map((playlist, index) => {
                const oddRowclassName =
                    "bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6",
                  evenRowClassName =
                    "bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6";
                return (
                  <div
                    className={
                      index % 2 === 0 ? evenRowClassName : oddRowclassName
                    }
                  >
                    <div className="text-sm font-medium text-gray-500">
                      {playlist.name}
                    </div>
                    <div className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {playlist.comment}
                    </div>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlists;
