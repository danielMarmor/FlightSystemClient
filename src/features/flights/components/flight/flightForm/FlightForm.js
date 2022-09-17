import React, { useEffect } from 'react';
import { useState } from 'react';
import {
    Box, Stack, TextField, FormControl, InputLabel,
    Select, MenuItem, OutlinedInput, Typography
} from '@mui/material'
import { FormFrameBox } from '../../../../../app/components/FormStyles';
import ActionGrid from '../../../../../app/components/ActionGrid';
import { FormTextField, FormButton } from '../../../../../app/components/FormStyles';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AutoCompleteBox } from '../../../../../app/components/FormStyles';
import FlagIcon from '@mui/icons-material/Flag';
import InputAdornment from '@mui/material/InputAdornment';
import { CompareByCountryName } from '../../../../../utilities/compare';
import { numbers, endpoints } from '../../../../../constants/configuration';
import { CapacityModels } from '../../../../../constants/commonLists';
import StraightIcon from '@mui/icons-material/Straight';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import moment from 'moment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { addFlight, editFlight } from '../../../fligthSlice';
import { SelectAirline, SelectFlightById } from '../../../fligthSlice';
import { useSelector, useDispatch } from 'react-redux';
import createFlight from '../../../../../assets/airlines.jpg';
import { FlightModel, costPerKm, speed } from '../../../models/flightModel';
import FilightMap from '../../FilightMap';
import { geolocation } from '../../../../../constants/configuration';
import { catchAppError, showSuccessMessage } from '../../../../../app/appSlice';
import { fields, FlightErrorTemplate, FlightSuccessTemplate } from '../../../../../constants/enums';
import { FlightValidations as validations } from '../../../../../models/validation';


const primaryColor = '#15291b';
const DATES_FORMAT = "DD/MM/yyyy HH:mm"

//FLIGHT MODEL
const model = new FlightModel();

