import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ipApi = createApi({
    reducerPath: 'ipApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://ipapi.co' }),
    endpoints: (build) => ({
        fetchUserCountry: build.query({
            query: () => ({
                url: '/json',
            }),
        }),
    }),
})

export const { useLazyFetchUserCountryQuery } = ipApi;
