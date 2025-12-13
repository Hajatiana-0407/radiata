import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination } from '@/lib/types';

interface DestinationsState {
  items: Destination[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  filters: {
    search: string;
    difficulty: string | null;
    maxPrice: number | null;
  };
}

const initialState: DestinationsState = {
  items: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  filters: {
    search: '',
    difficulty: null,
    maxPrice: null,
  },
};

export const fetchDestinations = createAsyncThunk(
  'destinations/fetch',
  async (
    { page, search, difficulty, maxPrice }: any = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (search) params.append('search', search);
      if (difficulty) params.append('difficulty', difficulty);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const response = await apiClient.get(`/destinations?${params}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch destinations');
    }
  }
);

const destinationsSlice = createSlice({
  name: 'destinations',
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
      .addCase(fetchDestinations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data;
        state.page = action.payload.page;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setPage } = destinationsSlice.actions;
export default destinationsSlice.reducer;
