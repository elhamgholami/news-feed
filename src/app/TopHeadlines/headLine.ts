import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchTopHeadlines } from '../../services/api';

interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

interface State {
  articles: Article[];
  status: 'none' | 'loading' | 'success' | 'error';
  error: string | null;
}

const initialState: State = {
  articles: [],
  status: 'none',
  error: null,
};

export const getTopHeadlines = createAsyncThunk(
  'headline/getTopHeadlines',
  async (params: { country: string; category: string }) => {
    const response = await fetchTopHeadlines(params.country, params.category);
    return response.data.articles;
  }
);

const headlinesSlice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTopHeadlines.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTopHeadlines.fulfilled, (state, action) => {
        state.status = 'success';
        state.articles = action.payload;
      })
      .addCase(getTopHeadlines.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.error.message || 'error';
      });
  },
});

export default headlinesSlice.reducer;
