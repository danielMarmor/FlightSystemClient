import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit/dist";
import ticketsSlice, { fetchTickets, clearTickets, clearTicketsFilters } from "../tickets/ticketsSlice";
import fligthSlice, { fetchAirline, fetchFlights, clearFlights } from "../flights/fligthSlice";
import manageSlice, { clearStatistics, resetMyUsersType } from "../manage/manageSlice";
import { userType, profileActions, entries, resources, status, result, loginErrorTemplate } from "../../constants/enums";
import { convertUserTypeToEntry } from "../../constants/converters";
import { combineHost, authentication } from "../../constants/configuration";
import { client } from "../../api/client";

const initialState = {
    currentUser: {
        userTypeId: userType.anonym,
        username: null,
        identityId: null
    },
    greetingName: '',
    profileStatus: status.idle,
    profileResult: result.idle
}
const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        tokenAccepted(state, action) {
            const { user_role_id, identity } = action.payload;
            state.currentUser.userTypeId = user_role_id;
            switch (state.currentUser.userTypeId) {
                case userType.customer:
                case userType.admin:
                    state.currentUser.username = `${identity.first_name} ${identity.last_name}`;
                    break;
                case userType.airline:
                    state.currentUser.username = `${identity.name}`;
                    break;
            }

            state.currentUser.identityId = identity.id;
        },
        logout(state, action) {
            window.localStorage.removeItem('userData');
            state.currentUser = {
                userTypeId: userType.anonym,
                username: null,
                identityId: null
            };
        }
    },

    extraReducers: builder => {
        builder
            //LOGIN
            .addCase(login.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                const succeeded = action.payload;
                state.profileResult = succeeded ? result.success : result.error;
            })
            .addCase(login.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
            //FETCH CUSTOMER 
            .addCase(fetchCustomerById.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(fetchCustomerById.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = result.success;
            })
            .addCase(fetchCustomerById.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
            //ADD CUSTOMER
            .addCase(addCusotmer.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(addCusotmer.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                const succeeded = action.payload;
                state.profileResult = succeeded ? result.success : result.error;
            })
            .addCase(addCusotmer.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
            //EDIT CUSTOMER
            .addCase(editCustomer.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(editCustomer.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                const succeeded = action.payload;
                state.profileResult = succeeded ? result.success : result.error;
            })
            .addCase(editCustomer.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
            //ADD AIRLINE
            .addCase(addAirline.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(addAirline.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                const succeeded = action.payload;
                state.profileResult = succeeded ? result.success : result.error;
            })
            .addCase(addAirline.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
            //EDIT AIRLINE
            .addCase(editAirline.pending, (state, action) => {
                state.profileStatus = status.pending;
            })
            .addCase(editAirline.fulfilled, (state, action) => {
                state.profileStatus = status.idle;
                const succeeded = action.payload;
                state.profileResult = succeeded ? result.success : result.error;
            })
            .addCase(editAirline.rejected, (state, action) => {
                state.profileStatus = status.idle;
                state.profileResult = status.error;
            })
    }
});

export const login = createAsyncThunk(profileActions.login, async (data, thunkApi) => {
    const loginData = data;
    const entry = entries.anonym;
    const endpoint = `${combineHost}/${entry}/${resources.login}`;
    //CLEAR PROFILE
    await thunkApi.dispatch(clearProfile({})).unwrap();
    //LOGIN
    const userToken = await client.post(endpoint, null, loginData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    const globalState = thunkApi.getState();
    //FETCH IDENETITY = CUSTOMER ID 
    const userTypeId = globalState.profile.currentUser.userTypeId;
    switch (userTypeId) {
        case userType.customer:
            const customerId = globalState.profile.currentUser.identityId;
            //LOAD TICKETS
            await thunkApi.dispatch(fetchTickets(customerId));
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

export const recreateSession = createAsyncThunk(profileActions.recreateSession, async (data, thunkApi) => {
    const userDataStorage = window.localStorage.getItem('userData');
    if (!userDataStorage) {
        return false;
    }
    //GET USER DATA FROM SESSION
    const userData = JSON.parse(userDataStorage);
    thunkApi.dispatch(tokenAccepted(userData));
    const profile = thunkApi.getState().profile.currentUser;
    //RECREATE USER STATE
    switch (profile.userTypeId) {
        case userType.customer:
            const customerId = profile.identityId;
            //LOAD TICKETS
            await thunkApi.dispatch(fetchTickets(customerId));
            break;
        case userType.airline://WRIRE CODE!
            const airlineId = profile.identityId;
            await thunkApi.dispatch(fetchAirline(airlineId));
            await thunkApi.dispatch(fetchFlights(airlineId));
            break;
        case userType.admin://WRITE CODE !
            break;
    }
    return true;
});
export const fetchCustomerById = createAsyncThunk(profileActions.fetchCutomerById, async (data, thunkApi) => {
    const customerId = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.customers}`;
    const params = { id: customerId };
    const customer = await client.get(endpoint, params, null);
    return customer;

});

//IN THIS SLICE ===>BY SIGN UP ONLY!
export const addCusotmer = createAsyncThunk(profileActions.addCustomer, async (data, thunkApi) => {
    const customerData = data;
    const entry = entries.anonym;
    const endpoint = `${combineHost}/${entry}/${resources.customers}`;
    await thunkApi.dispatch(clearProfile({})).unwrap();
    const userToken = await client.post(endpoint, null, customerData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    return true;
});
//EDIT BY CUSTOMER SELF ONLY
export const editCustomer = createAsyncThunk(profileActions.editCustomer, async (data, thunkApi) => {
    const { customerId, customerData } = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.customers}`;
    const params = { customerId: customerId };
    //ATER UPDATE ON SERVER ====> NEW LOGIN  PROCEDURE (TOKEN...)
    //===> BECAUSE USER DETAILS (USER, PASSWORD) MIGHT BE EDITED BY CUSTOMER USER ITSELF IN THE FORM
    const userToken = await client.put(endpoint, params, customerData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    return true;
});
//IN THIS SLICE ===>BY 'SIGN UP' COMPONENT ONLY! (ON 'MANAGE SLICE' ==> DONE BY ADMIN)
export const addAirline = createAsyncThunk(profileActions.addAirline, async (data, thunkApi) => {
    const airlineData = data;
    const entry = entries.anonym;
    const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
    await thunkApi.dispatch(clearProfile({})).unwrap();
    const userToken = await client.post(endpoint, null, airlineData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    //PARSE TOKEN AND SET CURR USER
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    const globalState = thunkApi.getState();
    const airlineId = globalState.profile.currentUser.identityId;
    await thunkApi.dispatch(fetchAirline(airlineId));
    return true;
});
//IN 'PROFILE SLICE' ===> BY AIRLINE
export const editAirline = createAsyncThunk(profileActions.editAirline, async (data, thunkApi) => {
    const { airlineId, airlineData } = data;
    const globalState = thunkApi.getState();
    const userTypeId = globalState.profile.currentUser.userTypeId;
    const entry = convertUserTypeToEntry(userTypeId);
    const endpoint = `${combineHost}/${entry}/${resources.airlines}`;
    const params = { airlineId: airlineId };
    const userToken = await client.put(endpoint, params, airlineData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    //ATER UPDATE ON SERVER ====> NEW LOGIN  PROCEDURE (TOKEN...)
    //===> BECAUSE USER DETAILS (USER, PASSWORD) MIGHT BE EDITED BY AIRLINE USER ITSELF IN THE FORM
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    return true;
});
//BY CURENT USER PROFILE
export const editAdministrator = createAsyncThunk(profileActions.editAdministrator, async (data, thunkApi) => {
    const { administratorId, adminData } = data;
    const entry = entries.admin;
    const endpoint = `${combineHost}/${entry}/${resources.administrators}`;
    const params = { administratorId: administratorId };
    const userToken = await client.put(endpoint, params, adminData);
    //STORE USER DETAILS IN SESSION
    const storageData = JSON.stringify(userToken.payload);
    window.localStorage.setItem('userData', storageData);
    thunkApi.dispatch(tokenAccepted(userToken.payload));
    return true;
});

export const clearProfile = createAsyncThunk(profileActions.ClearProfile, async (data, thunkApi) => {
    thunkApi.dispatch(clearTickets({}));
    thunkApi.dispatch(clearFlights({}));
    thunkApi.dispatch(clearStatistics({}));
    thunkApi.dispatch(clearTicketsFilters({}))
    thunkApi.dispatch(resetMyUsersType({}))
    //REMVOE FROM SESSION
    return true;
});

export const { tokenAccepted, logout } = profileSlice.actions;

export const SelectUserTypeId = (state) => state.profile.currentUser.userTypeId;
export const SelectIdentityId = (state) => state.profile.currentUser.identityId;
export const SelectFirstName = (state) => {
    const user = state.profile.currentUser;
    if (user.userTypeId != userType.customer) {
        return '';
    }
    const firstName = user.username.split(' ')[0];
    return firstName;
}
export const SelectGreetingName = (state) => {
    const userName = state.profile.currentUser.username;
    const userTypeId = state.profile.currentUser.userTypeId;
    if (!userName || !userTypeId){
        return null;
    }
    let name;
    //BY TYPE
    switch (userTypeId) {
        case userType.customer:
        case userType.admin:
            name = userName.split(' ')[0];
            break;
        case userType.airline:
            name = userName;
            break;
    }
    return name;
}

export default profileSlice.reducer;