const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  searchRes: {
    data: [],
    loading: false,
    error: null,
  },
  allBrands: {
    data: [],
    loading: false,
    error: null,
  },
  allCategories: {
    data: [],
    loading: false,
    error: null,
  },
  checkout:{
    data:[],
    loading: false,
    error:null
  }
};

export const commonSlice = createSlice({
  name: "commonSlice",
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
commonSlice.actions;
export default commonSlice.reducer;
