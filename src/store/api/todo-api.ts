import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com/todos'}),
    endpoints: (builder) => ({
        getTodo: builder.query<any, any>({
            query: (args) => ({url: ``}),
        }),
    }),
});

export const {
    useGetTodoQuery
} = todoApi;
