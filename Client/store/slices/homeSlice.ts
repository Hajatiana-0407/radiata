import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@/lib/api/client';
import { Destination, ContentData, ApiReturnType } from '@/lib/types';

interface HomeState {
  content: ContentData | null;
  popularDestinations: Destination[];
  loading: boolean;
  error: string | null;
}

const initialState: HomeState = {
  content: null,
  popularDestinations: [],
  loading: false,
  error: null,
};

// export const fetchHomeContent = createAsyncThunk(
//   'home/fetchContent',
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await apiClient.get('/content');
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message || 'Failed to fetch home content');
//     }
//   }
// );

export const fetchPopularDestinations = createAsyncThunk(
  'home/fetchPopularDestinations',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/circuits/popular');
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

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(fetchHomeContent.pending, (state) => {
      //   state.loading = true;
      // })
      // .addCase(fetchHomeContent.fulfilled, (state, action) => {
      //   state.loading = false;
      //   state.content = action.payload;
      // })
      // .addCase(fetchHomeContent.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload as string;
      // })
      .addCase(fetchPopularDestinations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPopularDestinations.fulfilled, (state, action : { payload: ApiReturnType }) => {
        state.loading = false;
        state.popularDestinations = action.payload.data || [];
      })
      .addCase(fetchPopularDestinations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeSlice.reducer;
