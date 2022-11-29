import { api } from "./api";

export const authApi = api.injectEndpoints({
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
  }),
});

export const { useCallbackQuery } = authApi;

export const {
  endpoints: { callback },
} = authApi;