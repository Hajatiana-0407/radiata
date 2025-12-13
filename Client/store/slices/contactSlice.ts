import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';

interface ContactState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ContactState = {
  loading: false,
  error: null,
  success: false,
};

export const sendContactMessage = createAsyncThunk(
  'contact/send',
  async (
    data: { name: string; email: string; subject: string; message: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await apiClient.post('/contacts', data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to send message');
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContact: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContact } = contactSlice.actions;
export default contactSlice.reducer;
