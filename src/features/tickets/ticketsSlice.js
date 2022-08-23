import { createSlice , createAsyncThunk} from "@reduxjs/toolkit/dist";
import { status , entries, ticketsActions, result} from "../../constants/enums";
import { convertUserTypeToEntry } from "../../constants/converters";
import { combineHost } from "../../constants/configuration";
import {client} from '../../api/client';


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
    const endpoint = `${combineHost}/${entry}`;
    const param = {customerId: customerId, my: 'my'};
    const tickets = await client.get(endpoint, param, null);
    return tickets;
});

export const fetchFligths =createAsyncThunk(ticketsActions.fetchFlights, async(data, thunkApi) =>{
    const searchParams = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}`;
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

export default ticketsSlice.reducer;