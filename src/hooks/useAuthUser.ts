import { api } from "../redux/api/api";
import { spotifyApi } from "../redux/api/spotify";

export const useAuthUser = () => {
  const state = spotifyApi.endpoints.getUser.useQueryState(null);
  return state.data;
};
