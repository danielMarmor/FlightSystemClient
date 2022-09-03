import React from 'react'
import { useState, useEffect } from 'react';
import { primaryColor } from '../../../../app/components/FormStyles';
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import { AutoCompleteBox } from '../../../../app/components/FormStyles';
import { DatePicker } from '@mui/x-date-pickers';
import FlagIcon from '@mui/icons-material/Flag';
import { CompareByCountryName } from '../../../../utilities/compare';
import { FormButton, FormFrameBox } from '../../../../app/components/FormStyles'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { fetchFligths, SelectFlightsSearch } from '../../ticketsSlice'
import { catchAppError } from '../../../../app/appSlice';
import FlightSearchResults from '../flightsSearchResults/FlightSearchResults';
import { FlightSearchErrorTemplate } from '../../../../constants/enums';
import moment from 'moment';
import Banners from '../banners';

const bannerPannelHeight = 45;
const searchInputsHeight = 24;

const FORMAT = 'DD/MM/YYYY';

const FlightsSearch = ({ handleSearch, countries}) => {

  const dispatch = useDispatch();
  const initFilters = {
    origin_country_name: '',
    destination_country_name: '',
    start_date: moment().add(-3, 'days'),
    end_date: moment().add(-3, 'days').add(3, 'months')
  }
  const [filters, setFilters] = useState(initFilters);

  const handleCountryChange = (type, value) => {
    const newFilters = {
      ...filters,
      [`${type}_country_name`]: value
    }
    setFilters(newFilters);
  }

  const handleDateChange = (type, value) => {
    setFilters({
      ...filters,
      [`${type}_date`]: value
    });
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

  const handleSearchFromParams = () => {
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
      handleSearch(dataFilters);
    }
    catch (err) {
      dispatch(catchAppError(FlightSearchErrorTemplate(err.message)))
    }
  }

  const handleDateChangeRaw = (e) => {
    e.preventDefault();
  }

  useEffect(() => {
    handleSearchFromParams();
  }, []);

  return ([
    //SEARCH LINE
    <Box sx={{ flex: 1 }}>
      <AutoCompleteBox
        freeSolo
        id="fromCountry"
        name="fromCountry"
        height={24}
        value={filters.origin_country_name || ''}
        onChange={(event, name) => {
          handleCountryChange('origin', name)

        }}
        clearable
        options={countries.map((option) => option.name).sort(CompareByCountryName)}
        renderInput={(params) => (
          <TextField
            size="small"
            sx={{ input: { textAlign: "center" }, width: '90%' }}
            {...params}
            placeholder={'From'}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              style: { textAlign: "center" },
              min: 0,
              style: {
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
                  backgroundImage: filters.toCountryImageUrl || '',
                  backgroundSize: 'cover',
                  width: '2.1rem',
                  height: '1.4rem',
                  backgroundRepeat: 'no-repeat'
                }}>
                </div>
              </InputAdornment>
            }}
            onChange={
              (e) => handleCountryChange('origin', e.target.value)
            }
          />
        )}
      />
    </Box>,
    <Box sx={{ flex: 1 }}>
      <DatePicker
        clearable
        onChangeRaw={handleDateChangeRaw}
        value={filters.start_date || ''}
        inputFormat="DD/MM/YYYY"
        placeholder='Departure'
        width={'90%'}
        sx={{ backgroundColor: 'white', border: '1px soiid black' }}
        onChange={(newValue) => {
          handleDateChange('start', newValue);
        }}
        InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
        renderInput={(params) =>
          <TextField fontSize={'0.9rem'}
            placeholder='Departure'

            sx={{
              backgroundColor: 'white',
              margin: 'auto',
              width: '90%',
              height: searchInputsHeight,
              border: '1px solid black',
              textAlign: 'center',
              '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                borderBottom: 'none'

              }
            }}
            size="small"
            variant='standard'
            {...params} />
        }
      />
    </Box>,
    <Box sx={{ flex: 1 }}>
      <AutoCompleteBox
        freeSolo
        id="toCountry"
        name="toCountry"
        value={filters.destination_country_name || ''}
        onChange={(event, name) => {
          handleCountryChange('destination', name)
        }}
        width={'90%'}
        disableClearable
        options={countries.map((option) => option.name).sort(CompareByCountryName)}
        renderInput={(params) => (
          <TextField
            size="small"
            sx={{ input: { textAlign: "center" }, width: '90%' }}
            {...params}
            placeholder={'To'}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              style: { textAlign: "center" },
              min: 0,
              style: {
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
                  backgroundImage: filters.toCountryImageUrl || '',
                  backgroundSize: 'cover',
                  width: '2.1rem',
                  height: '1.4rem',
                  backgroundRepeat: 'no-repeat'
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
    <Box sx={{ flex: 1 }}>
      <DatePicker
        clearable
        onChangeRaw={handleDateChangeRaw}
        value={filters.end_date || ''}
        inputFormat="DD/MM/YYYY"
        placeholder='Landing'
        onChange={(newValue) => {
          handleDateChange('end', newValue);
        }}
        InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
        renderInput={(params) =>
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              readOnly: true,
              placeholder: "Landing",
              style: { textAlign: "center" }
            }}
            sx={{
              backgroundColor: 'white',
              margin: 'auto',
              width: '90%',
              height: searchInputsHeight,
              border: '1px solid black',
              '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                borderBottom: 'none'

              }
            }}
            size="small"
            variant="standard"
            {...params} />
        }
      />
    </Box>,
    <Box sx={{ flex: 0.5 }}>
      <FormButton variant="contained"
        onClick={() => handleSearchFromParams()}
        sx={{
          height: searchInputsHeight + 2,
          width: '120px'
        }}>Go
      </FormButton>
    </Box>
  ])
}

const FlightsList = ({countries}) => {
  const flightResults = useSelector(SelectFlightsSearch);
  const dispatch = useDispatch();

  const handleSearch = async (filters) => {
    try {
      await dispatch(fetchFligths(filters)).unwrap();
    }
    catch (err) {
      dispatch(catchAppError(FlightSearchErrorTemplate(err)))
    }
  }

  const searchPanel = {
    panelItmes: [
      <FlightsSearch handleSearch={handleSearch} countries={countries}/>
    ],
    height: '40px'
  }
  return (
    <FormFrameBox sx={{
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      <Stack
        width={'100%'}
        height={'100%'}
        direction={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        {/* BANNER */}
        <Box
          width={'100%'}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          height={bannerPannelHeight}
          sx={{
            backgroundColor: primaryColor,
            padding: '0px'
          }}
          marginBottom={'10px'}
        >
          <Banners />
        </Box>
        {/* SEARCH PANEL */}
        <SearchLine searchPanel={searchPanel} height={'40px'} />
        {/* DATA LIST RESULTS */}
        <Box
          width={'100%'}
          marginTop={'10px'}
          sx={{ padding: '0px' }}

        >
          <FlightSearchResults flightResults={flightResults} />
        </Box>
      </Stack>
    </FormFrameBox>
  )
}

export default FlightsList
