import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
export interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

export const API = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://newsapi.org/v2",
  }),
  endpoints: (builder) => ({
    getTopHeadlines: builder.query<
      { articles: Article[] },
      { country: string; category: string }
    >({
      query: ({ country, category }) => ({
        url: `/top-headlines?apiKey=${APIKEY}`,
        params: { country, category },
      }),
    }),
    searchArticles: builder.query<{ articles: Article[] }, { q: string }>({
      query: ({ q }) => {
        return {
          url: `/everything?q=${q}&apiKey=${APIKEY}`,
        };
      },
    }),
  }),
});
export const { useGetTopHeadlinesQuery, useSearchArticlesQuery } = API;
