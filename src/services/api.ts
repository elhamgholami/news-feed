import axios from 'axios';
const APIKEY = process.env.NEXT_PUBLIC_API_KEY;
const api = axios.create({
  baseURL: 'https://newsapi.org/v2',
  params: {
    apiKey: APIKEY,
  },
});

export const fetchTopHeadlines = (country: string, category: string) => {
  return api.get('/top-headlines', {
    params: { country, category },
  });
};

export default api;
