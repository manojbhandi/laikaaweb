import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    termAndCondition: {
        data : [],
        loading : false,
        error : null 
    }
} 

export const termAndConditionSlice = createSlice({
    name:'termAndCondition',
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

export const {fetchStart, fetchSuccess, fetchFailure} = termAndConditionSlice.actions;
export default termAndConditionSlice.reducer;