import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    openLogin : false,
    openSign : false,
    login: {
        data : [],
        loading : false,
        error : null 
    },
    signup: {
        data : [],
        loading : false,
        error : null 
    },
    logout: {
        data : [],
        loading : false,
        error : null 
    },
}

export const authModalSlice = createSlice({
    name:'openModel',
    initialState,
    reducers: {
        openModalLogin(state, action){
           state.openLogin = action.payload;
        },
        openModalSignup(state, action){
           state.openSign = action.payload;
        },
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

export const {openModalLogin, openModalSignup, fetchStart, fetchSuccess, fetchFailure} = authModalSlice.actions;
export default authModalSlice.reducer;