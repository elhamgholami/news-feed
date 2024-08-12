import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
export interface Article {
  title: string;
  description: string;
  urlToImage: string;
}
export interface SearchParams {
  domains?: string;
  q?: string;
  from?: string;
  to?: string;
  searchIn?: string;
  language?: string;
  sources?: string;
}

export const newsApi = createApi({
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
    searchArticles: builder.query<{ articles: Article[], totalResults: number }, {searchParams: SearchParams, page: number}>({
      query: ({searchParams, page = 1}) => {
        const params = new URLSearchParams();
        
        params.append("page", page.toString());
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value) {
            params.append(key, value);
          }
        });
        return {
          url: `/everything?${params.toString()}&apiKey=${APIKEY}`,
        };
      },
    }),
    getSources: builder.query<{ sources: { id: string; name: string }[] }, void>({
      query: () => {
        return {
          url: `/top-headlines/sources?apiKey=${APIKEY}`,
        };
      },
    }),
  }),
});
export const { useGetTopHeadlinesQuery, useSearchArticlesQuery, useGetSourcesQuery } = newsApi;
