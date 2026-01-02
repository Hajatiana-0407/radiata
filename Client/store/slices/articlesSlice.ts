import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { ApiReturnType, ArticleType, Destination } from '@/lib/types';

interface ArticlesState {
  items: ArticleType[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  filters: {
    search: string;
  };
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  filters: {
    search: ''
  },
};

export const fetchArticles = createAsyncThunk(
  'articles/fetch',
  async (
    { page, search }: any = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (search) params.append('search', search);

      const response = await apiClient.get(`/articles?${params}`);
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

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.page = 1;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: { payload: ApiReturnType }) => {
        state.loading = false;
        state.items = action.payload.data;
        state.page = action.payload.pagination?.page || 1;
        state.totalPages = action.payload.pagination?.totalPages || 1;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const getArticlesState = ( state : { articles: ArticlesState } ) => state.articles;

export const { setFilters, setPage } = articlesSlice.actions;
export default articlesSlice.reducer;
