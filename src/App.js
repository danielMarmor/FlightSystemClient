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
import SuccessDialogSlide from './app/components/smoothAlerts/SuccesDialogSlide';
import OrderTicket from './features/tickets/components/orderTicket/OrderTicket';
import CustomerForm from './features/profiles/components/customerForm/CustomerForm';
import AirlineForm from './features/profiles/components/airilineForm/AirlineForm';
import AdminForm from './features/profiles/components/adminForm/AdminForm';
import CustomerDetails from './features/profiles/components/customerDetails/CustomerDetails';
import AirlineDetails from './features/profiles/components/airlineDetails/AirlineDetails';
import AdminDetails from './features/profiles/components/adminDetails/AdminDetails';
import PayTicket from './features/tickets/components/payTicket/PayTicket';
import MyTickets from './features/tickets/components/myTickets/MyTickets';


function App() { 
  console.log('app start');
  const {data, isLoading} = useQuery('countries', getAlCountries);
  if (isLoading){
    return(<div></div>);
  }
  const countries = data;

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
                      <Route path="/Flights" element={<FlightsList countries={countries}/>} />
                      <Route path="/Ticket/Order/:flightId" element={<OrderTicket />} />
                      <Route path="/Ticket/Pay/:flightId" element={<PayTicket/>} />
                      <Route path="/MyTickets" element={<MyTickets />} />
                      <Route path="/NewFlight" element={<FlightForm countries={countries}/>} />
                      <Route path="/Profile/Customer/Details/:id" element={<CustomerDetails />} />
                      <Route path="/Profile/Customer/:mode/:customerId" element={<CustomerForm />} />
                      <Route path="/Profile/Airline/Details/:id" element={<AirlineDetails />} />
                      <Route path="/Profile/Airline/:mode/:airlineId" element={<AirlineForm countries={countries}/>} />
                      <Route path="/Profile/Admin/Details/:id" element={<AdminDetails />} />
                      <Route path="/Profile/Admin/:mode/:administratorId" element={<AdminForm />} />
                      <Route path="/MyFlights" element={<MyFlights countries={countries}/>} />
                      <Route path="/Login" element={<Login />} />
                      <Route path="/SignUp" element={<SignUp countries={countries}/>} />
                      <Route path="/MyUsers" element={<MyUsers countries={countries}/>} />                      
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
      <SuccessDialogSlide/>
      </LocalizationProvider> 
    </Layout> 
  );
}

export default App;
