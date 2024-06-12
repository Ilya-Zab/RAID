import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpAPI = createApi({
    reducerPath: 'wpAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wpCustom' }),

    endpoints: (build) => ({
        fetchAllCreatives: build.query({
            query: (params) => ({
                url: '/creative',
                params,
            }),
        }),
        fetchUpdateVoteVideo: build.mutation({
            query: (params) => ({
                url: '/creative/vote',
                method: 'POST',
                params,
                header: {
                    'Content-Type': 'application/json',
                }
            }),
        }),
    }),
})

export const
    {
        useFetchAllCreativesQuery,
        useFetchUpdateVoteVideoMutation
    } = wpAPI;