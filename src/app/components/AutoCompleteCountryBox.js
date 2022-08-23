import React from 'react'
import { AutoCompleteBox } from './FormStyles';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FlagIcon from '@mui/icons-material/Flag';
import { getAlCountries } from '../../api/cache';
import { useQuery } from 'react-query/types/react';
import { CompareByCountryName } from '../../utilities/compare';
import { useState } from 'react';

const AutoCompleteCountryBox = ({ handleCountryChange, imgWidth, imgHeight }) => {
    const [flagImageUrl, setFlagImageUrl] = useState(''); 
    const countries = useQuery('countries', getAlCountries).data;
    return (
        <AutoCompleteBox
            freeSolo
            id="homeCountry"
            name="country_name"
            onChange={(event, name) => {
                handleCountryChange(name)
            }}
            disableClearable
            options={countries.map((option) => option.name).sort(CompareByCountryName)}
            renderInput={(params) => (
                <TextField
                    size="small"
                    {...params}
                    label="Choose Country"
                    variant="outlined"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        style: {
                            boxSizing: 'border-box',
                            borderRadius: '0px !important',
                            border: '1px solid #15291b',
                            fontSize: '0.9rem',
                            backgroundColor: 'white'
                        },
                        type: 'search',
                        startAdornment: <InputAdornment position="start">
                            <FlagIcon sx={{ color: '#15291b' }} />
                        </InputAdornment>,
                         endAdornment: <InputAdornment position="end">
                            <div style={{
                                backgroundImage: flagImageUrl,
                                backgroundSize: 'cover',
                                width: imgWidth,
                                height: imgHeight,
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </div>
                        </InputAdornment>
                    }}
                />
            )}
        />
    )
}

export default AutoCompleteCountryBox
