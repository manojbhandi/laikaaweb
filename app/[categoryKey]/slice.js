const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    productsByCategeory : {
        data : [],
        loading: false,
        error: null
    },
    productsByBrand : {
        data : [],
        loading: false,
        error: null
    },
}

export const productsByCategorySlice = createSlice({
    name:'productsByKey',
    initialState,
    reducers : {
        fetchStart : (state, action) => {
            state[action.payload].loading = true;
            state[action.payload].error = null;
        },
        fetchSuccess : (state, action) => {
            const {key,data} = action.payload
            state[key].loading = false;
            state[key].data = data;
        },
        fetchFailure: (state, action) => {
            const {key,error} = action.payload
            state[key].loading = false;
            state[key].error = error;
        },
    }
})

export const { fetchStart, fetchSuccess, fetchFailure } = productsByCategorySlice.actions;
export default productsByCategorySlice.reducer;