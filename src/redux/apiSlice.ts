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
    getMarsWeather: builder.query({
      query: () => ({
        url: 'insight_weather/',
        params: {
          api_key: process.env.REACT_APP_NASA_KEY as string,
          feedtype: 'json',
          ver: '1.0',
        },
      }),
    }),
    getNasaNotifications: builder.query({
      query: ({ startDate, endDate }) => ({
        url: 'DONKI/notifications',
        params: {
          startDate,
          endDate,
          type: 'all',
          api_key: process.env.REACT_APP_NASA_KEY as string,
        },
      }),
    }),
    getLastSevenImg: builder.query({
      query: () => {
        const endDate = new Date();
        const startDate = new Date();
        startDate.setDate(endDate.getDate() - 6);

        const formatDate = (date: Date) => date.toISOString().split('T')[0];

        return {
          url: 'planetary/apod',
          params: {
            api_key: process.env.REACT_APP_NASA_KEY as string,
            start_date: formatDate(startDate),
            end_date: formatDate(endDate),
          },
        };
      },
    }),
  }),
});

export const {
  useGetSpaceImageQuery,
  useGetMarsPhotosQuery,
  useGetMarsWeatherQuery,
  useGetNasaNotificationsQuery,
  useGetLastSevenImgQuery,
} = nasaApi;
