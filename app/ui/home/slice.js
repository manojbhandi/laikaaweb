const { createSlice } = require("@reduxjs/toolkit");


const initialState = {
    categories : {
        data : [],
        loading: false,
        error: null
    },
    brands : {
        data : [],
        loading: false,
        error: null
    },
    homeData : {
        data : [],
        loading: true,
        error: null
    },
}

export const homeSlice = createSlice({
    name:'home',
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

export const { fetchStart, fetchSuccess, fetchFailure } = homeSlice.actions;
export default homeSlice.reducer;