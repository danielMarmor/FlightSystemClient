import React, { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FlightModel, costPerKm, speed } from '../../../models/flightModel';
import DoubleForm from '../../../../../app/components/layout/DoubleForm';
import ActionGrid from '../../../../../app/components/ActionGrid';
import { AutoCompleteBox, DatePickerStyle } from '../../../../../app/components/FormStyles';
import { SelectAirline, SelectFlightById } from '../../../fligthSlice';
import { CompareByCountryName } from '../../../../../utilities/compare';
import { CapacityModels } from '../../../../../constants/commonLists';
import StraightIcon from '@mui/icons-material/Straight';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import FlagIcon from '@mui/icons-material/Flag';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import {
  Box, Stack, TextField, FormControl, InputLabel, Avatar,
  Select, MenuItem, OutlinedInput, Typography, InputAdornment
} from '@mui/material'
import {
  HorizonStack, CenterBox, LeftCenterBox, SubHeaderTypography,
  VerticalStack, FormButton, FormTextField
} from '../../../../../app/components/FormStyles';
import { FlightValidations as validations } from '../../../../../models/validation';
import { endpoints } from '../../../../../constants/configuration';
import { catchAppError, showSuccessMessage } from '../../../../../app/appSlice';
import { fields, FlightErrorTemplate, FlightSuccessTemplate } from '../../../../../constants/enums';
import { addFlight, editFlight } from '../../../fligthSlice';
import createFlight from '../../../../../assets/airlines.jpg';
import FilightMap from '../../FilightMap';
import { geolocation } from '../../../../../constants/configuration';
import moment from 'moment';

const primaryColor = '#15291b';
const DATES_FORMAT = "DD/MM/yyyy HH:mm"

const model = new FlightModel();

