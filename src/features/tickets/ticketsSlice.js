import { createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import { status , entries, ticketsActions, result, resources, cusotmerFlightStatus, userType} from "../../constants/enums";
import { convertUserTypeToEntry } from "../../constants/converters";
import { combineHost } from "../../constants/configuration";
import {client} from '../../api/client';
import moment from "moment";
import { Data } from "@react-google-maps/api";

const initialState ={
    tickets: [],
    flights : [],
    fligtsFilters : {
        originCountry : null,
        destCountry : null,
        departureTime : null,
        landingTime : null,
        onlyAvailiables : false,
        maxPrice : null
    },
    //STATUSES
    flightsStatus : status.idle,
    payTicketStatus : status.idle,
    removeTicketStatus : status.idle,
    //RESULTS
    ticketsResult : result.idle,
    flightsResult : result.idle,
    payTicketResult : result.idle,
    removeTicketResult : result.idle
}

const ticketsSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers:{
      flitersChanged(state, action){
         state.fligtsFilters =action.payload;
      }
    },
    extraReducers: builder =>{
        builder
        .addCase(fetchTickets.fulfilled, (state, action)=>{
            state.ticketsResult = result.success;
            state.tickets = action.payload; 
         })
         .addCase(fetchTickets.rejected, (state, action)=>{
            state.ticketsResult = result.error;
                //???
         })
         .addCase(addTicket.pending, (state, action)=>{
            state.payTicketStatus = status.pending;
         })
         .addCase(addTicket.fulfilled, (state, action)=>{
            state.payTicketStatus = status.idle;
            state.payTicketResult = result.success;
            state.tickets = [...state.tickets, action.payload]
         })
         .addCase(addTicket.rejected, (state, action)=>{
            state.payTicketStatus = status.idle;
            state.payTicketResult = status.error;
         })
         .addCase(removeTicket.pending, (state, action)=>{
            state.removeTicketStatus = status.pending;
         })
         .addCase(removeTicket.fulfilled, (state, action)=>{
            state.removeTicketStatus = status.idle;
            state.removeTicketResult = status.success;
            state.tickets = state.tickets.filter(ticket => ticket.id !==action.payload);
         })
         .addCase(removeTicket.rejected, (state, action)=>{
            state.removeTicketStatus = status.idle;
            state.removeTicketResult = status.error;
              //???
         })
         .addCase(fetchFligths.pending, (state, action)=>{
            state.flightsStatus = status.pending;
         })
         .addCase(fetchFligths.fulfilled, (state, action)=>{
            state.flightsStatus = status.idle;
            state.flightsResult = result.success;
            state.flights = action.payload;            
         })
         .addCase(fetchFligths.rejected, (state, action)=>{
            state.flightsStatus = status.idle;
            state.flightsResult = result.error;
         })
        
    }
});

export const fetchTickets =createAsyncThunk(ticketsActions.fetchTickets, async(data) =>{
    const customerId = data;
    const entry = entries.customer;
    const endpoint = `${combineHost}/${entry}/${resources.tickets}`;
    const param = {customerId: customerId, my: 'my'};
    const tickets = await client.get(endpoint, param, null);
    return tickets;
});

export const fetchFligths =createAsyncThunk(ticketsActions.fetchFlights, async(data, thunkApi) =>{
    const searchParams = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.flightsSearch}`;
    const flights = await client.get(endpoint, null, searchParams);
    return flights;
   
});

export const addTicket =createAsyncThunk(ticketsActions.addTicket, async(data) =>{
    const ticket= data;
    const entry =entries.customer;
    const endpoint = `${combineHost}/${entry}`;
    const newTicket = await client.post(endpoint, null, ticket);
    return newTicket;
});

export const removeTicket =createAsyncThunk(ticketsActions.removeTicket, async(data) =>{
    const ticketId = data;
    const entry = entries.customer;
    const endpoint = `${combineHost}/${entry}`;
    const params = {ticketId : ticketId};
    const responseStatus =await client.remove(endpoint, params);
    return responseStatus;
});

const getTicketFlightStatus=(flight, userTypeId, tickets)=>{
   if (userTypeId == userType.admin || userTypeId == userType.airline){
      return cusotmerFlightStatus.userTypeBlocked;
   }
   if (tickets){
       const ticket = tickets.find(tick =>tick.flight_id == flight.flight_id);
       if (ticket){
            return cusotmerFlightStatus.booked;
       }
   }
   const nowDate = new Date();
   const departureTime = moment(flight.departure_time);
   const departured = departureTime<=nowDate;
   if (departured){
      return cusotmerFlightStatus.departured;
   }
   if (flight.remaining_tickets == 0){
      return cusotmerFlightStatus.soldout;
   }
   return cusotmerFlightStatus.availiable;
}


export const SelectFlightsSearch=(state)=>{
   const results = state.tickets.flights;
   const tickets = state.tickets.tickets;
   const userTypeId = state.profile.currentUser.userTypeId;
   const statusResults = results.map(res =>{
      const resStatus = {...res, 
         status :getTicketFlightStatus(res, userTypeId, tickets)
      }
      return resStatus;
   });
   const dicResults = statusResults.reduce((datesMemo, flight)=>{
         const departure_date = moment(flight.departure_time).format('DD/MM/YYYY');
         if (!datesMemo[departure_date]){
            datesMemo[departure_date] = [];
      }
         datesMemo[departure_date].push(flight);
         return datesMemo;
   }, {});

   const arrResults = Object.keys(dicResults).map(date =>{
      const result = {date : date, dateFlights :dicResults[date]};
      return result;
   })
   return arrResults;
}

export const {flitersChanged} =ticketsSlice.actions;

export default ticketsSlice.reducer;