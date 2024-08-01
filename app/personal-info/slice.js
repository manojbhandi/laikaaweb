const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    personalInfo: {
        data : [],
        loading:false,
        error:null
    }
}
export const personalInfoSlice = createSlice({
    name:'personalInfo',
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

export const {fetchFailure, fetchStart, fetchSuccess} = personalInfoSlice.actions;
export default personalInfoSlice.reducer;