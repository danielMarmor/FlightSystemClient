import { configureStore } from "@reduxjs/toolkit";
import appReducer from './appSlice';
import flightsReducer from '../features/flights/fligthSlice';
import ticketsReducer from '../features/tickets/ticketsSlice';
import manageReducer from '../features/manage/manageSlice';
import profileReducer from '../features/profiles/profilesSlice';

export default configureStore({
    reducer:{
        app : appReducer,
        tickets: ticketsReducer,
        flights: flightsReducer,
    manage : manageReducer,
        profile: profileReducer
    },
    middleware :(getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
});
