import { IAllPlaylists, IPlaylist } from "../../types/playlistTypes";
import { api } from "./api";

export const spotifyApi = api.injectEndpoints({
  endpoints: (build) => ({
    callback: build.query<
      { access_token: string; refresh_token: string; expires_in: number },
      any
    >({
      query: (bodyContent: any) => ({
        url: "callback",
        method: "POST",
        body: bodyContent,
      }),
    }),
    refreshToken: build.query<any, void | null>({
      query: () => ({
        url: "refresh_token",
      }),
    }),
    getUser: build.query<any, void | null>({
      query: () => ({
        url: "getUser",
      }),
      providesTags: (result, error, id) => ["User"],
    }),
    allPlaylists: build.query<IAllPlaylists, void | null>({
      query: () => ({
        url: "allPlaylists",
      }),
      providesTags: (result, error, id) => ["Playlists"],
    }),
    singlePlaylist: build.query<IPlaylist, any>({
      query: (playlistId) => ({
        url: "playlist",
        params: { playlistId: playlistId },
      }),
      providesTags: (result, error, id) => [{ type: "Playlist", id }],
    }),
    recentlyPlayed: build.query<IPlaylist, any>({
      query: (dateMinusSeven) => ({
        url: "recentlyPlayed",
        params: { playedAfter: dateMinusSeven },
      }),
    }),
    test: build.query({
      query: () => ({
        url: "hello",
      }),
    }),
  }),
});

export const {
  useCallbackQuery,
  useRefreshTokenQuery,
  useTestQuery,
  useAllPlaylistsQuery,
  useSinglePlaylistQuery,
  useGetUserQuery,
  useRecentlyPlayedQuery,
} = spotifyApi;

export const {
  endpoints: { callback },
} = spotifyApi;
