import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { flightsActions , status, result, resources} from "../../constants/enums";
import { combineHost } from "../../constants/configuration";
import { convertUserTypeToEntry } from "../../constants/converters";
import {client} from "../../api/client";


const initialState = { 
    airline :{},
    myFlights :[],
    flightsFilter :{
        fromCountry: null,
        toCountry : null,
        fromDate : null,
        toDate : null
    },
    myFlightsStatus :  status.idle,
    myFlightsResult :  result.idle,
    flightStatus : status.idle,
    flightReuslt : result.idle  
}
const flightsSlice = createSlice({
    name :'flights',
    initialState,
    reducers :{
    },
    extraReducers: builder =>{
        builder
        .addCase(fetchAirline.pending ,(state, action)=>{
         state.myFlightsStatus = status.pending; 
      })
      .addCase(fetchAirline.fulfilled ,(state, action)=>{
         state.myFlightsStatus= status.idle; 
         state.myFlightsResult = result.success;
         state.airline = action.payload;
      })
      .addCase(fetchAirline.rejected ,(state, action)=>{
         state.myFlightsStatus= status.idle;
         state.myFlightsResult = result.error;
      })
        .addCase(fetchFlights.pending ,(state, action)=>{
            state.myFlightsStatus = status.pending; 
         })
         .addCase(fetchFlights.fulfilled ,(state, action)=>{
            state.myFlightsStatus= status.idle; 
            state.myFlightsResult = result.success;
            state.myFlights = action.payload;
         })
         .addCase(fetchFlights.rejected ,(state, action)=>{
            state.myFlightsStatus= status.idle;
            state.myFlightsResult = result.error;
         })
         .addCase(addFlight.pending ,(state, action)=>{
            state.flightStatus = status.pending; 
         })
         .addCase(addFlight.fulfilled ,(state, action)=>{
            state.flightStatus = status.idle; 
            state.flightReuslt = result.success;
            state.myFlights.push(action.payload);
         })
         .addCase(addFlight.rejected ,(state, action)=>{
            state.flightStatus =  status.idle;
            state.flightReuslt = result.error; 
         })
         .addCase(editFlight.pending ,(state, action)=>{
            state.flightStatus = status.pending; 
         })
         .addCase(editFlight.fulfilled ,(state, action)=>{
            const updatedFlight = action.payload;
            state.flightStatus = status.idle;
            state.flightReuslt = result.success;
            state.myFlights = state.myFlights.map(flight =>flight.id === updatedFlight.id ?updatedFlight : flight);        
         })
         .addCase(editFlight.rejected ,(state, action)=>{
            state.flightStatus = status.idle;
            state.flightReuslt = result.error;
         })
         .addCase(removeFlight.pending ,(state, action)=>{
            state.flightStatus = status.pending; 
         })
         .addCase(removeFlight.fulfilled ,(state, action)=>{
            const flightId = action.payload;
            state.flightStatus = status.idle;
            state.flightReuslt = result.success;
            state.myFlights = state.myFlights.filter(flight => flight.id !== flightId)
         })
         .addCase(removeFlight.rejected ,(state, action)=>{
            state.flightStatus = status.idle;
            state.flightReuslt = result.error;
         })
    }
});

export const fetchAirline =createAsyncThunk(flightsActions.fetchAirline, async(data, thunkApi)=>{
   const airlineId = data;
   console.log(`fetchAirline/${airlineId}`);
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
   const params = {airlineId :airlineId};
   const airline = await client.get(endpoint, params, null);
   return airline;
});

export const fetchFlights =createAsyncThunk(flightsActions.fetchFlights, async(data, thunkApi)=>{
    const airlineId = data;
    console.log(`fetchFlights/${fetchFlights}`);
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.flights}`;
    const params = {my :'my', airlineId :airlineId};
    const flights = await client.get(endpoint, params, null);
    return flights;
});

export const addFlight =createAsyncThunk(flightsActions.addFlight, async(data, thunkApi)=>{
    const flight = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
    const flights = await client.post(endpoint, null, flight);
    return flights;
});

export const editFlight =createAsyncThunk(flightsActions.editFlight, async(data, thunkApi)=>{
    const {flightId, flight} = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
    const params = {flightId: flightId};
    const responseStatus = await client.put(endpoint, params, flight);
    return responseStatus;
});

export const removeFlight =createAsyncThunk(flightsActions.removeFlight, async(data, thunkApi)=>{
    const flightId = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
    const params = {flightId: flightId};
    const responseStatus = await client.remove(endpoint, params);
    return flightId;
});

export const SelectAirline= (state)=>state.flights.airline;
export const SelectFlights= (state)=>state.flights.myFlights;

export default flightsSlice.reducer;