const FlightFormNew = ({ countries }) => {
  let search = window.location.search;
  let params = new URLSearchParams(search);
  const mode = params.get('mode');
  const flightId = params.get('id');

  const airline = useSelector(SelectAirline);
  //CURENNT FLIGHT IF EDIT ELSE UNDEFINED
  const flight = useSelector(SelectFlightById(flightId));
  const airConfig = endpoints.airlineCompanies;
  const logoWidth = 100;
  const logoHeight = 40;
  //IF CUSOTMERS BOUGHT TICKETS ====> 
  //CANNOT CHANGE  ORIGIN, DEST, DETARTURE TIME, CAPACITY AND NUM SEATS
  //CAN CHANGE ONLY PRICE OF TICKET, ADAPTED BY CHANGE IN CUSTOMER DEMANDS AND BUSINNES NEEDS OF AIRLINE
  const disableChanges = flight && flight.disable_changes;

  const airlineLogoUrl = airline && (!airline.iata || airline.iata.length < 2 ? null : `url(${airConfig.logoPrefix}${logoWidth}/${logoHeight}/${airline.iata}${airConfig.logoPostfix})`);

  let initFlight;
  if (mode == 'insert') {
    initFlight = {
      airline_company_id: airline.id
    }
  }//(mode == 'edit')
  else {
    if (!flight.flightNumber) {
      throw Error('Flight Not Found!');
    }
    initFlight = flight;
  }

  const navigate = useNavigate();
  const dispatch = useDispatch();
  //HEADER 
  const [flightData, setFlightData] = useState(initFlight);

  const origCountryFlagUrl = flightData.origin_country_name ? (`url(${endpoints.countriesFlags}${flightData.origin_country_name})`).replace(' ', '%20'): null;
  const destCountryFlagUrl = flightData.destination_country_name ? (`url(${endpoints.countriesFlags}${flightData.destination_country_name})`).replace(' ', '%20') : null;

  useEffect(() => {
    try {
      const loadMarkers = async () => {
        try {
          await model.addMarkers(flightData.origin_country_name, flightData.destination_country_name);
          const updatedMarkersData = model.retval;
          setFlightData(updatedMarkersData);
        }
        catch (err) {
          handleError(err);
        }
      }
      model.setParams(countries);
      model.copyData(flightData);
      loadMarkers();
    }
    catch (err) {
      handleError(err);
    }
  }, []);

  const handleOriginCountrySelected = async (name) => {
    try {
      model.copyData(flightData);
      await model.originCountryUpdated(name);
      const newData = model.retval;
      //checkDistance(newData);    
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }
  }

  const handleDepartureChanged = (value) => {
    try {
      model.copyData(flightData);
      model.departureTimeUpdated(value);
      const newData = model.retval;
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }

  }

  const handleDestinationCountrySelected = async (name) => {
    try {
      model.copyData(flightData);
      await model.destCountryUpdated(name);
      const newData = model.retval;
      //checkDistance(newData);    
      setFlightData(newData);
    } catch (err) {
      handleError(err);
    }
  }

  const handleLandingChanged = (value) => {
    try {
      model.copyData(flightData);
      model.landingTimeUpdated(value);
      const newData = model.retval;
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }
  }

  const handleCapacityChange = (e) => {
    try {
      model.copyData(flightData);
      model.capacityModelUpdated(e.target.value);
      const newData = model.retval;
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }
  }

  const handleDistanceChange = (e) => {
    try {
      model.copyData(flightData);
      model.distanceUpdated(e.target.value);
      const newData = model.retval;
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }
  }

  const handlePriceChange = (e) => {
    try {
      model.copyData(flightData);
      model.priceUpdated(e.target.value);
      const newData = model.retval;
      setFlightData(newData);
    }
    catch (err) {
      handleError(err);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      validate();
      if (mode == 'insert') {
        const newFlight = await dispatch(addFlight(flightData)).unwrap();
        const myFlightsUrl = '/MyFlights';
        const message = `Commited Successfuly! Flight ${airline.iata}-${newFlight.id} created`
        dispatch(showSuccessMessage(FlightSuccessTemplate(message, myFlightsUrl)))
      }
      else {//(mode == 'edit')
        const data = { flightId: flightId, flight: flightData }
        const response = await dispatch(editFlight(data)).unwrap();
        const myFlightsUrl = '/MyFlights';
        const message = `Commited Successfuly! Flight ${airline.iata}-${flightId} updated`
        dispatch(showSuccessMessage(FlightSuccessTemplate(message, myFlightsUrl)))
      }
    }
    catch (err) {
      handleError(err);
    }
  }

  const validate = () => {
    //ORIG SELECTED
    let errorMessage;
    if (isNaN(flightData.origin_country_id)) {
      errorMessage = 'Select a valid origin country!';
      throw Error(errorMessage);
    }
    //DEST SELECTED
    if (isNaN(flightData.destination_country_id)) {
      errorMessage = 'Select a valid destination country!';
      throw Error(errorMessage);
    }
    //DEPARTUE FORMAT
    if (moment(flightData.departure_time).format(DATES_FORMAT) == 'Invalid date') {
      errorMessage = 'Select a valid departure time';
      throw Error(errorMessage);
    }
    if (moment(flightData.landing_time).format(DATES_FORMAT) == 'Invalid date') {
      errorMessage = 'Select a valid landing time';
      throw Error(errorMessage);
    }
  }
  const handleCancel = () => {
    navigate(-1);
  }

  const handleError = (err) => {
    dispatch(catchAppError(FlightErrorTemplate(err.message)))
  }

  const formConfig = {
    proportions: {
      relGrid: 6,
      relActions: 1
    },
    grdDimentions: {
      horiz: 2,
      vert: 6
    },
    gaps: {
      rowGap: 25,
      colGap: 20
    },
    padding: {
      top: 10,
      bottom: 10,
      right: 5,
      left: 5
    }
  };
  const formCtrls = [
    <AutoCompleteBox key={1}
      freeSolo
      id="originCountry"
      name="originCountry"
      value={flightData.origin_country_name || ''}
      readOnly={disableChanges}
      onChange={(event, name) => {
        handleOriginCountrySelected(name)
      }}
      disableClearable
      options={countries.map((option) => option.name).sort(CompareByCountryName)}
      renderInput={(params) => (
        <TextField
          size="small"
          required={validations(fields.origin_country_name).required}
          sx={{ width: '100%', color: 'black' }}
          {...params}
          label="Origin Country"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: <InputAdornment position="start">
              <FlagIcon sx={{ color: '#15291b' }} />
            </InputAdornment>,
            endAdornment: <InputAdornment position="end">
              <div style={{
                backgroundImage: origCountryFlagUrl,
                backgroundSize: 'cover',
                width: '2.1rem',
                height: '1.4rem',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
              </div>
            </InputAdornment>
          }}
          onChange={
            (e) => handleOriginCountrySelected(e.target.value)
          }
        />
      )}
    />,
    <DateTimePicker key={2}
      label="Departure Time"
      value={flightData.departure_time || ''}
      inputFormat="DD/MM/yyyy HH:mm"
      readOnly={disableChanges}
      onChange={(newValue) => {
        handleDepartureChanged(newValue);
      }}
      // PopperProps={{
      //   sx: DatePickerStyle
      // }}
      InputAdornmentProps={{ position: 'start' }}
      InputProps={{ sx: { "& .MuiSvgIcon-root": { color: '#15291b' } } }}
      renderInput={(params) =>
        <TextField
          required={validations(fields.departure_time).required}
          sx={{ color: 'black' }}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          {...params} />
      }
    />,
    //DEST COUNTRY
    <AutoCompleteBox key={3}
      freeSolo
      id="destCountry"
      name="destCountry"
      value={flightData.destination_country_name || ''}
      readOnly={disableChanges}
      onChange={(event, name) => {
        handleDestinationCountrySelected(name)
      }}
      disableClearable
      options={countries.map((option) => option.name).sort(CompareByCountryName)}
      renderInput={(params) => (
        <TextField
          size="small"
          sx={{ width: '100%', color: 'black' }}
          required={validations(fields.dest_country_name).required}
          {...params}
          label="Destination Country"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            type: 'search',
            startAdornment: <InputAdornment position="start">
              <FlagIcon sx={{ color: '#15291b' }} />
            </InputAdornment>,
            endAdornment: <InputAdornment position="end">
              <div style={{
                backgroundImage: destCountryFlagUrl,
                backgroundSize: 'cover',
                width: '2.1rem',
                height: '1.4rem',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
              }}>
              </div>
            </InputAdornment>
          }}
          onChange={
            (e) => handleDestinationCountrySelected(e.target.value)
          }
        />
      )}
    />,
    //LANDING TIME
    <DateTimePicker key={4}
      label="Landing Time"
      value={flightData.landing_time || ''}
      inputFormat="DD/MM/yyyy HH:mm"
      readOnly={disableChanges}
      onChange={(newValue) => {
        handleLandingChanged(newValue);
      }}
      // PopperProps={{
      //   sx: DatePickerStyle
      // }}
      InputAdornmentProps={{ position: 'start' }}
      InputProps={{ sx: { "& .MuiSvgIcon-root": { color: '#15291b' } } }}
      renderInput={(params) =>
        <TextField
          required={validations(fields.landing_time).required}
          sx={{ color: 'black' }}
          InputLabelProps={{
            shrink: true,
          }}
          size="small"
          {...params} />
      }
    />,
    //PLAIN AND CAPACITY (NUM SEATS) 
    <FormControl key={5} fullWidth>
      <InputLabel shrink={true}>Capacity</InputLabel>
      <Select
        size="small"
        name='capcityModel'
        value={flightData.capacityModelId || ''}
        required={validations(fields.num_seats).required}
        onChange={handleCapacityChange}
        readOnly={disableChanges}
        input={
          <OutlinedInput
            style={{
              height: 40,
              boxSizing: 'border-box',
              color: 'black',
            }}
          />
        }>
        {CapacityModels.map(model =>
          <MenuItem key={model.id} value={model.id}>{model.name}</MenuItem>
        )}
      </Select>
    </FormControl>,
    <TextField key={6} size='small'
      name='distance'
      label="Distance (Km)"
      variant='outlined'
      type={validations(fields.distance).type}
      required={validations(fields.distance).required}
      readOnly={disableChanges}
      onChange={handleDistanceChange}
      value={`${flightData.distance || flightData.distance == 0 ? flightData.distance : ''}`}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <StraightIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={7} size='small'
      name='price'
      label="Price Per Ticket"
      variant='outlined'
      type={validations(fields.price).type}
      required={validations(fields.price).required}
      value={`${flightData.price || flightData.price == 0 ? Math.round(flightData.price) : ''}`}
      onChange={handlePriceChange}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <AttachMoneyIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={8} size='small'
      name='fuelCost'
      label="Fuel Cost/ Km"
      variant='outlined'
      value={`${costPerKm} $`}
      type='text'
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <LocalGasStationIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={9} size='small'
      name='totalIncome'
      label="Total Income (Potential)"
      variant='outlined'
      type='number'
      value={`${flightData.revenues || flightData.revenues == 0 ? Math.round(flightData.revenues) : ''}`}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <AttachMoneyIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={10} size='small'
      name='totaCost'
      label="Total Cost"
      variant='outlined'
      type='number'
      value={`${flightData.cost || flightData.cost == 0 ? Math.round(flightData.cost) : ''}`}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <AttachMoneyIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={11} size='small'
      name='profit'
      label="Profit"
      variant='outlined'
      type='number'
      value={`${flightData.profit || flightData.profit == 0 ? Math.round(flightData.profit) : ''}`}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <AttachMoneyIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />,
    <TextField key={12} size='small'
      name='margin'
      label="Margin (%)"
      variant='outlined'
      type='number'
      value={`${flightData.margin || flightData.margin == 0 ? Math.round(flightData.margin) : ''}`}
      InputProps={{
        style: {
          height: 40,
          textAlign: 'center',
          color: 'black'
        },
        startAdornment: <InputAdornment position="start">
          <PercentIcon sx={{ color: primaryColor }} />
        </InputAdornment>
      }}
    />

  ];
  const formActions = [
    <FormButton key={1} type='submit'
      style={{ color: 'white', flex: '1' }}
    >
      Save
    </FormButton>,
    <FormButton key={2}
      style={{ color: 'white', flex: '1' }}
      onClick={() => handleCancel()}
    >
      Cancel
    </FormButton>
  ];

  return (
    <DoubleForm
      header={
        <HorizonStack sx={{ width: 1 }}
        >
          <HorizonStack sx={{ width: 0.5 }}
          >
            <LeftCenterBox
              sx={{
                width: 0.5,
                textOverflow: 'elipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap'
              }}
            >
              <SubHeaderTypography>{`${airline.name}(${airline.iata})`}</SubHeaderTypography>
            </LeftCenterBox>

            <Box sx={{ width: 0.5 }}
              height={'100%'}
              m={0} p={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems='flex-start'
            >
              <Box sx={{
                width: '100px',
                height: '40px',
                borderStyle: 'none',
                borderWidth: '1px',
                borderColor: 'ligthGrey',
                backgroundImage: airlineLogoUrl,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
              }}>
              </Box>
            </Box>
          </HorizonStack>
          <HorizonStack sx={{ width: 0.25 }}
            justifyContent={'flex-start'}>
            <SubHeaderTypography>{`${(flight && flight.flightNumber) || ''}`}</SubHeaderTypography>
          </HorizonStack>
          <HorizonStack sx={{ width: 0.25, paddingRight: '15px' }}
            justifyContent={'flex-end'}>
            <SubHeaderTypography>{(flight && `Sold Tickets: ${flight.num_seats - flight.remaining_tickets}`) || ''}</SubHeaderTypography>
          </HorizonStack>
        </HorizonStack>
      }
      leftForm={
        <form
          style={{ width: '100%', height: '100%' }}
          onSubmit={handleSubmit}
        >
          <ActionGrid config={formConfig}
            formCtrls={formCtrls}
            formActions={formActions}
          />
        </form>
      }
      rightFrom={
        <Box
          flex={1}
          width={'100%'}
        >
          <FilightMap
            center={{ lat: -34.397, lng: 150.644 }}
            isMarkerShown
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${geolocation.geocoderApiKey}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `480px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            markers={flightData.markers}
          />
        </Box>
      }
    />

  )
}

export default FlightFormNew
