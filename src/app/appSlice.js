import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { appActions , entries ,status} from "../constants/enums";
import { combineHost } from "../constants/configuration";
import { client } from "../api/client";

const initialState = {
    errorStatus : status.idle,
    errorMessage : null
}
const appSlice = createSlice({
    name :'app',
    initialState,
    reducers :{
        catchAppError(state, action){
            state.errorStatus = status.error;
            state.errorMessage= action.payload;
        },
        resetAppError(state, action){
            state.errorStatus = status.idle;
            state.errorMessage= null;
        }
    },   
    extraReducers:builder =>{
        builder
        //LOGIN
        .addCase(fetchCountries.fulfilled ,(state, action)=>{
            
        })
        .addCase(fetchCountries.rejected ,(state, action)=>{
            state.errorStatus = status.error;
            state.errorMessage= action.error.message;
            
        })
    }
});

export const fetchCountries =createAsyncThunk(appActions.fetchCountries, async(data, thunkApi)=>{
    const entry =entries.anonym;
    const endpoint = `${combineHost}/${entry}`;
    const countries = await client.get(endpoint, null, null);
    return countries;
});



export default appSlice.reducer;