import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Reservation } from '@/lib/types';

interface ReservationState {
  current: Reservation | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ReservationState = {
  current: null,
  loading: false,
  error: null,
  success: false,
};

export const createReservation = createAsyncThunk(
  'reservation/create',
  async (data: Omit<Reservation, 'id' | 'createdAt' | 'updatedAt' | 'status'>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/reservations', { ...data, status: 'pending' });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create reservation');
    }
  }
);

const reservationSlice = createSlice({
  name: 'reservation',
  initialState,
  reducers: {
    resetReservation: (state) => {
      state.current = null;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload;
        state.success = true;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetReservation } = reservationSlice.actions;
export default reservationSlice.reducer;
