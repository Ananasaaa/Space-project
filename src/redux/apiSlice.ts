import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const nasaApi = createApi({
  reducerPath: 'nasaApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.nasa.gov/',
  }),
  endpoints: (builder) => ({
    getSpaceImage: builder.query({
      query: () => ({
        url: 'planetary/apod',
        params: {
          api_key: 'LrQU3R7RaU85NAm7kxkfIrP6fESwdMcEgsWJg7XC',
        },
      }),
    }),
    getMarsPhotos: builder.query({
      query: ({ sol = 1000, camera, page = 1 }) => ({
        url: 'mars-photos/api/v1/rovers/curiosity/photos',
        params: {
          sol,
          page,
          ...(camera ? { camera } : {}),
          api_key: 'LrQU3R7RaU85NAm7kxkfIrP6fESwdMcEgsWJg7XC',
        },
      }),
    }),
  }),
});

export const { useGetSpaceImageQuery, useGetMarsPhotosQuery } = nasaApi;
