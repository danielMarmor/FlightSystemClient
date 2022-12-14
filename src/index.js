import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline, makeStyles } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query'
import { stopReportingRuntimeErrors } from "react-error-overlay";

const theme = createTheme({
  palette: {
    background: {
      default: "#e9f0eb"
    },
    primary: {
      main: '#15291b'
    }
  },
  spacing: 0

});

console.log('index start');



const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus : false,
      staleTime : Infinity
    }
  }
});

stopReportingRuntimeErrors();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>

);


//"set HTTPS=true&&react-scripts start"

