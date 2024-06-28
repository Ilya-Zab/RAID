import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wpUser = createApi({
    reducerPath: 'wpUser',
    baseQuery: fetchBaseQuery({ baseUrl: `https://raid.digiway-dev.online/wp-json/wp/v2` }),
    endpoints: (build) => ({
        fetchUserData: build.query({
            query: (accessToken) => ({
                url: '/users/me',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                },
            }),
        }),
    }),
})

export const
    {
        useLazyFetchUserDataQuery,
        useFetchUserDataQuery,
    } = wpUser;