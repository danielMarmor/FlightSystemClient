import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
    CenterBox,
    FormFrameBox,
    HorizonStack,
    VerticalStack,
    SubHeaderTypography,
    PrimaryTextTypography,
    AutoCompleteBox,
    FormButton,
    LeftCenterBox
} from '../../../../app/components/FormStyles';
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import {
    List, ListItem, TextField, Box,
    InputAdornment, InputLabel, FormGroup, FormControlLabel
} from '@mui/material';
import ChartRevenues from './ChartRevenues';
import ChartCustomersPurchases from './ChartCustomersPurchases';
import ChartAirlineSales from './ChartAirlineSales';
import ChartCapcityUtils from './ChartCapcityUtils';
import {
    fetchRevenuesByDates,
    fetchPurchasesByCustomers,
    fetchSalesByAirlines,
    fetchFlightsCountByCountries,
    fetchCapcityUtilization
} from '../../manageSlice';
import { DatePicker } from '@mui/x-date-pickers';
import FlagIcon from '@mui/icons-material/Flag';
import { CompareByCountryName } from '../../../../utilities/compare';
import { catchAppError } from '../../../../app/appSlice';
import { DashboardErrorTemplate } from '../../../../constants/enums';
import { endpoints } from '../../../../constants/configuration';
import moment from 'moment';
import { maxWidth } from '@mui/system';

const searchInputsHeight = 24;
const primaryColor = '#15291b';
const FORMAT = 'DD/MM/YYYY';
const MIN_DATE = '01/07/2022';
const MAX_DATE = '31/07/2023';
const INIT_START_DATE = moment('01/09/2022', 'DD/MM/YYYY');
const INIT_END_DATE = moment('31/12/2022', 'DD/MM/YYYY');

const initDates = {
    from_date: INIT_START_DATE,
    to_date: INIT_END_DATE,
    destination_country_name: '',
    destination_country_id: 'X'
};

const DashboardMenuBox = ({ children, ...props }) => {
    return (<Box sx={{
        height: '100%',
        borderColor: 'black',
        borderStyle: 'solid',
        borderWidth: 1,
        padding: 5
    }}
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        {...props}
    >
        {children}
    </Box>);
}
const DashboardTextField = ({ children, ...props }) => {
    return (<TextField
        sx={{
            borderRadius: 0,
            backgroundColor: 'white',
            borderColor: 'black',
            borderStyle: 'solid',
            borderWidth: 1
        }}
        {...props}>
        {children}
    </TextField>);
}

