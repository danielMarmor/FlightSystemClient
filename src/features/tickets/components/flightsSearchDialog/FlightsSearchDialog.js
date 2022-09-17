import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { flitersChanged } from '../../ticketsSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {
    FormFrameBox, CenterBox, VerticalStack, HorizonStack, SubHeaderTypography,
    LeftCenterBox, FormButton, SecTextTypography
} from '../../../../app/components/FormStyles';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
    Autocomplete, Box, TextField, IconButton, InputAdornment,
    FormControl, FormControlLabel, Checkbox
} from '@mui/material';
import { endpoints } from '../../../../constants/configuration';
import SwapVerticalCircleIcon from '@mui/icons-material/SwapVerticalCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Divider from '@mui/material/Divider';
import FlagIcon from '@mui/icons-material/Flag';
import moment from 'moment';

const initFilters = {
    origin_country_id: null,
    origin_country_name: '',
    destination_country_id: null,
    destination_country_name: '',
    start_date: moment(),
    end_date: moment()
}
const FORMAT = 'DD/MM/YYYY';

const FlightsSearchDialog = (props) => {
    const { open, handleSearch, handleClose, countries } = props;
    const [filters, setFilters] = useState(initFilters);
    const [error, setError] = useState('');

    const origCountryFlagUrl = filters.origin_country_name ? (`url(${endpoints.countriesFlags}${filters.origin_country_name})`).replace(' ', '%20'): null;
    const destCountryFlagUrl = filters.destination_country_name ? (`url(${endpoints.countriesFlags}${filters.destination_country_name})`).replace(' ', '%20') : null;

    const dispatch = useDispatch();

    const handleDialogClose = () => {
        handleClose();
    }
    const handleDialogSearch = () => {
        try {
            validateInputs();
            //COLLECT COUNTRIES IDS
            let originCountry, destCountry;
            if (filters.origin_country_name) {
                originCountry = countries.find(cou => cou.name == filters.origin_country_name);
            }
            if (filters.destination_country_name) {
                destCountry = countries.find(cou => cou.name == filters.destination_country_name);
            }
            const origin_country_id = originCountry && originCountry.id;
            const destination_country_id = destCountry && destCountry.id;
            //SET SEARCH FILTERS
            const dataFilters = {
                ...filters,
                origin_country_id: origin_country_id || '',
                dest_country_id: destination_country_id || ''
            };
            dispatch(flitersChanged(dataFilters));
            handleSearch();
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleCountryChanged = (type, value) => {
        try {
            const newFilters = {
                ...filters,
                [`${type}_country_name`]: value
            }
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleDateChanged = (type, value) => {
        try {
            const newFilters = {
                ...filters,
                [`${type}_date`]: value
            }
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleSwitchDestinations = () => {
        try {
            const origin_id_temp = filters.origin_country_id;
            const origin_name_temp = filters.origin_country_name;
            const destination_id_temp = filters.destination_country_id;
            const destination_name_temp = filters.destination_country_name;
            const newFilters = {
                ...filters,
                destination_country_id: origin_id_temp,
                destination_country_name: origin_name_temp,
                origin_country_id: destination_id_temp,
                origin_country_name: destination_name_temp
            }
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const validateInputs = () => {
        let originCountry, destCountry, errorMessage;
        if (filters.origin_country_name) {
            originCountry = countries.find(cou => cou.name == filters.origin_country_name);
            if (!originCountry) {
                errorMessage = 'Select a valid country';
                throw Error(errorMessage);
            }
        }
        if (filters.destination_country_name) {
            destCountry = countries.find(cou => cou.name == filters.destination_country_name);
            if (!destCountry) {
                errorMessage = 'Select a valid country';
                throw Error(errorMessage);
            }
        }
        if (filters.start_date) {
            if (moment(filters.start_date).format(FORMAT) == 'Invalid date') {
                errorMessage = 'Select a valid date';
                throw Error(errorMessage);
            }
        }
        if (filters.end_date) {
            if (moment(filters.end_date).format(FORMAT) == 'Invalid date') {
                errorMessage = 'Select a valid date';
                throw Error(errorMessage);
            }
        }

    }

    const handleError = (err) => {
        setError(err.message);
    }

    return (
        <Dialog open={open}
            PaperProps={{
                style: { border: '4px solid #15291b', borderRadius: 4 }
            }}>
            <CenterBox height={250} sx={{ padding: '5px' }}>
                <VerticalStack justifyContent={'flex-start'}>
                    <HorizonStack height={40}
                        sx={{
                            backgroundColor: '#15291b',
                            width: '100%',
                            borderRadius: '4px',
                            marginBottom: '25px',
                            paddingLeft: '15px'
                        }}>
                        <SubHeaderTypography>
                            Find me a flight
                        </SubHeaderTypography>
                        <IconButton onClick={() => handleDialogClose()}>
                            <CancelIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </HorizonStack>
                    <HorizonStack height={40} sx={{ marginBottom: '25px' }}>
                        <Autocomplete
                            freeSolo
                            id="country-select-origin"
                            disableClearable
                            value={filters.origin_country_name}
                            options={countries.map((option) => option.name)}
                            onChange={(event, name) => {
                                handleCountryChanged('origin', name)
                            }}
                            sx={{
                                width: 0.5, marginRight: '5px'
                            }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="From Country"
                                    onChange={
                                        (e) => handleCountryChanged('origin', e.target.value)
                                    }
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
                                                width: '3rem',
                                                height: '2rem',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition : 'center'
                                            }}>
                                            </div>
                                        </InputAdornment>
                                    }}

                                />
                            )}
                        />
                        <DatePicker
                            //value={value}
                            label="Departure"
                            inputFormat="DD/MM/YYYY"
                            value={filters.start_date || ''}
                            onChange={(newValue) => {
                                handleDateChanged('start', newValue);
                            }}
                            InputAdornmentProps={{ position: 'start' }}
                            renderInput={(params) =>
                                <TextField size='small'
                                    sx={{
                                        width: 0.5, marginLeft: '5px',
                                        //border: '1px solid #15291b',
                                        borderRadius: '0px',
                                        '& .MuiSvgIcon-root': {
                                            color: '#15291b'
                                        },
                                        '& .MuiInputBase-input': {
                                            paddingLeft: '20px'
                                        }
                                    }} {...params}
                                    onChange={
                                        (e) => handleDateChanged('start', e.target.value)
                                    }
                                />

                            }
                        />
                    </HorizonStack>
                    <Divider light />
                    <HorizonStack height={40}>
                        <Autocomplete
                            freeSolo
                            id="country-select-destination"
                            disableClearable
                            value={filters.destination_country_name}
                            options={countries.map((option) => option.name)}
                            onChange={(event, name) => {
                                handleCountryChanged('destination', name)
                            }}
                            sx={{ width: 0.5, marginRight: '5px' }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    size="small"
                                    label="To Country"
                                    onChange={
                                        (e) => handleCountryChanged('destination', e.target.value)
                                    }
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
                                                width: '3rem',
                                                height: '2rem',
                                                backgroundRepeat: 'no-repeat',
                                                backgroundPosition : 'center'
                                            }}>
                                            </div>
                                        </InputAdornment>
                                    }}

                                />
                            )}
                        />
                        <DatePicker
                            label="Return"
                            value={filters.end_date || ''}
                            inputFormat="DD/MM/YYYY"
                            //value={value}
                            onChange={(newValue) => {
                                handleDateChanged('end', newValue);
                            }}
                            InputAdornmentProps={{ position: 'start' }}
                            renderInput={(params) => <TextField size='small'
                                sx={{
                                    width: 0.5, marginLeft: '5px',
                                    //border: '1px solid #15291b',
                                    borderRadius: '0px',
                                    '& .MuiSvgIcon-root': {
                                        color: '#15291b'
                                    },
                                    '& .MuiInputBase-input': {
                                        paddingLeft: '20px'
                                    }
                                }}
                                {...params}
                                onChange={
                                    (e) => handleDateChanged('start', e.target.value)
                                }
                            />}
                        />
                    </HorizonStack>
                </VerticalStack>
                <VerticalStack justifyContent={'flex-end'}>
                    <HorizonStack height={50} alignItems={'flex-end'}>
                        <CenterBox width={0.5} alignItems={'flex-start'}
                            sx={{ paddingLeft: '40px', paddingTop: '10px' }}
                        >
                            <IconButton onClick={() => handleSwitchDestinations()} >
                                <SwapVerticalCircleIcon sx={{ color: '#15291b', fontSize: '2.5rem' }}
                                />
                            </IconButton>
                        </CenterBox>
                        <FormButton variant="contained"
                            flex={1}
                            height={28}
                            sx={{ width: 0.5, marginLeft: '10px' }}
                            onClick={() => handleDialogSearch()}
                        >
                            Go
                        </FormButton>
                    </HorizonStack>
                </VerticalStack>
            </CenterBox>
        </Dialog>

    )
}

export default FlightsSearchDialog
