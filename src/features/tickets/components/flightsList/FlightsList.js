import React from 'react'
import { useState, useEffect } from 'react';
import { primaryColor } from '../../../../app/components/FormStyles';
import { Box, Stack, TextField, InputAdornment } from '@mui/material';
import { AutoCompleteBox } from '../../../../app/components/FormStyles';
import { DatePicker } from '@mui/x-date-pickers';
import FlagIcon from '@mui/icons-material/Flag';
import { getAlCountries } from '../../../../api/cache';
import { CompareByCountryName } from '../../../../utilities/compare';
import { useQuery } from 'react-query';
import { FormButton, FormFrameBox } from '../../../../app/components/FormStyles'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { flitersChanged } from '../../ticketsSlice'
import FlightSearchResults from '../flightsSearchResults/FlightSearchResults';
import Banners from '../banners';
const bannerPannelHeight = 45;
const searchInputsHeight = 24;

const FlightsSearch = () => {
  const countries = useQuery('countries', getAlCountries).data;
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCountryChange = (type, value) => {
    const newFilters = {
      ...filters,
      [`${type}Country`]: value
    }
    setFilters(newFilters);
  }

  const handleDateChange = (type, value) => {
    setFilters({
      ...filters,
      [`${type}Date`]: value
    });
  }

  const handleSearch = () => {
    dispatch(flitersChanged(filters));
  }


  useEffect(() => {
    dispatch(flitersChanged({}));
  }, []);

  return ([
    //SEARCH LINE
    <Box sx={{ flex: 1 }}>
      <AutoCompleteBox
        freeSolo
        id="fromCountry"
        name="fromCountry"
        height={24}
        value={filters.fromCountry || ''}
        onChange={(event, name) => {
          handleCountryChange('from', name)

        }}
        disableClearable
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
              (e) => handleCountryChange('from', e.target.value)
            }
          />
        )}
      />
    </Box>,
    <Box sx={{ flex: 1 }}>
      <DatePicker
        value={filters.fromDate || ''}
        inputFormat="DD/MM/YYYY"
        width={'90%'}
        sx={{ backgroundColor: 'white', border: '1px soiid black' }}
        onChange={(newValue) => {
          handleDateChange('from', newValue);
        }}
        InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
        renderInput={(params) =>
          <TextField fontSize={'0.9rem'}
            placeholder={"DD/MM/YYYY"}
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
        value={filters.toCountry || ''}
        onChange={(event, name) => {
          handleCountryChange('to', name)
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
              (e) => handleCountryChange('to', e.target.value)
            }
          />
        )}
      />
    </Box>,
    <Box sx={{ flex: 1 }}>
      <DatePicker
        value={filters.toDate || ''}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          handleDateChange('to', newValue);
        }}
        InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
        renderInput={(params) =>
          <TextField
            {...params}
            inputProps={{
              ...params.inputProps,
              placeholder: "DD/MM/YYYY",
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
        onClick={() => handleSearch()}
        sx={{
          height: searchInputsHeight + 2,
          width: '120px'
        }}>Go
      </FormButton>
    </Box>
  ])
}

const FlightsList = () => {
  const searchPanel = {
    panelItmes: [
      <FlightsSearch />
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
          <Banners/>
        </Box>
        {/* SEARCH PANEL */}
        <SearchLine searchPanel={searchPanel} height={'40px'} />
        {/* DATA LIST RESULTS */}
        <Box
          width={'100%'}
          marginTop={'10px'}
          sx={{padding :'0px'}}
         
        >
          <FlightSearchResults/>
        </Box>
      </Stack>
    </FormFrameBox>
  )
}

export default FlightsList
