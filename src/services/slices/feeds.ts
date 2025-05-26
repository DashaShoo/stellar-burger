import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface FeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error: string | null;
}

const initialState: FeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const fetchFeed = createAsyncThunk<
  { orders: TOrder[]; total: number; totalToday: number },
  void,
  { rejectValue: string }
>(
  'feed/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getFeedsApi();
      return {
        orders: response.orders,
        total: response.total,
        totalToday: response.totalToday
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        const { orders, total, totalToday } = action.payload;
        state.orders = orders;
        state.total = total;
        state.totalToday = totalToday;
        state.loading = false;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch feed';
      });
  }
});

export const feedsReducer = feedSlice.reducer;
