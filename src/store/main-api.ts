import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const mainApi = createApi({
    reducerPath: 'mainApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com/users'}),
    endpoints: (builder) => ({
        getUsers: builder.query<any, any>({
            query: (args) => ({ url: `` }),
        }),
    }),
});

export const {
useGetUsersQuery
} = mainApi;
