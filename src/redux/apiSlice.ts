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
          api_key: process.env.REACT_APP_NASA_KEY as string,
        },
      }),
    }),
    getMarsPhotos: builder.query({
      query: ({ sol = 4000, camera, page = 1 }) => ({
        url: 'mars-photos/api/v1/rovers/curiosity/photos',
        params: {
          sol,
          page,
          ...(camera ? { camera } : {}),
          api_key: process.env.REACT_APP_NASA_KEY as string,
        },
      }),
    }),
  }),
});

export const { useGetSpaceImageQuery, useGetMarsPhotosQuery } = nasaApi;
