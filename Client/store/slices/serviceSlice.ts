import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination, ContentData, ApiReturnType, CategoryType, Servicetype } from '@/lib/types';

interface ServicesState {
    items: Servicetype[];
    loading: boolean;
    error: string | null;
}

const initialState: ServicesState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchAllServices = createAsyncThunk(
    'services/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/services');
            const result: ApiReturnType = response.data;
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message || 'Failed to fetch services');
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch services');
        }
    }
);


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllServices.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllServices.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.loading = false;
                if (action.payload.success) {
                    state.items = action.payload.data
                } else {
                    state.error = action.payload.message || 'Failed to fetch services';
                }
            })
            .addCase(fetchAllServices.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default homeSlice.reducer;
