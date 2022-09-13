import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { status, entries, ticketsActions, result, resources, cusotmerFlightStatus, userType } from "../../constants/enums";
import { convertUserTypeToEntry } from "../../constants/converters";
import { combineHost } from "../../constants/configuration";
import { client } from '../../api/client';
import moment from "moment";

const initialState = {
   tickets: [],
   flights: [],
   fligtsFilters: {
      origin_country_name: '',
      destination_country_name: '',
      origin_country_id : null,
      dest_country_id : null,
      start_date: moment().add(-7, 'days'),
      end_date: moment().add(-7, 'days').add(3, 'months')
   },
   orderDetails: {},
   //STATUSES
   flightsStatus: status.idle,
   payTicketStatus: status.idle,
   removeTicketStatus: status.idle,
   //RESULTS
   ticketsResult: result.idle,
   flightsResult: result.idle,
   payTicketResult: result.idle,
   removeTicketResult: result.idle
}

const ticketsSlice = createSlice({
   name: 'tickets',
   initialState,
   reducers: {
      flitersChanged(state, action) {
         state.fligtsFilters = action.payload;
      },
      orderDetailsChanged(state, action) {
         const { name, value } = action.payload;
         state.orderDetails[name] = value;
      },
      resetOrderDetails(state, action) {
         state.orderDetails = {};
      },
      clearTickets(state, action) {
         state.tickets = [];
      },
      clearTicketsFilters(state, action) {
         state.fligtsFilters = initialState.fligtsFilters;
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchTickets.fulfilled, (state, action) => {
            state.ticketsResult = result.success;
            state.tickets = action.payload;
         })
         .addCase(fetchTickets.rejected, (state, action) => {
            state.ticketsResult = result.error;
            //???
         })
         .addCase(addTicket.pending, (state, action) => {
            state.payTicketStatus = status.pending;
         })
         .addCase(addTicket.fulfilled, (state, action) => {
            state.payTicketStatus = status.idle;
            state.payTicketResult = result.success;
            //state.tickets = [...state.tickets, action.payload]
         })
         .addCase(addTicket.rejected, (state, action) => {
            state.payTicketStatus = status.idle;
            state.payTicketResult = status.error;
         })
         .addCase(removeTicket.pending, (state, action) => {
            state.removeTicketStatus = status.pending;
         })
         .addCase(removeTicket.fulfilled, (state, action) => {
            state.removeTicketStatus = status.idle;
            state.removeTicketResult = status.success;
            state.tickets = state.tickets.filter(ticket => ticket.id !== action.payload);
         })
         .addCase(removeTicket.rejected, (state, action) => {
            state.removeTicketStatus = status.idle;
            state.removeTicketResult = status.error;
            //???
         })
         .addCase(fetchFligths.pending, (state, action) => {
            state.flightsStatus = status.pending;
         })
         .addCase(fetchFligths.fulfilled, (state, action) => {
            state.flightsStatus = status.idle;
            state.flightsResult = result.success;
            state.flights = action.payload;
         })
         .addCase(fetchFligths.rejected, (state, action) => {
            state.flightsStatus = status.idle;
            state.flightsResult = result.error;
         })

   }
});

export const fetchTickets = createAsyncThunk(ticketsActions.fetchTickets, async (data) => {
   const customerId = data;
   const entry = entries.customer;
   const endpoint = `${combineHost}/${entry}/${resources.tickets}`;
   const param = { my: 'my', customerId: customerId };
   const tickets = await client.get(endpoint, param, null);
   return tickets;
});

// export const fetchTicketsByFlight = createAsyncThunk(ticketsActions.fetchTicketsByFlight, async (data, thunkApi) => {
//    const flightId = data;
//    const entry = entries.customer;
//    const endpoint = `${combineHost}/${entry}/${resources.tickets}`;
//    const param = { flightId: flightId };
//    const tickets = await client.get(endpoint, param, null);
//    thunkApi.dispatch(flightTicketsLoaded(tickets));
// });

export const fetchFligths = createAsyncThunk(ticketsActions.fetchFlights, async (data, thunkApi) => {
   const searchParams = prepareFetchFlightParams(data);
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpoint = `${combineHost}/${entry}/${resources.flightsSearch}`;
   const flights = await client.get(endpoint, null, searchParams);
   return flights;

});

export const fetchFlightById = createAsyncThunk(ticketsActions.fetchFlightById, async (data, thunkApi) => {
   const fligthId = data;
   const globalState = thunkApi.getState();
   const userTypeId = globalState.profile.currentUser.userTypeId;
   const entry = convertUserTypeToEntry(userTypeId);
   const endpointFlight = `${combineHost}/${entry}/${resources.flights}`;
   const endpointTickets = `${combineHost}/${entry}/${resources.tickets}`;
   const filghtParam = { flightId: fligthId }
   const flight = await client.get(endpointFlight, filghtParam, null);
   flight.priceText = `${flight.price} USD`;
   const ticketes = await client.get(endpointTickets, filghtParam, null);
   flight.TicketForFlights = Object.assign({}, ...ticketes.map((tick) => ({ [tick.position]: tick.id })));
   return flight;

});

