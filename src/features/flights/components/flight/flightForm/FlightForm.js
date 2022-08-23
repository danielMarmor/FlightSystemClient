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
import { getAlCountries } from '../../../../../api/cache';
import { CompareByCountryName } from '../../../../../utilities/compare';
import { useQuery } from 'react-query';
import { numbers, endpoints } from '../../../../../constants/configuration';
import { CapacityModels } from '../../../../../constants/commonLists';
import StraightIcon from '@mui/icons-material/Straight';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import moment from 'moment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PercentIcon from '@mui/icons-material/Percent';
import { useParams } from 'react-router-dom';
import { SelectAirline } from '../../../fligthSlice';
import { useSelector, useDispatch } from 'react-redux';
import createFlight from '../../../../../assets/airlines.jpg';
import { FlightModel, costPerKm, speed } from '../../../models/flightModel';

const boxesHorizPadding = 10;
const primaryColor = '#15291b';
const fuelCost = '20,000 $/Km'
const airplaneSpeed = 800;
const nowDateTime = moment(new Date()).format('DD/MM/YYYY HH24:MM');
const defaultCapcityModelUrl = '';

//FLIGHT MODEL
const model = new FlightModel(); 

const FlightForm = () => {
    const { airlineId } = useParams();
    const dispatch = useDispatch();
    const airline = useSelector(SelectAirline);
    const airConfig = endpoints.airlineCompanies;
    //HEADER 
    //const airlineLogoUrl = `${airConfig.logoPrefix}90/40/${airline.iata}${airConfig.logoPostfix}`;
    //COUNTRIES
    const countries = useQuery('countries', getAlCountries).data;
    const [flightData, setFlightData] = useState({});
    //DEPRTURE DATE
    //COUNTRIES
    const origCountryFlagUrl = flightData.origin_country_name ? `url(${endpoints.countriesFlags}${flightData.origin_country_name})` : null;
    const destCountryFlagUrl = flightData.destination_country_name ? `url(${endpoints.countriesFlags}${flightData.destination_country_name})` : null;
    //CAPAITY MODEL
    const capacityModelUrl = flightData.capacityModelUrl || defaultCapcityModelUrl;

    useEffect(()=>{
        model.setParams(countries);
    }, []);

    const handleDepartureChanged = (value) => {
        model.copyData(flightData);
        model.departureTimeUpdated(value);
        const newData = model.retval;
        setFlightData(newData);

    }
    const handleOriginCountrySelected = (name) => {
        model.copyData(flightData);
        model.originCountryUpdated(name);
        const newData = model.retval;
        setFlightData(newData);
    }
    const handleDestinationCountrySelected = async(name) => {
        model.copyData(flightData);
        model.destCountryUpdated(name);
        const newData = model.retval;
        setFlightData(newData);
    }

    const handleLandingChanged = (value) => {
        model.copyData(flightData);
        model.landingTimeUpdated(value);
        const newData = model.retval;
        setFlightData(newData);
    }

    const handleCapacityChange = (e) => {
        model.copyData(flightData);
        model.capacityModelUpdated(e.target.value);
        const newData = model.retval;
        setFlightData(newData);
    }
    const handlePriceChange = (e) => {
        model.copyData(flightData);
        model.priceUpdated(e.target.value);
        const newData = model.retval;
        setFlightData(newData);
    }

    const formCtrls = [
        //ORIGIN COUNTRY
        <AutoCompleteBox
            freeSolo
            id="originCountry"
            name="originCountry"
            value={flightData.origin_country_name || ''}
            onChange={(event, name) => {
                handleOriginCountrySelected(name)
            }}
            disableClearable
            options={countries.map((option) => option.name).sort(CompareByCountryName)}
            renderInput={(params) => (
                <TextField
                    size="small"
                    sx={{ width: '100%' }}
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
            onChange={(newValue) => {
                handleDepartureChanged(newValue);
            }}
            InputAdornmentProps={{ position: 'start' }}
            renderInput={(params) =>
                <TextField
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
            onChange={(event, name) => {
                handleDestinationCountrySelected(name)
            }}
            disableClearable
            options={countries.map((option) => option.name).sort(CompareByCountryName)}
            renderInput={(params) => (
                <TextField               
                    size="small"
                    sx={{ width: '100%' }}
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
            onChange={(newValue) => {
                handleLandingChanged(newValue);
            }}
            InputAdornmentProps={{ position: 'start' }}
            renderInput={(params) =>
                <TextField
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
                sx={{ fontSize: '0.9rem' }}
                value={flightData.capacityModelId || ''}
                onChange={handleCapacityChange}
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
            label="Distance"
            variant='outlined'
            value={`${flightData.distance != null && flightData.distance != undefined ? flightData.distance  + ' Km': '' }`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
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
            value={`${flightData.price != null && flightData.price != undefined ? flightData.price : '' }`}
            onChange={handlePriceChange}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
                },
                startAdornment: <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: primaryColor }} />
                </InputAdornment>
            }}
        />,
        <TextField size='small'
            name='fuelCost'
            label="Fuel Cost/Km"
            variant='outlined'
            value={`${costPerKm} $`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
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
            value={`${flightData.revenues != null && flightData.revenues != undefined ? flightData.revenues :'' }`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
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
            value={`${flightData.cost != null && flightData.cost != undefined ? flightData.cost :'' }`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
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
            value={`${flightData.profit != null && flightData.profit != undefined ? flightData.profit :'' }`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
                },
                startAdornment: <InputAdornment position="start">
                    <AttachMoneyIcon sx={{ color: primaryColor }} />
                </InputAdornment>
            }}
        />, ,
        <TextField size='small'
            name='margin'
            label="Margin (%)"
            variant='outlined'
            value={`${flightData.margin != null && flightData.margin != undefined ? flightData.margin :'' }`}
            InputProps={{
                style: {
                    height: 40,
                    textAlign: 'center'
                },
                startAdornment: <InputAdornment position="start">
                    <PercentIcon sx={{ color: primaryColor }} />
                </InputAdornment>
            }}
        />,
    ];
    const formActions = [
        <FormButton style={{ color: 'white', flex: '1' }}>
            Save
        </FormButton>,
        <FormButton style={{ color: 'white', flex: '1' }}>
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
                                
                                <Box sx={{ width: '65%', height: '100%', paddingTop: '5px'}}>
                                    <Typography
                                        sx={{marginLeft: '5px'}}
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
                    <ActionGrid formCtrls={formCtrls} formActions={formActions} config={config} />


                </Stack>

            </Box>
            <Box width={'48.5%'} height={'100%'}
                sx={{
                    margin: '0 0 0 20'
                }}
            >
                <Stack direction='column'
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
                </Stack>
            </Box>
        </FormFrameBox>


    )
}

export default FlightForm