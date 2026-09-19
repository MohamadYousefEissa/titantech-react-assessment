import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { UserDetails, UsersApiResponse } from "@/@types/user";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_API_URL}/users`,
  }),
  endpoints: (builder) => ({
    searchForUsers: builder.query<
      UsersApiResponse,
      {
        limit?: number;
        skip?: number;
        search: string;
      }
    >({
      query: ({ limit, skip, search }) => {
        const params = new URLSearchParams();

        if (limit) params.set("limit", limit.toString());
        if (skip) params.set("skip", skip.toString());
        if (search) params.set("q", search.toString());

        return `search?${params.toString()}`;
      },
    }),

    getSingleUser: builder.query<UserDetails, { id: string }>({
      query: ({ id }) => id,
    }),
  }),
});

export const { useGetSingleUserQuery, useSearchForUsersQuery } = usersApi;
