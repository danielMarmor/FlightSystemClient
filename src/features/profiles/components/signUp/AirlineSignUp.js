import React from 'react';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import FlagIcon from '@mui/icons-material/Flag';
import { FormTextField, FormBox, FormBoxGrid, FormButton, FormCancelButton } from '../../../../app/components/FormStyles';
import { FormBlock, } from '../../../../models/validation';
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import { AutoCompleteBox } from '../../../../app/components/FormStyles';
import { CompareByCountryName } from '../../../../utilities/compare';
import { endpoints } from '../../../../constants/configuration';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addAirline } from '../../profilesSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, fields } from '../../../../constants/enums';
import { AirlineValidations as validations } from '../../../../models/validation';

const AirlineSignUp = ({ countries }) => {
    const [details, setDetails] = useState({});
    const [blocks, setBlocks] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const flagImageUrl = details.country_name ? `url(${endpoints.countriesFlags}${details.country_name})` : null;

    const airConfig = endpoints.airlineCompanies;
    const airlineLogoUrl = !details.iata || details.iata.length < 2 ? null : `url(${airConfig.logoPrefix}${airConfig.reqWidth}/${airConfig.reqHeight}/${details.iata}${airConfig.logoPostfix})`

    const validate = () => {
        if (details.password != details.confirmPassword) {
            throw Error('Passwords dont match!');
        }
    }

    const handleChange = (e) => {
        try {
            const newDetails = {
                ...details,
                [e.target.name]: e.target.value
            };
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleCountryChange = (name) => {
        try {
            const country = countries.find(cou => cou.name == name);
            const newDetails = {
                ...details,
                ['country_name']: country.name,
                ['country_id']: country.id
            };
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validate();
            const response = await dispatch(addAirline(details)).unwrap();
            const signupMessage = `${details.name}, Welcome to FlightServix community!`
            const homePageUrl = '/Flights';
            dispatch(showSuccessMessage(ProfileSuccessTemplate(signupMessage, homePageUrl)));
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleCancel = () => {
        try {
            navigate('/Flights');
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }

    return (<FormBox
        component='form' p
        autoComplete="off"
        onSubmit={handleSubmit}
        height={'100%'}
        justifyContent={'space-between'}
        paddingTop={'1.5rem'}>
        <FormBoxGrid id='FormBoxGrid2'>
            <FormTextField
                name="username"
                size="small"
                label="User Name"
                helperText=""
                value={details.username || ''}
                required={validations(fields.username).required}
                type={validations(fields.username).type}
                onChange={handleChange}
                inputProps={{ maxLength: validations(fields.username).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="password"
                size="small"
                label="Password"
                helperText=""
                value={details.password || ''}
                required={validations(fields.password).required}
                type={validations(fields.password).type}
                onChange={handleChange}
                inputProps={{ maxLength: validations(fields.password).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="email"
                size="small"
                label="Email"
                helperText=""
                value={details.email || ''}
                onChange={handleChange}
                required={validations(fields.email).required}
                type={validations(fields.email).type}
                inputProps={{ maxLength: validations(fields.email).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="confirmPassword"
                size="small"
                label="Confirm Password"
                helperText=""
                value={details.confirmPassword || ''}
                onChange={handleChange}
                required={validations(fields.confirmPassword).required}
                type={validations(fields.confirmPassword).type}
                inputProps={{ maxLength: validations(fields.confirmPassword).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="name"
                size="small"
                label="Airline Company Name"
                helperText=""
                value={details.name || ''}
                onChange={handleChange}
                required={validations(fields.name).required}
                type={validations(fields.name).type}
                inputProps={{ maxLength: validations(fields.name).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="iata"
                size="small"
                label="Aviation Symbol"
                helperText=""
                value={details.iata || ''}
                onChange={handleChange}
                required={validations(fields.iata).required}
                type={validations(fields.iata).type}
                inputProps={{ maxLength: validations(fields.iata).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <AutoCompleteBox
                freeSolo
                id="homeCountry"
                name="country_name"
                onChange={(event, name) => {
                    handleCountryChange(name)
                }}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                required={true}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        {...params}
                        label="Choose Country"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                            startAdornment: <InputAdornment position="start">
                                <FlagIcon sx={{ color: '#15291b' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <div style={{
                                    backgroundImage: flagImageUrl,
                                    backgroundSize: 'cover',
                                    width: '3rem',
                                    height: '2rem',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                </div>
                            </InputAdornment>
                        }}
                    />
                )}
            />
            <Box sx={{
                gridRowEnd: 'span 2',
            }}>
                <div name="logo"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderStyle: 'solid',
                        borderWidth: '1px',
                        borderColor: 'ligthGrey',
                        backgroundImage: airlineLogoUrl,
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'

                    }}>
                </div>
            </Box>
            <Box sx={{ width: '100%', height: '50px' }}></Box>
        </FormBoxGrid>
        <Stack direction="row" spacing={'20px'}>
            <FormButton
                type="submit"
                variant="contained"
            >
                Sign Up
            </FormButton>

            <FormCancelButton
                variant="contained"
                onClick={() => handleCancel()}
            >
                Cancel
            </FormCancelButton>
        </Stack>
    </FormBox>)
}

export default AirlineSignUp
