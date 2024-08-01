const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    savedAddress: {
        data : [],
        loading:true,
        error:null
    },
    addNewAddress: {
        data : [],
        loading:true,
        error:null
    }
}
export const savedAdresses = createSlice({
    name:'savedAddress',
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

export const {fetchFailure, fetchStart, fetchSuccess} = savedAdresses.actions;
export default savedAdresses.reducer;