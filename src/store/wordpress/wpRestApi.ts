import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpAPI = createApi({
    reducerPath: 'wpAPI',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/wp' }),

    endpoints: (build) => ({
        fetchUser: build.query({
            query: (params) => ({
                url: '/users',
                params,
            }),
        }),
        fetchAllCreativesByData: build.query({
            query: (params) => ({
                url: '/creative',
                params,
            }),
        }),
        registerUser: build.mutation({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                body: credentials,
            })
        }),
        postVideo: build.mutation({
            query: (params: { video: Buffer, videoFileName: string }) => ({
                url: '/media',
                method: 'POST',
                body: params.video,
                headers: {
                    "Content-Type": "video/mp4",
                    "Content-Disposition": `    attachment; filename="${params.videoFileName}"`
                }
            })
        })
    }),
})

export const
    {
        useLazyFetchUserQuery,
        useRegisterUserMutation,
        usePostVideoMutation,
        useFetchAllCreativesByDataQuery,
    } = wpAPI;