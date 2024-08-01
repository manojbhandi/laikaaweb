import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allOrdersPlaced: {
        data : [],
        loading : false,
        error : null 
    },
    orderDetailsById: {
        data : [],
        loading : false,
        error : null 
    },
    cancelOrder: {
        data : [],
        loading : false,
        error : null 
    },
} 


export const ordersPlaced = createSlice({
    name:'orderPlaced',
    initialState,
    reducers: {
        fetchStart : (state, action)=>{
            state[action.payload].loading = true;
            state[action.payload].error = null;
        },
        fetchSuccess : (state, action) => {
            const {key,data} = action.payload;
            state[key].loading = false;
            state[key].data = data;
        },
        fetchFailure : (state, action) => {
            const {key, error} = action.payload;
            state[key].loading = false;
            state[key].error = error
        }
    }
})

export const {fetchStart, fetchSuccess, fetchFailure} = ordersPlaced.actions;
export default ordersPlaced.reducer;