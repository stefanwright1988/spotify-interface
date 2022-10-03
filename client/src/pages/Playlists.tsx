import { fetchAllPlaylists } from "../redux/slices/playlists";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch } from "../redux/store";

const Playlists = () => {
  const state = useSelector((state: any) => state.playlists);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllPlaylists("https://jsonplaceholder.typicode.com/posts/1"));
  }, [dispatch]);

  return <div>{state.data?.body}</div>;
};

export default Playlists;
