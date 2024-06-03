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
        fetchUserData: build.query({
            query: (accessToken) => ({
                url: '/users/me',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
        }),
        registerUser: build.mutation({
            query: (credentials) => ({
                url: '/users',
                method: 'POST',
                body: credentials,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic YWRtaW46NjlIQSA2c2ZHIGJ2WWYgODdxcyA2ZkJhIHZFajg=',
                }
            })
        })
    }),
})

export const { useLazyFetchUserQuery, useRegisterUserMutation, useLazyFetchUserDataQuery } = wpAPI;