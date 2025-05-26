import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '../../utils/burger-api';
import { TOrder } from '../../utils/types';

interface OrdersState {
  orders: TOrder[];
  currentOrder: TOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null
};

export const fetchOrders = createAsyncThunk<
  TOrder[],
  void,
  { rejectValue: string }
>(
  'orders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getOrdersApi();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const createOrder = createAsyncThunk<
  { order: TOrder; name: string },
  string[],
  { rejectValue: string }
>(
  'orders/create',
  async (ingredients, { rejectWithValue }) => {
    try {
      const result = await orderBurgerApi(ingredients);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchOrderByNumber = createAsyncThunk<
  TOrder[],
  number,
  { rejectValue: string }
>(
  'orders/fetchByNumber',
  async (orderNumber, { rejectWithValue }) => {
    try {
      const result = await getOrderByNumberApi(orderNumber);
      return result.orders;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder(state) {
      state.currentOrder = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch orders';
      })

      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload.order);
        state.currentOrder = action.payload.order;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to create order';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = null;
        state.loading = false;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch order';
      });
  }
});

export const { clearCurrentOrder } = ordersSlice.actions;
export const ordersReducer = ordersSlice.reducer;
export { initialState as initialOrderState };
