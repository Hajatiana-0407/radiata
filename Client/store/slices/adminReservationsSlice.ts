import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Reservation } from '@/lib/types';

interface AdminReservationsState {
  items: Reservation[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
  actionError: string | null;
  actionSuccess: boolean;
}

const initialState: AdminReservationsState = {
  items: [],
  loading: false,
  error: null,
  actionLoading: false,
  actionError: null,
  actionSuccess: false,
};

export const fetchAdminReservations = createAsyncThunk(
  'adminReservations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/reservations');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch reservations');
    }
  }
);

export const updateReservationStatus = createAsyncThunk(
  'adminReservations/updateStatus',
  async ({ id, status }: { id: string; status: string }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/admin/reservations/${id}/status`, { status });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update reservation');
    }
  }
);

const adminReservationsSlice = createSlice({
  name: 'adminReservations',
  initialState,
  reducers: {
    resetAction: (state) => {
      state.actionSuccess = false;
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateReservationStatus.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateReservationStatus.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.actionSuccess = true;
      })
      .addCase(updateReservationStatus.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload as string;
      });
  },
});

export const { resetAction } = adminReservationsSlice.actions;
export default adminReservationsSlice.reducer;
