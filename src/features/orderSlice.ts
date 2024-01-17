import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createOrder,
  deleteOrder,
  editOrder,
  findOrder,
  orderDetail,
  searchProducts,
} from "../api/orderAPI";
import { SearchData } from "../interface/iSearchData";
import { IOrderState } from "../interface/iOrderState";
import { ICreateOrder } from "../interface/iCreateOrder";
import { IOrder } from "../interface/iOrder";

const initialState: IOrderState = {
  values: null,
  value: {},
  loading: false,
  error: false,
  success: false,
};

export const getOrders: any = createAsyncThunk(
  "order/list",
  async () => {
    const response = await findOrder();
    return response?.data;
  }
);

export const getSearchProducts: any = createAsyncThunk(
  "order/search",
  async (searchData: SearchData) => {
    const response = await searchProducts(searchData);
    return response?.data;
  }
);

export const getOrderDetail: any = createAsyncThunk(
  "order/detail",
  async (orderID: string) => {
    const response = await orderDetail(orderID);
    return response?.data;
  }
);

export const getOrderDelete: any = createAsyncThunk(
  "order/detail",
  async (orderID: string) => {
    const response = await deleteOrder(orderID);
    return response?.data;
  }
);

export const getCreateOrder: any = createAsyncThunk(
  "order/create",
  async (order: ICreateOrder) => {
    const response = await createOrder(order);
    return response?.data;
  }
);

export const getEditOrder: any = createAsyncThunk(
  "order/edit",
  async (order: IOrder) => {
    const response = await editOrder(order);
    return response?.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload.data;
        state.error = false;
      })

      .addCase(getSearchProducts.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getSearchProducts.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getSearchProducts.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.values = action.payload.data;
        state.error = false;
      })

      .addCase(getOrderDetail.pending, (state, action) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getOrderDetail.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getOrderDetail.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })

      .addCase(getCreateOrder.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getCreateOrder.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getCreateOrder.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      })

      .addCase(getEditOrder.pending, (state) => {
        state.success = false;
        state.loading = true;
        state.error = false;
      })
      .addCase(getEditOrder.rejected, (state, action) => {
        state.success = false;
        state.loading = false;
        state.error = action.error;
      })
      .addCase(getEditOrder.fulfilled, (state, action) => {
        state.success = true;
        state.loading = false;
        state.value = action.payload;
        state.error = false;
      });
  },
});

export const { setLoading, setError, setSuccess } = orderSlice.actions;
export const selectLoading = (state: any) => state.order.loading;
export const selectError = (state: any) => state.order.error;
export const selectSuccess = (state: any) => state.order.success;
export const selectOrderList = (state: any) => state.order.values;
export const selectProductSearch = (state: any) => state.order.values;
export const selectOrderDetail = (state: any) => state.order.value;
export const selectOrderCreate = (state: any) => state.order.value;
export const selectOrderEdit = (state: any) => state.order.value;

export default orderSlice.reducer;
