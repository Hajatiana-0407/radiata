import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination } from '@/lib/types';

interface AdminDestinationsState {
  items: Destination[];
  loading: boolean;
  error: string | null;
  actionLoading: boolean;
  actionError: string | null;
  actionSuccess: boolean;
}

const initialState: AdminDestinationsState = {
  items: [],
  loading: false,
  error: null,
  actionLoading: false,
  actionError: null,
  actionSuccess: false,
};

export const fetchAdminDestinations = createAsyncThunk(
  'adminDestinations/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/admin/destinations');
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch destinations');
    }
  }
);

export const createDestination = createAsyncThunk(
  'adminDestinations/create',
  async (data: Omit<Destination, 'id' | 'createdAt' | 'updatedAt'>, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/admin/destinations', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create destination');
    }
  }
);

export const updateDestination = createAsyncThunk(
  'adminDestinations/update',
  async ({ id, data }: { id: string; data: Partial<Destination> }, { rejectWithValue }) => {
    try {
      const response = await apiClient.put(`/admin/destinations/${id}`, data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update destination');
    }
  }
);

export const deleteDestination = createAsyncThunk(
  'adminDestinations/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await apiClient.delete(`/admin/destinations/${id}`);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete destination');
    }
  }
);

const adminDestinationsSlice = createSlice({
  name: 'adminDestinations',
  initialState,
  reducers: {
    resetAction: (state) => {
      state.actionSuccess = false;
      state.actionError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAdminDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAdminDestinations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAdminDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create
      .addCase(createDestination.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(createDestination.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items.push(action.payload);
        state.actionSuccess = true;
      })
      .addCase(createDestination.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload as string;
      })
      // Update
      .addCase(updateDestination.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(updateDestination.fulfilled, (state, action) => {
        state.actionLoading = false;
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        state.actionSuccess = true;
      })
      .addCase(updateDestination.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload as string;
      })
      // Delete
      .addCase(deleteDestination.pending, (state) => {
        state.actionLoading = true;
        state.actionError = null;
      })
      .addCase(deleteDestination.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.actionSuccess = true;
      })
      .addCase(deleteDestination.rejected, (state, action) => {
        state.actionLoading = false;
        state.actionError = action.payload as string;
      });
  },
});

export const { resetAction } = adminDestinationsSlice.actions;
export default adminDestinationsSlice.reducer;
