import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { ApiReturnType, Destination, GalerieMediaType } from '@/lib/types';

interface GalerieState {
    items: GalerieMediaType[];
    loading: boolean;
    error: string | null;
    page: number;
    categorie: string;
    totalPages: number;
    filters: {
        search: string;
    };
}

const initialState: GalerieState = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    totalPages: 1,
    categorie: '',
    filters: {
        search: '',
    },
};

export const fetchGalerieMedias = createAsyncThunk(
    'galerieMedias/fetch',
    async (
        { page, search, categorie }: any = {},
        { rejectWithValue }
    ) => {
        try {
            const params = new URLSearchParams();
            if (page) params.append('page', page);
            if (search) params.append('search', search);
            if (categorie) params.append('categorie', categorie);

            const response = await apiClient.get(`/galerie/medias?${params}`);
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
        setCategorie: (state, action) => {
            state.categorie = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGalerieMedias.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGalerieMedias.fulfilled, (state, action: { payload: ApiReturnType }) => {
                state.loading = false;
                state.items = action.payload.data;
                state.page = action.payload.pagination?.page || 1;
                state.totalPages = action.payload.pagination?.totalPages || 1;
            })
            .addCase(fetchGalerieMedias.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { setFilters, setPage , setCategorie } = destinationsSlice.actions;
export default destinationsSlice.reducer;
