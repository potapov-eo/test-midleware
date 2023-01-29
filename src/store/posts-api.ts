import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const currentEndpoints = (builder:  EndpointBuilder<any,any,any>) =>({
    getPosts: builder.query<any, any>({
        query: (args) => ({ url: `https://jsonplaceholder.typicode.com/posts` }),
    }),

})

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({ baseUrl: ''}),
    endpoints: currentEndpoints
});

export const {
    useGetPostsQuery
} = postsApi;
