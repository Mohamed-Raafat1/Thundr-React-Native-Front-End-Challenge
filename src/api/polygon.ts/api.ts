import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { StockTickersResponse, TickerDetails, TickerDetailsResponse } from './types';


const apiKey = 'QF9mwHVyKMxYdyNtlI77pzwjm_9Tp0QF'
export const polygonApi = createApi({
  reducerPath: 'polygonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.polygon.io/v3/' }),
  endpoints: (builder) => ({
    getStockTickers: builder.query<StockTickersResponse, { market: string; limit: number;searchTerm:string; }>({
        query: ({ market, limit, searchTerm }) => {
            // Base query
            let query = `reference/tickers?market=${market}&active=true&limit=${limit}&apiKey=${apiKey}`;
            // Add searchTerm only if it exists
            if (searchTerm) {
              query += `&search=${searchTerm}`;
            }
            return query;
          },
          transformResponse: (response: StockTickersResponse) => {
            return response; // Modify as needed
          },
      
    }),
    loadMoreTickers: builder.query<StockTickersResponse, { cursor: string; }>({
        query: ({ cursor }) => 
          `reference/tickers?cursor=${cursor}&apiKey=${apiKey}`,
        transformResponse: (response: StockTickersResponse) => {
          return response; // Modify as needed
        },
      }),

  }),
});

export const { useGetStockTickersQuery ,useLazyLoadMoreTickersQuery} = polygonApi;
