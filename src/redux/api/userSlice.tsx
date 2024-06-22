import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://frontend-test-assignment-api.abz.agency/api/v1",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: ({ page }) => `users?page=${page}&count=6`,
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },
      merge: (currentCache, newItems) => {
        currentCache?.users?.push(...newItems?.users);
      },
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getPositions: builder.query({
      query: () => "positions",
    }),
    createNewUser: builder.mutation({
      query: ({ token, formData }) => ({
        url: `users`,
        method: "POST",
        headers: {
          Token: token,
        },
        body: formData,
      }),
      onQueryStarted: async ({ dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          usersApi.util.updateQueryData("getUsers", undefined, (draft) => {
            draft.users = [];
          }),
        );

        try {
          await queryFulfilled;
        } catch {
          // Undo if there were any mutation errors
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetPositionsQuery,
  useCreateNewUserMutation,
} = usersApi;
