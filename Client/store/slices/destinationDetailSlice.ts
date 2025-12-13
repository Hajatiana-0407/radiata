import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination } from '@/lib/types';

interface DestinationDetailState {
  destination: Destination | null;
  loading: boolean;
  error: string | null;
}

const initialState: DestinationDetailState = {
  destination: null,
  loading: false,
  error: null,
};

export const fetchDestinationById = createAsyncThunk(
  'destinationDetail/fetchById',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(`/destinations/${id}`);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch destination');
    }
  }
);

const destinationDetailSlice = createSlice({
  name: 'destinationDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDestinationById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDestinationById.fulfilled, (state, action) => {
        state.loading = false;
        state.destination = action.payload;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default destinationDetailSlice.reducer;
