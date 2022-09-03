import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { appActions, entries, status } from "../constants/enums";
import { combineHost } from "../constants/configuration";
import { client } from "../api/client";

const initialState = {
    errorStatus: status.idle,
    error: null,
    successStatus: status.idle,
    success: null
}


const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        catchAppError(state, action) {
            state.errorStatus = status.error;
            const { feature, message, details } = action.payload;
            state.error = { feature: feature, message: message, details: details }
        },
        resetAppError(state, action) {
            state.errorStatus = status.idle;
            state.error = null;
        },
        showSuccessMessage(state, action) {
            const { feature, message, details, url} = action.payload;
            state.successStatus = status.success;
            state.success = { feature: feature, message: message, details: details, url : url}
        },
        resetSuccessMessage(state, action) {
            state.successStatus = status.idle;
            state.success = null;
        }
    },
    extraReducers: builder => {
        builder
            //LOGIN
            .addCase(fetchCountries.fulfilled, (state, action) => {

            })
            .addCase(fetchCountries.rejected, (state, action) => {
                state.errorStatus = status.error;
                state.errorMessage = action.error.message;

            })
    }
});

export const {
    catchAppError,
    resetAppError,
    showSuccessMessage,
    resetSuccessMessage
} = appSlice.actions;

export const SelectApplicationError = (state) => {
    const isError = state.app.errorStatus == status.error;
    if (isError) {
        return state.app.error;
    }
    return null;
}

export const SelectSuccessMessgae = (state) => {
    const isSuccess = state.app.successStatus == status.success;
    if (isSuccess) {
        return state.app.success;
    }
    return null;
}

export const fetchCountries = createAsyncThunk(appActions.fetchCountries, async (data, thunkApi) => {
    const entry = entries.anonym;
    const endpoint = `${combineHost}/${entry}`;
    const countries = await client.get(endpoint, null, null);
    return countries;
});


export default appSlice.reducer;