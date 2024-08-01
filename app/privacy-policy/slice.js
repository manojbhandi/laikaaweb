import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    privacyPolicy: {
        data : [],
        loading : false,
        error : null 
    }
} 


export const privacyPolicySlice = createSlice({
    name:'privacyPolicy',
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

export const {fetchStart, fetchSuccess, fetchFailure} = privacyPolicySlice.actions;
export default privacyPolicySlice.reducer;