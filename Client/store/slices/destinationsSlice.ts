import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { ApiReturnType, Destination } from '@/lib/types';

interface DestinationsState {
  items: Destination[];
  loading: boolean;
  error: string | null;
  page: number;
  totalPages: number;
  tags?: string[]
  filters: {
    search: string;
    tag: string | null;
    maxPrice: number | null;
    minPrice: number | null;
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
    tag: null,
    maxPrice: null,
    minPrice: null,
  },
};

export const fetchDestinations = createAsyncThunk(
  'destinations/fetch',
  async (
    { page, search, tag, maxPrice }: any = {},
    { rejectWithValue }
  ) => {
    try {
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (search) params.append('search', search);
      if (tag) params.append('tag', tag);
      if (maxPrice) params.append('maxPrice', maxPrice);

      const response = await apiClient.get(`/circuits?${params}`);
      const result: ApiReturnType = response.data;
      if (result.success) {
        return result;
      } else {
        return rejectWithValue(result.message || 'Failed to fetch destinations');
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch destinations');
    }
  }
);


export const fetchAllTags = createAsyncThunk(
  'destinations/fetchAllTags ',
  async (
    { }: any = {},
    { rejectWithValue }
  ) => {
    try {

      const response = await apiClient.get(`/circuits/tags/all`);
      const result: ApiReturnType = response.data;
      if (result.success) {
        return result;
      } else {
        return rejectWithValue(result.message || 'Failed to fetch destinations');
      }
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
      .addCase(fetchDestinations.fulfilled, (state, action: { payload: ApiReturnType }) => {
        state.loading = false;
        state.items = action.payload.data;
        state.page = action.payload.pagination?.page || 1;
        state.totalPages = action.payload.pagination?.totalPages || 1;
      })
      .addCase(fetchDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });


    builder
      .addCase(fetchAllTags.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTags.fulfilled, (state, action: { payload: ApiReturnType }) => {
        state.loading = false;
        state.tags = action.payload.data;
      })
      .addCase(fetchAllTags.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, setPage } = destinationsSlice.actions;
export default destinationsSlice.reducer;
