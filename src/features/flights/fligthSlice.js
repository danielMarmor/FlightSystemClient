import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { flightsActions, status, result, resources } from "../../constants/enums";
import { combineHost } from "../../constants/configuration";
import { convertUserTypeToEntry } from "../../constants/converters";
import { client } from "../../api/client";
import { FlightModel } from "./models/flightModel";
import moment from "moment";

const initialState = {
   airline: {},
   myFlights: [],
   filters: {
      fromCountry: null,
      toCountry: null,
      fromDate: null,
      toDate: null
   },
   myFlightsStatus: status.idle,
   myFlightsResult: result.idle,
   flightStatus: status.idle,
   flightReuslt: result.idle
}
const flightsSlice = createSlice({
   name: 'flights',
   initialState,
   reducers: {
      flitersChanged(state, action){
         state.filters =action.payload;
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchAirline.pending, (state, action) => {
            state.myFlightsStatus = status.pending;
         })
         .addCase(fetchAirline.fulfilled, (state, action) => {
            state.myFlightsStatus = status.idle;
            state.myFlightsResult = result.success;
            state.airline = action.payload;
         })
         .addCase(fetchAirline.rejected, (state, action) => {
            state.myFlightsStatus = status.idle;
            state.myFlightsResult = result.error;
         })
         .addCase(fetchFlights.pending, (state, action) => {
            state.myFlightsStatus = status.pending;
         })
         .addCase(fetchFlights.fulfilled, (state, action) => {
            state.myFlightsStatus = status.idle;
            state.myFlightsResult = result.success;
            state.myFlights = action.payload;
         })
         .addCase(fetchFlights.rejected, (state, action) => {
            state.myFlightsStatus = status.idle;
            state.myFlightsResult = result.error;
         })
         .addCase(addFlight.pending, (state, action) => {
            state.flightStatus = status.pending;
         })
         .addCase(addFlight.fulfilled, (state, action) => {
            state.flightStatus = status.idle;
            state.flightReuslt = result.success;
            //state.myFlights.push(action.payload);
         })
         .addCase(addFlight.rejected, (state, action) => {
            state.flightStatus = status.idle;
            state.flightReuslt = result.error;
         })
         .addCase(editFlight.pending, (state, action) => {
            state.flightStatus = status.pending;
         })
         .addCase(editFlight.fulfilled, (state, action) => {
            const updatedFlight = action.payload;
            state.flightStatus = status.idle;
            state.flightReuslt = result.success;
            //state.myFlights = state.myFlights.map(flight => flight.id === updatedFlight.id ? updatedFlight : flight);
         })
         .addCase(editFlight.rejected, (state, action) => {
            state.flightStatus = status.idle;
            state.flightReuslt = result.error;
         })
         .addCase(removeFlight.pending, (state, action) => {
            state.flightStatus = status.pending;
         })
         .addCase(removeFlight.fulfilled, (state, action) => {
            const flightId = action.payload;
            state.flightStatus = status.idle;
            state.flightReuslt = result.success;
            //state.myFlights = state.myFlights.filter(flight => flight.id !== flightId)
         })
         .addCase(removeFlight.rejected, (state, action) => {
            state.flightStatus = status.idle;
            state.flightReuslt = result.error;
         })
   }
});

export const fetchAirline = createAsyncThunk(flightsActions.fetchAirline, async (data, thunkApi) => {
   const airlineId = data;
   console.log(`fetchAirline/${airlineId}`);
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
   const params = { airlineId: airlineId };
   const airline = await client.get(endpoint, params, null);
   return airline;
});

