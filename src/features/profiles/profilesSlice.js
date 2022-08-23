import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit/dist";
import { fetchTickets } from "../tickets/ticketsSlice";
import { fetchAirline, fetchFlights } from "../flights/fligthSlice";
import { userType, profileActions, entries, resources, status, result } from "../../constants/enums";
import { convertUserTypeToEntry } from "../../constants/converters";
import { combineHost , authentication} from "../../constants/configuration";
import {client} from "../../api/client";


const initialState = { 
    currentUser : {
        userTypeId : userType.anonym,
        username : null,
        identityId : null
    },
    profileStatus : status.idle,
    profileResult : result.idle
}
const profileSlice = createSlice({
    name :'profile',
    initialState,
    reducers :{
        tokenAccepted(state, action){
            const {user_role_id, identity} =action.payload.payload;
            state.currentUser.userTypeId = user_role_id;
            state.currentUser.username = `${identity.first_name} ${identity.last_name}`;
            state.currentUser.identityId = identity.id;
            }            
        }
    ,
    extraReducers: builder =>{
        builder
        //LOGIN
        .addCase(login.pending ,(state, action)=>{
            state.profileStatus = status.pending; 
         })
        .addCase(login.fulfilled, (state, action)=>{
            state.profileStatus = status.idle; 
            const succeeded = action.payload;
            state.profileResult = succeeded ? result.success :result.error;
         })
        .addCase(login.rejected, (state, action)=>{
            state.profileStatus = status.idle;
            state.profileResult = status.error; 
         })
         //ADD CUSTOMER
        .addCase(addCusotmer.pending, (state, action)=>{
            state.profileStatus = status.pending; 
         })
        .addCase(addCusotmer.fulfilled, (state, action)=>{
            state.profileStatus = status.idle; 
            const succeeded = action.payload;
            state.profileResult = succeeded ? result.success :result.error;
         })
         .addCase(addCusotmer.rejected, (state, action)=>{
            state.profileStatus = status.idle;
            state.profileResult = status.error; 
         })
         //EDIT CUSTOMER
         .addCase(editCustomer.pending, (state, action)=>{
            state.profileStatus = status.pending; 
         })
        .addCase(editCustomer.fulfilled, (state, action)=>{
            state.profileStatus = status.idle; 
            const succeeded = action.payload;
            state.profileResult = succeeded ? result.success :result.error;
         })
         .addCase(editCustomer.rejected, (state, action)=>{
            state.profileStatus = status.idle;
            state.profileResult = status.error; 
         })
         //ADD AIRLINE
         .addCase(addAirline.pending, (state, action)=>{
            state.profileStatus = status.pending; 
         })
        .addCase(addAirline.fulfilled, (state, action)=>{
            state.profileStatus = status.idle; 
            const succeeded = action.payload;
            state.profileResult = succeeded ? result.success :result.error;
         })
         .addCase(addAirline.rejected, (state, action)=>{
            state.profileStatus = status.idle;
            state.profileResult = status.error; 
         })
        //EDIT AIRLINE
         .addCase(editAirline.pending, (state, action)=>{
            state.profileStatus = status.pending; 
         })
        .addCase(editAirline.fulfilled, (state, action)=>{
            state.profileStatus = status.idle; 
            const succeeded = action.payload;
            state.profileResult = succeeded ? result.success :result.error;
         })
         .addCase(editAirline.rejected, (state, action)=>{
            state.profileStatus = status.idle;
            state.profileResult = status.error; 
         })
    }
});

export const login =createAsyncThunk(profileActions.login, async(data, thunkApi)=>{
    const loginData = data;
    const entry = entries.anonym;
    const endpoint = `${combineHost}/${entry}/${resources.login}`;
    //LOGIN
    const userToken = await client.post(endpoint, null, loginData);
    //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(tokenAccepted(userToken));
    const globalState = thunkApi.getState();
    //FETCH IDENETITY = CUSTOMER ID 
    const userTypeId = globalState.profile.currentUser.userTypeId;
    switch(userTypeId){
        case userType.customer:
            const customerId = globalState.profile.currentUser.identityId;
            //LOAD TICKETS
            thunkApi.dispatch(fetchTickets(customerId));
            break;
        case userType.airline://WRIRE CODE!
           const airlineId = globalState.profile.currentUser.identityId;
           await thunkApi.dispatch(fetchAirline(airlineId));
           await thunkApi.dispatch(fetchFlights(airlineId));
            break;
        case userType.admin://WRITE CODE !
            break;
        default: throw Error('Invalid User Type!')
    }   
    return true;
});
//IN THIS SLICE ===>BY SIGN UP ONLY!
export const addCusotmer =createAsyncThunk(profileActions.addCustomer, async(data, thunkApi)=>{
    const customerData = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.customers}`;
    const userToken = await client.post(endpoint, null, customerData);
     //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(profileSlice.actions.tokenAccepted(userToken));
    return true;
});

export const editCustomer =createAsyncThunk(profileActions.editCustomer, async(data, thunkApi)=>{
    const {customerId, customerData} = data;
    const globalState = thunkApi.getState();
    const userTypeId =globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
    const params = {customerId: customerId};
    const userToken = await client.put(endpoint, params, customerData);
     //PARSE TOKEN AND SET CURR USER
     thunkApi.dispatch(profileSlice.tokenAccepted(userToken));
     return true;
});
//IN THIS SLICE ===>BY SIGN UP ONLY!
export const addAirline =createAsyncThunk(profileActions.addAirline, async(data, thunkApi)=>{
    const airlineData = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
    const userToken = await client.post(endpoint, null, airlineData);
     //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(profileSlice.actions.tokenAccepted(userToken));
    const airlineId = globalState.profile.currentUser.identityId;
    await thunkApi.dispatch(fetchAirline(airlineId));
    return true;
});

export const editAirline =createAsyncThunk(profileActions.editAirline, async(data, thunkApi)=>{
    const {airlineId, airlineData }= data;
    const globalState = thunkApi.getState();
    const userTypeId =globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
    const params = {airlineId: airlineId};
    const userToken = await client.put(endpoint, params, airlineData);
     //PARSE TOKEN AND SET CURR USER
     thunkApi.dispatch(profileSlice.tokenAccepted(userToken));
     return true;
});

export const {tokenAccepted} =profileSlice.actions; 

export const SelectUserTypeId= (state)=>state.profile.currentUser.userTypeId;
export const SelectIdentityId= (state)=>state.profile.currentUser.identityId;

export default profileSlice.reducer;