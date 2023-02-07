import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";

export const currentPostsEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
    getPosts: builder.query<any, any>({
        query: (args) => ({url: `https://jsonplaceholder.typicode.com/posts`}),
    }),

})
export const currentPhotoEndpoints = (builder: EndpointBuilder<any, any, any>) => ({
    getPhotos: builder.query<any, any>({
        query: (args) => ({url: `https://jsonplaceholder.typicode.com/photos`}),
    }),

})

export const postsApi = createApi({
    reducerPath: 'rootApi',
    baseQuery: fetchBaseQuery({baseUrl: ''}),
    endpoints: currentPostsEndpoints
}).injectEndpoints({endpoints: currentPhotoEndpoints});

export const {
    useGetPostsQuery,
    useGetPhotosQuery
} = postsApi;
