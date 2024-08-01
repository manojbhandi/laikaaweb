import { act } from "react";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  cartList: {
    data: [],
    loading: false,
    error: null,
  },
  removeOneItemFromCart : {
    data: [],
    loading: false,
    error: null,
  },
  removeCartItems : {
    data: [],
    loading: false,
    error: null,
  },
  addItemsToCart : {
    data: [],
    loading: false,
    error: null,
  },
  productById: {
    data: [],
    loading: false,
    error: null,
  },
};

export const productByIdSlice = createSlice({
  name: "productById",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state[action.payload].loading = true;
      state[action.payload].error = null;
    },
    fetchSuccess: (state, action) => {
      const { key, data } = action.payload;
      state[key].loading = false;
      state[key].data = data;
    },
    fetchFailure: (state, action) => {
      const { key, error } = action.payload;
      state[key].loading = false;
      state[key].error = error;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } =
  productByIdSlice.actions;
export default productByIdSlice.reducer;