export const checkTicket = createAsyncThunk(ticketsActions.checkTicket, async (data, thunkApi) => {
   const ticket = data;
   const entry = entries.customer;
   const endpoint = `${combineHost}/${entry}/${resources.checkTicket}`;
   const ticketConfirm = await client.post(endpoint, null, ticket);
   return true;
});

export const addTicket = createAsyncThunk(ticketsActions.addTicket, async (data, thunkApi) => {
   const ticket = data;
   const entry = entries.customer;
   const endpoint = `${combineHost}/${entry}/${resources.tickets}`;
   const newTicket = await client.post(endpoint, null, ticket);
   await thunkApi.dispatch(fetchTickets(ticket.customer_id)).unwrap();
   return newTicket;
});

export const removeTicket = createAsyncThunk(ticketsActions.removeTicket, async (data, thunkApi) => {
   const ticketId = data;
   const entry = entries.customer;
   const endpoint = `${combineHost}/${entry}/${resources.tickets}`;
   const params = { ticketId: ticketId };
   const responseStatus = await client.remove(endpoint, params);
   const state = thunkApi.getState();
   const customerId = state.profile.currentUser.identityId;
   await thunkApi.dispatch(fetchTickets(customerId)).unwrap();
   return responseStatus;
});

const getTicketFlightStatus = (flight, userTypeId, tickets) => {
   if (userTypeId == userType.admin || userTypeId == userType.airline) {
      return cusotmerFlightStatus.userTypeBlocked;
   }
   if (tickets) {
      const ticket = tickets.find(tick => tick.flight_id == flight.flight_id);
      if (ticket) {
         return cusotmerFlightStatus.booked;
      }
   }
   const nowDate = new Date();
   const departureTime = moment(flight.departure_time);
   const departured = departureTime <= nowDate;
   if (departured) {
      return cusotmerFlightStatus.departured;
   }
   if (flight.remaining_tickets == 0) {
      return cusotmerFlightStatus.soldout;
   }
   return cusotmerFlightStatus.availiable;
}
//PREPARE
const prepareFetchFlightParams = (filters) => {
   const searchData = {};
   if (filters.origin_country_id) {
      searchData.origin_country_id = filters.origin_country_id;
   }
   if (filters.dest_country_id) {
      searchData.dest_country_id = filters.dest_country_id;
   }
   if (filters.start_date) {
      searchData.start_date = filters.start_date.format('DD/MM/YYYY');
   }
   if (filters.end_date) {
      searchData.end_date = moment(filters.end_date).add(1, 'days').format('DD/MM/YYYY');
   }
   return searchData;
}

export const SelectSearchParams = (state) => {
   return state.tickets.fligtsFilters;
}
//SELECTORS
export const SelectFlightsSearch = (state) => {
   const results = state.tickets.flights;
   const tickets = state.tickets.tickets;
   const userTypeId = state.profile.currentUser.userTypeId;
   const statusResults = results.map(res => {
      const resStatus = {
         ...res,
         status: getTicketFlightStatus(res, userTypeId, tickets)
      }
      return resStatus;
   });
   const dicResults = statusResults.reduce((datesMemo, flight) => {
      const departure_date = moment(flight.departure_time).format('DD/MM/YYYY');
      if (!datesMemo[departure_date]) {
         datesMemo[departure_date] = [];
      }
      datesMemo[departure_date].push(flight);
      return datesMemo;
   }, {});

   const arrResults = Object.keys(dicResults).map(date => {
      const result = { date: date, dateFlights: dicResults[date] };
      return result;
   })
   return arrResults;
}

export const SelectFlightById = (flightId) => (state) => {
   const flights = state.tickets.flights;
   const flight = flights.find(fli => fli.flight_id == flightId);
   return flight;
}

export const SelectOrderDetails = (state) => {
   let orderDetails = state.tickets.orderDetails;
   if (orderDetails.seat) {
      const seatChar = orderDetails.seat.split('-').map((organ, index) => {
         if (index === 0) {
            return organ;
         }
         return String.fromCharCode(65 - 1 + parseInt(organ))
      }).join('-');
      orderDetails = {
         ...orderDetails,
         seatChar: seatChar
      }
   }
   else {
      orderDetails = {
         ...orderDetails,
         seatChar: null
      }
   }
   return orderDetails;
}

export const SelectMyTickets = (state) => {
   const tickets = state.tickets.tickets;
   const mapTickets = tickets.map(tick => {
      return {
         ...tick,
         id: tick.ticket_id,
         departure: moment(tick.departure_time, 'DD/MM/YYYY HH:mm:SS'),
         price: parseFloat(tick.price).toFixed(2)
      }
   }).sort((first, second) => {
      return second.departure - first.departure;
   });
   return mapTickets;
}

export const { flitersChanged, orderDetailsChanged, resetOrderDetails, clearTickets , clearTicketsFilters} = ticketsSlice.actions;

export default ticketsSlice.reducer;