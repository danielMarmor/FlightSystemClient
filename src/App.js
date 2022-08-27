import './App.css';
import ReactDOM from 'react-dom/client';
import Layout from './app/components/layout/layout';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/system';
import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { getAlCountries } from './api/cache';
import { Route, Routes } from 'react-router-dom';
//import FlightsList from './features/tickets/components/flightsList/FlightsList' 
import FlightsList from './features/tickets/components/flightsList/FlightsList';
import Login from './features/profiles/components/login/Login';
import SignUp from './features/profiles/components/signUp/SignUp';
import MyUsers from './features/manage/components/myUsers/MyUsers';
import ImageList from './app/components/imageList/imageList';
import FlightForm from './features/flights/components/flight/flightForm/FlightForm';
import MyFlights from './features/flights/components/myFlights/MyFlights';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import ErrorDialogSlide from './app/components/smoothAlerts/ErrorDialogSlide';

function App() { 
  const countries = useQuery('countries', getAlCountries);

  return ( 
    <Layout>
      <LocalizationProvider dateAdapter={AdapterMoment}>
      <div className="App">
          <Grid container spacing={0} sx={{width: '100% !important', height: '100% !important'}}>
             <Grid item xs={10} sx={{padding: '5px'}}>
                <Box sx={{width:'100%', 
                          height:'100%',
                          display: 'flex', 
                          justifyContent :'space-around',
                          alignItems :'center',
                          padding: 0,
                    }}> 
                    {/* ROUTER         */}
                    <Routes>
                      <Route path="/Flights" element={<FlightsList />} />
                      <Route path="/NewFlight" element={<FlightForm />} />
                      <Route path="/MyFlights" element={<MyFlights />} />
                      <Route path="/Login" element={<Login />} />
                      <Route path="/SignUp" element={<SignUp />} />
                      <Route path="/MyUsers" element={<MyUsers />} />                      
                    </Routes>
                </Box>
            </Grid>
            <Grid item xs={2}>
                <Box sx={{backgroundColor:'#15291b',
                          height: '100%',
                          width: '100%'
                }}>
                  <ImageList/>

                </Box>
            </Grid>
        </Grid>       
      </div> 
      <ErrorDialogSlide/>
      </LocalizationProvider> 
    </Layout> 
  );
}

export default App;
