import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { manageActions, entries, status, result, resources, userType } from "../../constants/enums";
import { combineHost } from "../../constants/configuration";
import { client } from "../../api/client";

const initialState = {
   statistics: {
      revenues: [],
      customersPurchases: [],
      airlineSales: [],
      flightCountries: [],
      capacityUtils: []
   }
   ,
   customersFilters: {
      search: null,
      active: null,
      sortBy: null,
      dircetion: null
   },
   myUsersTypeId: userType.anonym,

   statStatus: status.idle,
   statResult: result.idle,
   userStatus: status.idle,
   userResult: result.idle,
   custStatus: result.idle,
   custResult: result.idle
}
const manageSlice = createSlice({
   name: 'manage',
   initialState,
   reducers: {
      dashboardFiltersChanged(state, action) {
         state.dashboardFilters = action.payload;
      },
      myUsersTypeChanged(state, action) {
         state.myUsersTypeId = action.payload;
      },
      resetMyUsersType(state, action) {
         state.myUsersTypeId = userType.anonym;
      },
      clearStatistics(state, action) {
         state.statistics = {};
      },
      resetUserStatus(state, action) {
         state.userStatus = status.idle;
         state.userResult = status.idle;
      }
   },
   extraReducers: builder => {
      builder
         .addCase(addCustomer.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(addCustomer.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            //SHOULD HANDLE ADD CUSTOMER TO STATE
         })
         .addCase(addCustomer.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(editCustomer.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(editCustomer.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            //SHOULD HANDLE UPDATE CUSTOMER TO STATE
         })
         .addCase(editCustomer.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(removeCustomer.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(removeCustomer.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            //SHOULD HANDLE REMOVE CUSTOMER FROM STATE
         })
         .addCase(removeCustomer.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(addAirline.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(addAirline.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(addAirline.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(editAirline.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(editAirline.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(editAirline.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(removeAirline.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(removeAirline.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(removeAirline.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(addAdministrator.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(addAdministrator.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(addAdministrator.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(editAdministrator.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(editAdministrator.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(editAdministrator.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(removeAdministrator.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(removeAdministrator.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(removeAdministrator.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(fetchRevenuesByDates.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(fetchRevenuesByDates.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            state.statistics.revenues = action.payload;
         })
         .addCase(fetchRevenuesByDates.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(fetchPurchasesByCustomers.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(fetchPurchasesByCustomers.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            state.statistics.customersPurchases = action.payload;
         })
         .addCase(fetchPurchasesByCustomers.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(fetchSalesByAirlines.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(fetchSalesByAirlines.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            state.statistics.airlineSales = action.payload;
         })
         .addCase(fetchSalesByAirlines.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(fetchCapcityUtilization.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(fetchCapcityUtilization.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
            state.statistics.capacityUtils = action.payload;
         })
         .addCase(fetchCapcityUtilization.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
         .addCase(fetchCustomersBussiness.pending, (state, action) => {
            state.userStatus = status.pending;
         })
         .addCase(fetchCustomersBussiness.fulfilled, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.success;
         })
         .addCase(fetchCustomersBussiness.rejected, (state, action) => {
            state.userStatus = status.idle;
            state.userResult = result.error;
         })
   }
});


export const fetchAirlineBussiness = createAsyncThunk(manageActions.fetchAirlineBussiness, async (data, thunkApi) => {
   const searchParams = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.airline_bussines}`;
   const airlines = await client.get(endpoint, null, searchParams);
   return airlines;
});

export const fetchStatistics = createAsyncThunk(manageActions.fetchStatistics, async (data, thunkApi) => {
   const searchParams = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}`;
   const statistics = await client.get(endpoint, null, searchParams);
   return statistics;
});

export const fetchAdminById = createAsyncThunk(manageActions.fetchAdminById, async (data, thunkApi) => {
   const administratorId = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.administrators}`;
   const param = { administratorId: administratorId }
   const administrator = await client.get(endpoint, param, null);
   return administrator;
});

export const addCustomer = createAsyncThunk(manageActions.addCustomer, async (data, thunkApi) => {
   const customerData = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customers}`;
   const newCustomer = await client.post(endpoint, null, customerData);
   return newCustomer;
});
//IN THIS SLICE === DONE BY MANAGER OFFCOURSE( EDIR CUSTOMER THUNK ALSO INITIATED BY CUSTOMER ITSELF ON 'PROFILE SLICE')
export const editCustomer = createAsyncThunk(manageActions.editCustomer, async (data, thunkApi) => {
   const { customerId, customerData } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customers}`;
   const params = { customerId: customerId };
   const reponseData = await client.put(endpoint, params, customerData);
   return reponseData;
});
//CAN BE DISPATCHED BY ADMIN IN 2 OPTIONS
//1- IN MYUSERS/CUSTOMERS LIST DELETE ICON ('TRASH')
//2= IN CUSTOMER PROFILE DETAILS
export const removeCustomer = createAsyncThunk(manageActions.removeCustomer, async (data, thunkApi) => {
   const customerId = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customers}`;
   const params = { customerId: customerId };
   const responseStatus = await client.remove(endpoint, params, null);
   return responseStatus;
});
//CAN BE DISPATCHED BY ADMIN BY  '+' BUTTON IN 'MYUSERS' COMPONENT 
export const addAirline = createAsyncThunk(manageActions.addAirline, async (data, thunkApi) => {
   const airlineData = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
   const newAirline = await client.post(endpoint, null, airlineData);
   return newAirline;
});
//BY MANAGER (SIBLING DISPATCH ==> BY  CUSTOMER ITSELF)
export const editAirline = createAsyncThunk(manageActions.editAirline, async (data, thunkApi) => {
   const { airlineId, airlineData } = data;;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
   const params = { airlineId: airlineId };
   //REGULAR UPDATE ===> PROFILE NOT UPDATED ===> RESPONSE STATUS
   const response = await client.put(endpoint, params, airlineData);
   return true;
});

export const removeAirline = createAsyncThunk(manageActions.removeAirline, async (data, thunkApi) => {
   const airlineId = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
   const params = { airlineId: airlineId };
   const responseStatus = await client.remove(endpoint, params);
   return responseStatus;
});
export const addAdministrator = createAsyncThunk(manageActions.addAdministrator, async (data, thunkApi) => {
   const adminData = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.administrators}`;
   const newAdministrator = await client.post(endpoint, null, adminData);
   return newAdministrator;
});

export const editAdministrator = createAsyncThunk(manageActions.editAdministrator, async (data, thunkApi) => {
   const { administratorId, adminData } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.administrators}`;
   const params = { administratorId: administratorId };
   const reponseStatus = await client.put(endpoint, params, adminData);
   return reponseStatus;
});

export const removeAdministrator = createAsyncThunk(manageActions.removeAdministrator, async (data, thunkApi) => {
   const administratorId = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.administrators}`;
   const params = { administratorId: administratorId };
   const responseStatus = await client.remove(endpoint, params);
   return responseStatus;
});

export const fetchCustomersBussiness = createAsyncThunk(manageActions.fetchCustomersBussiness, async (data, thunkApi) => {
   const search = data;
   const searchParams = { 'search': search };
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customer_bussines}`;
   const customers = await client.get(endpoint, null, searchParams);
   return customers;
});

export const fetchRevenuesByDates = createAsyncThunk(manageActions.fetchRevenuesByDates, async (data, thunkApi) => {
   const { start_date, end_date, destination_country_id } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.revenues}`;
   const search = { start_date: start_date, end_date: end_date, destination_country_id: destination_country_id };
   const revenues = await client.get(endpoint, null, search);
   return revenues;
});

export const fetchPurchasesByCustomers = createAsyncThunk(manageActions.fetchPurchasesByCustomers, async (data, thunkApi) => {
   const { start_date, end_date, destination_country_id } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.purchases}`;
   const search = { start_date: start_date, end_date: end_date, destination_country_id: destination_country_id };
   const purchases = await client.get(endpoint, null, search);
   return purchases;
});

export const fetchSalesByAirlines = createAsyncThunk(manageActions.fetchSalesByAirlines, async (data, thunkApi) => {
   const { start_date, end_date, destination_country_id } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.sales}`;
   const search = { start_date: start_date, end_date: end_date, destination_country_id: destination_country_id };
   const sales = await client.get(endpoint, null, search);
   return sales;
});

export const fetchFlightsCountByCountries = createAsyncThunk(manageActions.fetchFlightsCountByCountries, async (data, thunkApi) => {
   const { start_date, end_date, destination_country_id } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.flights_count}`;
   const search = { start_date: start_date, end_date: end_date, destination_country_id: destination_country_id };
   const countFlights = await client.get(endpoint, null, search);
   return countFlights;
});

export const fetchCapcityUtilization = createAsyncThunk(manageActions.fetchCapacityUtilization, async (data, thunkApi) => {
   const { start_date, end_date, destination_country_id } = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.capacities}`;
   const search = { start_date: start_date, end_date: end_date, destination_country_id: destination_country_id };
   const countFlights = await client.get(endpoint, null, search);
   return countFlights;
});

export const SelectRevenuesByDates = (state) => {
   const revenues = state.manage.statistics.revenues;
   return revenues;
}
export const SelectPurchasers = (state) => {
   const purchaseres = state.manage.statistics.customersPurchases;
   return purchaseres;
}

export const SelectAirlinesSales = (state) => {
   const sales = state.manage.statistics.airlineSales;
   return sales;
}

export const SelectMyUsersType = (state) => {
   const myUsersTypeId = state.manage.myUsersTypeId;
   return myUsersTypeId;
}

export const SelectCapcityUtils = (state) => {
   const capacityUtils = state.manage.statistics.capacityUtils;
   const utilization = capacityUtils && capacityUtils[0] || {};
   return utilization;
}

export const { customersFiltersChanged,
   clearStatistics,
   resetUserStatus,
   myUsersTypeChanged,
   resetMyUsersType } = manageSlice.actions;

export default manageSlice.reducer;

