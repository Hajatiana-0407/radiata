import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { ApiReturnType, ArticleType } from '@/lib/types';

interface ArticleDetailState {
  article: ArticleType | null;
  loading: boolean;
  error: string | null;
}

const initialState: ArticleDetailState = {
  article: null,
  loading: false,
  error: null,
};

export const fetchArticleById = createAsyncThunk(
  'articleDetail/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/articles/${id}`);
      const result: ApiReturnType = response.data;
      if (result.success) {
        return result;
      } else {
        return rejectWithValue(result.message || 'Failed to fetch articles');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch articles');
    }
  }
);

const articleDetailSlice = createSlice({
  name: 'articleDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticleById.fulfilled, (state, action : { payload: ApiReturnType }) => {
        state.loading = false;
        state.article = action.payload.data ;
      })
      .addCase(fetchArticleById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default articleDetailSlice.reducer;
