import { createSlice, createAsyncThunk } from "@reduxjs/toolkit/dist";
import { manageActions, entries, status, result, resources} from "../../constants/enums";
import { combineHost } from "../../constants/configuration";
import { client } from "../../api/client";

const initialState = {
    statistics :[], 
    dashboardFilters : {
        fromDate : null,
        toDate : null,
        airlineCompanyId : null
    },
    customersFilters :{
      search : null,
      active : null,
      sortBy : null,
      dircetion : null
    },

    statStatus : status.idle,
    userStatus : status.idle,
    statResult : result.idle,
    userResult : result.idle,
    custStatus : result.idle,
    custResult : result.idle,
}
const manageSlice = createSlice({
    name :'manage',
    initialState,
    reducers :{
        dashbordFromDateChanged(state, action){
            state.dashboardFilters.fromDate = action.payload;
        },
        dashbordToDateChanged(state, action){
            state.dashboardFilters.toDate = action.payload;
        },
        dashbordAirlineChanged(state, action){
            state.dashboardFilters.airlineCompanyId = action.payload;
        }
   },
   extraReducers:builder =>{
        builder
        .addCase(fetchStatistics.pending ,(state, action)=>{
            state.statStatus = status.pending; 
         })
         .addCase(fetchStatistics.fulfilled ,(state, action)=>{
            state.statStatus= status.idle; 
            state.statResult = result.success;
            state.statistics = action.payload;
         })
         .addCase(fetchStatistics.rejected ,(state, action)=>{
            state.statStatus= status.idle; 
            state.statResult  = result.error;
         })
         .addCase(addCustomer.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(addCustomer.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
            //SHOULD HANDLE ADD CUSTOMER TO STATE
         })
         .addCase(addCustomer.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(editCustomer.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(editCustomer.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
            //SHOULD HANDLE UPDATE CUSTOMER TO STATE
         })
         .addCase(editCustomer.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(removeCustomer.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(removeCustomer.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
            //SHOULD HANDLE REMOVE CUSTOMER FROM STATE
         })
         .addCase(removeCustomer.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(addAirline.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(addAirline.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(addAirline.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(editAirline.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(editAirline.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(editAirline.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(removeAirline.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(removeAirline.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(removeAirline.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(addAdministrator.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(addAdministrator.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(addAdministrator.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(editAdministrator.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(editAdministrator.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(editAdministrator.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         .addCase(removeAdministrator.pending ,(state, action)=>{
            state.userStatus = status.pending; 
         })
         .addCase(removeAdministrator.fulfilled ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.success;
         })
         .addCase(removeAdministrator.rejected ,(state, action)=>{
            state.userStatus= status.idle; 
            state.userResult = result.error;
         })
         // .addCase(fetchCustomersBussiness.pending ,(state, action)=>{
         //    state.custStatus = status.pending; 
         // })
         // .addCase(fetchCustomersBussiness.fulfilled ,(state, action)=>{
         //    state.custStatus= status.idle; 
         //    state.custResult = result.success;
         //    state.customers = action.payload;
         // })
         // .addCase(fetchCustomersBussiness.rejected ,(state, action)=>{
         //    state.custStatus= status.idle; 
         //    state.custResult = result.error;
         // })
    }
});

export const fetchCustomersBussiness =createAsyncThunk(manageActions.fetchCustomersBussiness, async(data, thunkApi)=>{
   const searchParams = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}/${resources.customer_bussines}`;
   const customers = await client.get(endpoint, null, searchParams);
   return customers;
});


export const fetchAirlineBussiness=createAsyncThunk(manageActions.fetchAirlineBussiness, async(data, thunkApi)=>{
    const searchParams = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}/${resources.airline_bussines}`;
    const airlines = await client.get(endpoint, null, searchParams);
    return airlines;
});

export const fetchStatistics =createAsyncThunk(manageActions.fetchStatistics, async(data, thunkApi)=>{
   const searchParams = data;
   const entry = entries.admin;
   const endpoint = `${combineHost}/${entry}`;
   const statistics = await client.get(endpoint, null, searchParams);
   return statistics;
});


export const addCustomer =createAsyncThunk(manageActions.addCustomer, async(data, thunkApi)=>{
    const customerData = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const newCustomer = await client.post(endpoint, null, customerData);
    return newCustomer;
});

export const editCustomer =createAsyncThunk(manageActions.editCustomer, async(data, thunkApi)=>{
    const {customerId, customerData} = data;;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {customerId: customerId};
    const reponseStatus = await client.put(endpoint, params, customerData);
    return reponseStatus;
});

export const removeCustomer =createAsyncThunk(manageActions.removeCustomer, async(data, thunkApi)=>{
    const customerId = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {customerId: customerId};
    const responseStatus = await client.remove(endpoint, params, null);
    return responseStatus;
});

export const addAirline =createAsyncThunk(manageActions.addAirline, async(data, thunkApi)=>{
    const airlineData = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const newAirline = await client.post(endpoint, null, airlineData);
    return newAirline;
});

export const editAirline =createAsyncThunk(manageActions.editAirline, async(data, thunkApi)=>{
    const {airlineId, airlineData} = data;;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {airlineId: airlineId};
    const reponseStatus = await client.put(endpoint, params, airlineData);
    return reponseStatus;
});

export const removeAirline =createAsyncThunk(manageActions.removeAirline, async(data, thunkApi)=>{
    const airlineId = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {airlineId: airlineId};
    const responseStatus = await client.remove(endpoint, params);
    return responseStatus;
});
export const addAdministrator =createAsyncThunk(manageActions.addAdministrator, async(data, thunkApi)=>{
    const adminData = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const newAdministrator = await client.post(endpoint, null, adminData);
    return newAdministrator;
});

export const editAdministrator =createAsyncThunk(manageActions.editAdministrator, async(data, thunkApi)=>{
    const {administratorId, adminData} = data;;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {administratorId: administratorId};
    const reponseStatus = await client.put(endpoint, params, adminData);
    return reponseStatus;
});

export const removeAdministrator =createAsyncThunk(manageActions.removeAdministrator, async(data, thunkApi)=>{
    const administratorId = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}`;
    const params = {administratorId: administratorId};
    const responseStatus = await client.remove(endpoint, params);
    return responseStatus;
});


export const {customersFiltersChanged} = manageSlice.actions;

export default manageSlice.reducer;