export const fetchFlights = createAsyncThunk(flightsActions.fetchFlights, async (data, thunkApi) => {
   const airlineId = data;
   console.log(`fetchFlights/${fetchFlights}`);
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.flights}`;
   const params = { my: 'my', airlineId: airlineId };
   const flights = await client.get(endpoint, params, null);
   return flights;
});

export const addFlight = createAsyncThunk(flightsActions.addFlight, async (data, thunkApi) => {
   let newFlight = data;
   const departure_time = newFlight.departure_time;
   const landing_time = newFlight.landing_time;
   newFlight = {
      ...newFlight,
      remaining_tickets : newFlight.num_seats, 
      departure_date: moment(departure_time).format('DD/MM/YYYY'),
      departure_hour: moment(departure_time).hour(),
      departure_minute: moment(departure_time).minutes(),
      landing_date: moment(landing_time).format('DD/MM/YYYY'),
      landing_hour: moment(landing_time).hour(),
      landing_minute: moment(landing_time).minutes()
   }
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.flights}`;
   const retval = await client.post(endpoint, null, newFlight);
   const airlineId = globalState.profile.currentUser.identityId;
   const flights =await thunkApi.dispatch(fetchFlights(airlineId));
   return flights;
   
});

export const editFlight = createAsyncThunk(flightsActions.editFlight, async (data, thunkApi) => {
   let { flightId, flight } = data;
   const departure_time = flight.departure_time;
   const landing_time = flight.landing_time;
   // flight = {
   //    ...flight,
   //    remaining_tickets : flight.num_seats, 
   //    departure_date: moment(departure_time).format('DD/MM/YYYY'),
   //    departure_hour: moment(departure_time).hour(),
   //    departure_minute: moment(departure_time).minutes(),
   //    landing_date: moment(landing_time).format('DD/MM/YYYY'),
   //    landing_hour: moment(landing_time).hour(),
   //    landing_minute: moment(landing_time).minutes()
   // }
   const mapFlight = {
      airline_company_id  : flight.airline_company_id,
      origin_country_id : flight.origin_country_id,
      destination_country_id :flight.destination_country_id,
      departure_date: moment(departure_time).format('DD/MM/YYYY'),
      departure_hour: moment(departure_time).hour(),
      departure_minute: moment(departure_time).minutes(),
      landing_date: moment(landing_time).format('DD/MM/YYYY'),
      landing_hour: moment(landing_time).hour(),
      landing_minute: moment(landing_time).minutes(), 
      price :flight.price,
      remaining_tickets :flight.num_seats,
      distance :flight.distance,
      num_seats :flight.num_seats
  }
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.flights}`;
   const params = { flightId: flightId };
   const responseStatus = await client.put(endpoint, params, mapFlight);
   const airlineId = globalState.profile.currentUser.identityId;
   const flights =await thunkApi.dispatch(fetchFlights(airlineId));
   return flights;
});

export const removeFlight = createAsyncThunk(flightsActions.removeFlight, async (data, thunkApi) => {
   const flightId = data;
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.flights}`;
   const params = { flightId: flightId };
   const responseStatus = await client.remove(endpoint, params);
   const airlineId = globalState.profile.currentUser.identityId;
   const flights =await thunkApi.dispatch(fetchFlights(airlineId));
   return flights;
});

export const SelectAirline = (state) => state.flights.airline;
export const SelectFlights = (state) => state.flights.myFlights;

export const SelectFlightById =(flightId)=>(state) => {
   if (!flightId){
      return undefined;
   }
  const entity =state.flights.myFlights.find(fli =>fli.flight_id == flightId);
  const fligth = FlightModel.getFlight(entity);
  return fligth;
}

export const SelectFlightsToShow = (state) =>{
   const filters = state.flights.filters;
   const fromDate =filters.fromDate;
   const toDate = moment(filters.toDate).add(1, 'day');
   const flights = state.flights.myFlights.filter(fli =>{
      const momentDeparture = moment(fli.departure_time, 'DD/MM/YYYY HH:mm:SS');
      const match = (!filters.fromDate || momentDeparture >= fromDate)
                 && (!filters.toDate ||  momentDeparture <= toDate)
                 && (!filters.fromCountry  || fli.origin_country_name.startsWith(filters.fromCountry))
                 && (!filters.toCountry  || fli.dest_country_name.startsWith(filters.toCountry))
      return match;
   });
   return flights;
}

export const {flitersChanged} =flightsSlice.actions;

// export const SelectFlightsByParams= (state)={

// }


export default flightsSlice.reducer;