const DashboardSearch = ({ countries }) => {
    const [filters, setFilters] = useState(initDates);
    const dispatch = useDispatch();

    const loadDashBoards = (dates) => {
        dispatch(fetchRevenuesByDates(dates));
        dispatch(fetchPurchasesByCustomers(dates));
        dispatch(fetchSalesByAirlines(dates));
        dispatch(fetchCapcityUtilization(dates));
    }

    const getCountryImageUrl = (name) => {
        const countryFlagUrl = `url(${endpoints.countriesFlags}${name})`;
        return countryFlagUrl;
    }

    const handleDateChange = (type, value) => {
        try {
            setFilters({
                ...filters,
                [`${type}_date`]: value
            });
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleCountryChange = (type, value) => {
        try {
            let destination_country_id, destination_country_url;
            const country = countries.find(x => x.name == value);
            if (!country) {
                destination_country_id = null;
                destination_country_url = null;
            }
            else {
                destination_country_id = country.id;
                destination_country_url = getCountryImageUrl(value);
            }
            const newFilters = {
                ...filters,
                [`${type}_country_name`]: value,
                destination_country_id: destination_country_id,
                destination_country_url: destination_country_url
            }
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleSearch = () => {
        try {
            validateInputs();
            const dates = {
                start_date: (filters.from_date && moment(filters.from_date).format(FORMAT)) || MIN_DATE,
                end_date: (filters.to_date && moment(filters.to_date).format(FORMAT)) || MAX_DATE,
                destination_country_id: filters.destination_country_id || 'X'
            }
            loadDashBoards(dates);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(DashboardErrorTemplate(err.message)))
    }
    const validateInputs = () => {
        let destCountry, errorMessage;
        if (filters.destination_country_name) {
            destCountry = countries.find(cou => cou.name == filters.destination_country_name);
            if (!destCountry) {
                errorMessage = 'Select a valid country';
                throw Error(errorMessage);
            }
        }
        if (filters.from_date) {
            if (moment(filters.from_date).format(FORMAT) == 'Invalid date') {
                errorMessage = 'Select a valid date';
                throw Error(errorMessage);
            }
        }
        if (filters.to_date) {
            if (moment(filters.to_date).format(FORMAT) == 'Invalid date') {
                errorMessage = 'Select a valid date';
                throw Error(errorMessage);
            }
        }

    }
    useEffect(() => {
        const initParams = {
            start_date: initDates.from_date.format(FORMAT),
            end_date: initDates.to_date.format(FORMAT),
            destination_country_id: initDates.destination_country_id
        }
        loadDashBoards(initParams);
    }, [])
    // return [
    //     <Box>
    //         <FormGroup row fullWidth sx={{display:'flex', justifyContent: 'space-between'}}>
    //             <FormControlLabel sx={{marginRight : 5}}
    //                 labelPlacement='start' control={<DatePicker
    //                     value={'04/05/2022'}
    //                     inputFormat="DD/MM/YYYY"
    //                     onChange={(newValue) => {
    //                         handleDateChange('from', newValue);
    //                     }}
    //                     errorMessage={''}
    //                     renderInput={(params) =>
    //                         <TextField label="xxxxx"
    //                         InputProps={{disableUnderline: true}}
    //                              required={false}
    //                             variant='standard'
    //                             size={'small'}
    //                             sx={{
    //                                 input :{
    //                                     padding : 0,
    //                                     width:'fit-content'

    //                                 },
    //                                 borderWidth : 1,
    //                                 borderColor : 'black',
    //                                 borderStyle : 'solid',
    //                                 borderRadius: 0,                   
    //                                 backgroundColor : 'white',


    //                             }}
    //                             {...params} fullWidth={false}/>

    //                     }
    //                 />} label="From Date: " />
    //                             <FormControlLabel
    //                                 labelPlacement='start' control={<DatePicker
    //                                     value={filters.fromDate || ''}
    //                                     inputFormat="DD/MM/YYYY"
    //                                     onChange={(newValue) => {
    //                                         handleDateChange('from', newValue);
    //                                     }}
    //                                     renderInput={(params) =>
    //                                         <TextField
    //                                             variant='standard'
    //                                             size={'small'}
    //                                             sx={{
    //                                                 borderRadius: 0,
    //                                                 backgroundColor: 'white',
    //                                                 borderColor: 'black',
    //                                                 borderStyle: 'solid',
    //                                                 borderWidth: 1,
    //                                                 maxWidth: 100
    //                                             }}
    //                                             {...params} />

    //                                     }
    //                                 />} label="From Date: " />
    //                             <FormControlLabel
    //                                 labelPlacement='start' control={<DatePicker
    //                                     value={filters.fromDate || ''}
    //                                     inputFormat="DD/MM/YYYY"
    //                                     onChange={(newValue) => {
    //                                         handleDateChange('from', newValue);
    //                                     }}
    //                                     renderInput={(params) =>
    //                                         <TextField
    //                                             variant='standard'
    //                                             size={'small'}
    //                                             sx={{
    //                                                 borderRadius: 0,
    //                                                 backgroundColor: 'white',
    //                                                 borderColor: 'black',
    //                                                 borderStyle: 'solid',
    //                                                 borderWidth: 1,
    //                                                 maxWidth: 100
    //                                             }}
    //                                             {...params} />

    //                                     }
    //                                 />} label="From Date: " />
    //                         </FormGroup>
    //     </Box>

    // ];
    return [
        <Box sx={{ width: 0.25, padding: '0' }}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
        >
            <PrimaryTextTypography sx={{
                width: 'auto',
                fontSize: '1rem',
                margin: '0',
                padding: '0'
            }}>
                From Date:
            </PrimaryTextTypography>
            <DatePicker
                value={filters.from_date || ''}
                inputFormat="DD/MM/YYYY"
                sx={{
                    backgroundColor: 'white', border: '1px soiid black'
                }}
                onChange={(newValue) => {
                    handleDateChange('from', newValue);
                }}
                InputAdornmentProps={{
                    position: 'start'
                }}
                renderInput={(params) =>
                    <TextField fontSize={'0.9rem'}
                        size="small"
                        variant='standard'
                        placeholder={"DD/MM/YYYY"}
                        sx={{
                            backgroundColor: 'white',
                            margin: '3px 0px',
                            width: '125px',
                            height: searchInputsHeight,
                            border: '1px solid black',
                            textAlign: 'center',
                            '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                                borderBottom: 'none'

                            }
                        }}
                        {...params} />
                }
            />
        </Box>,

        <Box sx={{ width: 0.25, padding: '0', margin: '0' }}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}
        >
            <PrimaryTextTypography
                sx={{
                    width: 'auto',
                    fontSize: '1rem'
                }}
            >To Date:
            </PrimaryTextTypography>

            <DatePicker
                value={filters.to_date || ''}
                inputFormat="DD/MM/YYYY"
                sx={{ backgroundColor: 'white', border: '1px soiid black' }}
                onChange={(newValue) => {
                    handleDateChange('to', newValue);
                }}
                InputAdornmentProps={{
                    position: 'start'
                }}
                renderInput={(params) =>
                    <TextField fontSize={'0.9rem'}
                        size="small"
                        variant='standard'
                        placeholder={"DD/MM/YYYY"}
                        sx={{
                            backgroundColor: 'white',
                            margin: 'auto',
                            width: '125px',
                            height: searchInputsHeight,
                            border: '1px solid black',
                            textAlign: 'center',
                            '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                                borderBottom: 'none'

                            }
                        }}
                        {...params} />
                }
            />
        </Box>,
        <Box sx={{ width: 0.3 }}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'flex-start'}
            alignItems={'center'}>
            <PrimaryTextTypography sx={{
                width: 'auto',
                fontSize: '1rem'
            }}>Destination:</PrimaryTextTypography>
            <AutoCompleteBox
                width={'125px'}
                freeSolo
                id="toCountry"
                name="toCountry"
                height={24}
                value={filters.destination_country_name || ''}
                onChange={(event, name) => {
                    handleCountryChange('destination', name)
                }}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ input: { textAlign: "center" }, width: '150px' }}
                        {...params}
                        placeholder={'All'}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            min: 0,
                            style: {
                                textAlign: "center",
                                height: searchInputsHeight,
                                textAlign: 'center',
                                boxSizing: 'border-box',
                                borderRadius: '0px !important',
                                border: '1px solid #15291b',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            },
                            startAdornment: <InputAdornment position="start">
                                <FlagIcon sx={{ color: '#15291b' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <div style={{
                                    backgroundImage: filters.destination_country_url || '',
                                    backgroundSize: 'cover',
                                    width: '2.0rem',
                                    height: '1.3rem',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}>
                                </div>
                            </InputAdornment>
                        }}
                        onChange={
                            (e) => handleCountryChange('destination', e.target.value)
                        }
                    />
                )}
            />
        </Box>,
        <Box sx={{ width: 0.15 }} display={'flex'} justifyContent={'flex-end'}>
            <FormButton variant="contained"
                onClick={() => handleSearch()}
                sx={{
                    height: searchInputsHeight + 2,
                    width: '120px'
                }}>Go
            </FormButton>
        </Box>
    ];

}
const Dashboard = ({ countries }) => {
    const dispatch = useDispatch();

    const searchPanel = {
        panelItmes: [
            <DashboardSearch countries={countries} />
        ],
        height: '40px'
    }

    const charts = [
        <ChartRevenues />,
        <ChartCustomersPurchases />,
        <ChartAirlineSales />,
        <ChartCapcityUtils />
    ];

    return <FormFrameBox sx={{
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }}>
        <VerticalStack>
            <CenterBox
                sx={{
                    height: '40px',
                    borderRadius: '4px',
                    backgroundColor: primaryColor
                }}>
                <HorizonStack justifyContent={'flex-start'}
                    sx={{ paddingLeft: '15px' }}>
                    <SubHeaderTypography>
                        Business Statistics
                    </SubHeaderTypography>
                </HorizonStack>
            </CenterBox>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            <CenterBox
                sx={{
                    height: '440px',
                    overflow: 'auto',
                    justifyContent: 'flex-start'
                }}>
                <List sx={{
                    width: '100%',
                    columnCount: 2,
                    columnGap: '10px',
                    padding: '0',
                    height: 'auto'
                }}>
                    {charts.map((chart, index) =>
                        <ListItem key={index}
                            sx={{
                                height: '275px',
                                marginBottom: '10px',
                                border: '4px solid #15291b',
                                pageBreakInside: 'avoid',
                                breakInside: 'avoid',
                                padding: '0px 15px 0px 5px',
                                margim: '0',
                            }}>
                            {chart}
                        </ListItem>
                    )}
                </List>
            </CenterBox>
        </VerticalStack>
    </FormFrameBox>


}

export default Dashboard
