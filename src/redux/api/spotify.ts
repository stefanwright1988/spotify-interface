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
    refreshUser: build.query<any, any>({
      query: () => {
        url: "refresh_token";
      },
    }),
    getUser: build.query<any, any>({
      query: () => ({
        url: "getUser",
      }),
    }),
    allPlaylists: build.query<any, void>({
      query: () => ({
        url: "allPlaylists",
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: "Playlists", id } as const)),
        { type: "Playlists" as const, id: "LIST" },
      ],
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
  useTestQuery,
  useAllPlaylistsQuery,
  useGetUserQuery,
} = spotifyApi;

export const {
  endpoints: { callback },
} = spotifyApi;
