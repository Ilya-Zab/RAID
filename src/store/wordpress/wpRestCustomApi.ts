import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpCustomAPI = createApi({
    reducerPath: 'wpCustomAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://wordpress.wefinallyplayedit.com/wp-json' }),

    endpoints: (build) => ({
        fetchAllCreativesByVotes: build.query({
            query: (params) => ({
                url: '/creative/votes',
                params,
            }),
        }),
        fetchUpdateVoteVideo: build.mutation({
            query: (params) => ({
                url: '/creative/vote',
                method: 'POST',
                params,
            }),
        }),
        fetchUnvoteCreative: build.mutation({
            query: (params) => ({
                url: '/creative/unvote',
                method: 'POST',
                params,
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