import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    callback: build.mutation<{ token: string }, any>({
      query: (bodyContent: any) => ({
        url: "callback",
        method: "POST",
        body: bodyContent,
      }),
    }),
  }),
});

export const { useCallbackMutation } = authApi;

export const {
  endpoints: { callback },
} = authApi;
