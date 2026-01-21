import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination, ContentData, ApiReturnType, CategoryType } from '@/lib/types';

interface categorisState {
    items: CategoryType[];
    loading: boolean;
    error: string | null;
}

const initialState: categorisState = {
    items: [],
    loading: false,
    error: null,
};

export const fetchAllCategories = createAsyncThunk(
    'categories/fetch',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiClient.get('/categories');
            const result: ApiReturnType = response.data;
            if (result.success) {
                return result;
            } else {
                return rejectWithValue(result.message || 'Failed to fetch destinations');
            }
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch home content');
        }
    }
);


const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllCategories.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.loading = false;
                if (action.payload.success) {
                    state.items = action.payload.data
                } else {
                    state.error = action.payload.message || 'Failed to fetch categories';
                }
            })
            .addCase(fetchAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default homeSlice.reducer;
