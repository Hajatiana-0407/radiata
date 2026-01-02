import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { ApiReturnType, Destination } from '@/lib/types';

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
      const response = await apiClient.get(`/circuits/${id}`);
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
      .addCase(fetchDestinationById.fulfilled, (state, action : { payload: ApiReturnType }) => {
        state.loading = false;
        state.destination = action.payload.data ;
      })
      .addCase(fetchDestinationById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default destinationDetailSlice.reducer;
