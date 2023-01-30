import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';


export const rootApi = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({ baseUrl: ''}),
    endpoints: (builder) => ({
        getAlbums: builder.query<any, any>({
            query: (args) => ({ url: `https://jsonplaceholder.typicode.com/albums` }),
        }),
    }),
});

export const {
useGetAlbumsQuery
} = rootApi;
