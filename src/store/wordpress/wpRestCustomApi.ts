import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpCustomAPI = createApi({
    reducerPath: 'wpCustomAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp/' }),

    endpoints: (build) => ({
        fetchAllCreativesByVotes: build.query({
            query: (params) => ({
                url: '/creative/votes',
                params: {
                    ...params,
                    apiPath: 'custom'
                }
            }),
        }),
        fetchUpdateVoteVideo: build.mutation({
            query: (params) => ({
                url: '/creative/vote',
                method: 'POST',
                params: {
                    ...params,
                    apiPath: 'custom'
                }
            }),
        }),
        fetchUnvoteCreative: build.mutation({
            query: (params) => ({
                url: '/creative/unvote',
                method: 'POST',
                params: {
                    ...params,
                    apiPath: 'custom'
                }
            }),
        })
    }),
})

export const
    {
        useFetchAllCreativesByVotesQuery,
        useLazyFetchAllCreativesByVotesQuery,
        useFetchUpdateVoteVideoMutation,
        useFetchUnvoteCreativeMutation
    } = wpCustomAPI;