const FlightForm = ({ countries }) => {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    const mode = params.get('mode');
    const flightId = params.get('id');
    //COUNTRIES
    //CURRENT AIRLINE
    const airline = useSelector(SelectAirline);
    //CURENNT FLIGHT IF EDIT ELSE UNDEFINED
    const flight = useSelector(SelectFlightById(flightId));
    //IF CUSOTMERS BOUGHT TICKETS ====> 
    //CANNOT CHANGE  ORIGIN, DEST, DETARTURE TIME, CAPACITY AND NUM SEATS
    //CAN CHANGE ONLY PRICE OF TICKET, ADAPTED BY CHANGE IN CUSTOMER DEMANDS AND BUSINNES NEEDS OF AIRLINE
    //INIT
    const disableChanges = flight && flight.disable_changes;
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
    //DEPRTURE DATE
    //COUNTRIES
    const origCountryFlagUrl = flightData.origin_country_name ? `url(${endpoints.countriesFlags}${flightData.origin_country_name})` : null;
    const destCountryFlagUrl = flightData.destination_country_name ? `url(${endpoints.countriesFlags}${flightData.destination_country_name})` : null;

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
    const checkDistance = (data) => {
        if ((data.origin_country_id && data.destination_country_id) && (!data.distance && data.distance !== 0)) {
            const distanceMessage = 'Geolocation Service unavailiable. Type distance manualy'
            handleError({ message: distanceMessage });
        }
    }
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

    const formCtrls = [
        //ORIGIN COUNTRY
        <AutoCompleteBox
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
                                backgroundRepeat: 'no-repeat'
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
        <DateTimePicker
            label="Departure Time"
            value={flightData.departure_time || ''}
            inputFormat="DD/MM/yyyy HH:mm"
            readOnly={disableChanges}
            onChange={(newValue) => {
                handleDepartureChanged(newValue);
            }}
            InputAdornmentProps={{ position: 'start' }}
            renderInput={(params) =>
                <TextField
                    required={validations(fields.departure_time).required}
                    sx={{
                        color: 'black',
                        '& .MuiSvgIcon-root': {
                            color: '#15291b !important'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size="small"
                    {...params} />
            }
        />,
        //DEST COUNTRY
        <AutoCompleteBox
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
                                backgroundRepeat: 'no-repeat'
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
        <DateTimePicker
            label="Landing Time"
            value={flightData.landing_time || ''}
            inputFormat="DD/MM/yyyy HH:mm"
            readOnly={disableChanges}
            onChange={(newValue) => {
                handleLandingChanged(newValue);
            }}
            InputAdornmentProps={{ position: 'start' }}
            renderInput={(params) =>
                <TextField
                    required={validations(fields.landing_time).required}
                    sx={{
                        color: 'black',
                        '.MuiSvgIcon-root': {
                            color: '#15291b !important'
                        }
                    }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    size="small"
                    {...params} />
            }
        />,
        //PLAIN AND CAPACITY (NUM SEATS) 
        <FormControl fullWidth>
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
        <TextField size='small'
            name='distance'
            label="Distance (Km)"
            variant='outlined'
            type={validations(fields.distance).type}
            readOnly={disableChanges}
            required={validations(fields.distance).required}
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
        <TextField size='small'
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
        <TextField size='small'
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
        <TextField size='small'
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
        <TextField size='small'
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
        <TextField size='small'
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
        <TextField size='small'
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
        />,
    ];
    const formActions = [
        <FormButton type='submit'
            style={{ color: 'white', flex: '1' }}
        >
            Save
        </FormButton>,
        <FormButton
            style={{ color: 'white', flex: '1' }}
            onClick={() => handleCancel()}
        >
            Cancel
        </FormButton>
    ];
    const config = {
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
        }
    };
    return (
        <FormFrameBox width={'100%'} height={'100%'}>
            <Box width={'48.5%'} height={'100%'}
                sx={{
                    margin: '0 20 0 0'
                }}
            >
                <Stack direction='column'
                    justifyContent={'space-between'}
                    alignItems={'center'}
                    height={'100%'}
                    spacing={'20px'}
                    sx={{ border: `2px solid ${primaryColor}` }}
                >
                    <Box width={'100%'} height={'60px'}
                        sx={{ padding: '5px' }}
                    >
                        <Box width={'100%'} height={'100%'}
                            sx={{
                                backgroundColor: primaryColor,
                                borderRadius: 1,
                                padding: '5px'
                            }}>
                            <Stack direction='row'
                                width={'100%'} height={'100%'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                            >

                                <Box sx={{ width: '65%', height: '100%', paddingTop: '5px' }}>
                                    <Typography
                                        sx={{ marginLeft: '5px' }}
                                        component="span"
                                        variant="h6"
                                        color="white"
                                        noWrap
                                    >  {`${airline.name}(${airline.iata})`}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    backgroundImage: `url(${createFlight})`,
                                    backgroundSize: 'cover',
                                    height: '100% !important',
                                    width: '35% !important',
                                    backgroundRepeat: 'no-repeat',
                                    border: '1px soild white !important'
                                }}>
                                </Box>
                            </Stack>
                        </Box>
                    </Box>
                    <form
                        style={{ width: '100%', height: '100%' }}
                        onSubmit={handleSubmit}
                    >
                        <ActionGrid formCtrls={formCtrls} formActions={formActions} config={config} />
                    </form>
                </Stack>

            </Box>
            <Box width={'48.5%'} height={'100%'}
                sx={{
                    margin: '0 0 0 20'
                }}
            >
                <Stack direction='column'
                    alignItems={'center'}
                    justifyContent={'space-around'}
                    height={'100%'}
                    sx={{ border: `2px solid ${primaryColor}` }}>
                    <Box
                        flex={1}
                        width={'100%'}
                    >
                        <FilightMap
                            center={{ lat: -34.397, lng: 150.644 }}
                            isMarkerShown
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${geolocation.geocoderApiKey}&v=3.exp&libraries=geometry,drawing,places`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                            markers={flightData.markers}
                        />
                    </Box>
                    <Box flex={1} width={'100%'} sx={{ border: `1px solid black` }}></Box>
                </Stack>
                {/* <Stack direction='column'
                    alignItems={'center'}
                    justifyContent={'space-between'}
                    height={'100%'}
                    sx={{ border: `2px solid ${primaryColor}` }}>
                    <Box
                        flex={1}
                        width={'100%'}
                        sx={{
                            border: `1px solid lightgrey`,
                            backgroundImage: capacityModelUrl,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat'
                        }}>
                    </Box>
                    <Box flex={1} width={'100%'} sx={{ border: `1px solid black` }}></Box>
                </Stack> */}
            </Box>
        </FormFrameBox>


    )
}

export default FlightForm
