import React from 'react'
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import HelpIcon from '@mui/icons-material/Help';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddCardIcon from '@mui/icons-material/AddCard';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import { FormTextField, FormButton, FormCancelButton, FormBoxGrid, FormBox } from '../../../../app/components/FormStyles';
import { FormBlock, } from '../../../../models/validation';
import { Stack } from '@mui/material';
import { addCusotmer } from '../../profilesSlice';
import { useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom'
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileSuccessTemplate, ProfileErrorTemplate, fields } from '../../../../constants/enums';
import { CustomerValidations as validations } from '../../../../models/validation';

const CustomerSignUp = () => {
    const [details, setDetails] = useState({});
    const [blocks, setBlocks] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const newDetails = {
            ...details,
            [e.target.name]: e.target.value
        };
        const value = e.target.value;
        const checkValue = { value }
        const blocked = FormBlock(e.target.name, checkValue);
        const newBlocks = {
            ...blocks,
            [e.target.name]: blocked
        }
        setDetails(newDetails);
        setBlocks(newBlocks);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const customerDetails = {
                ...details,
                address: `${details.addressBase} ${details.addressCountry || ''}`
            }
            const response = await dispatch(addCusotmer(customerDetails)).unwrap();
            const signupMessage = `${customerDetails.first_name}, Welcome to FlightServix community! attaching your photo is highly recommended. Go to Profile Page`;
            const homePageUrl = '/Flights';
            dispatch(showSuccessMessage(ProfileSuccessTemplate(signupMessage, homePageUrl)));
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleCancel = () => {
        navigate('/Flights');
    }

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }

    return (<FormBox
        component='form'
        autoComplete="off"
        onSubmit={handleSubmit}
        height={'100%'}
        justifyContent={'space-between'}
        paddingTop={'1.5rem'}>
        <FormBoxGrid id='FormBoxGrid2'

        >
            <FormTextField
                name="username"
                size="small"
                label="User Name"
                required={validations(fields.username).required}
                type={validations(fields.username).type}
                helperText=""
                value={details.username || ''}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['username'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['username'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.username).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                type="password"
                name="password"
                size="small"
                label="Password"
                helperText=""
                //defaultValue={details.password || ''}
                value={details.password || ''}
                required={validations(fields.password).required}
                type={validations(fields.password).type}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['password'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['password'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.password).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                type="email"
                name="email"
                size="small"
                label="Email"
                helperText=""
                required={validations(fields.email).required}
                type={validations(fields.email).type}
                value={details.email || ''}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['email'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['email'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.email).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <EmailIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                type="password"
                name="confirmPassword"
                size="small"
                label="Confirm Password"
                helperText=""
                required={validations(fields.confirmPassword).required}
                type={validations(fields.confirmPassword).type}
                value={details.confirmPassword || ''}
                //value={details.confirmPassword}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['confirmPassword'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['confirmPassword'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.confirmPassword).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LockIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="first_name"
                size="small"
                label="First Name"
                required={validations(fields.first_name).required}
                type={validations(fields.first_name).type}
                helperText=""
                value={details.first_name || ''}
                onChange={handleChange}
                inputProps={{ maxLength: validations(fields.first_name).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="last_name"
                size="small"
                label="Last Name"
                helperText=""
                required={validations(fields.last_name).required}
                type={validations(fields.last_name).type}
                value={details.last_name || ''}
                onChange={handleChange}
                inputProps={{ maxLength: validations(fields.last_name).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <AccountCircleIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="phone_number"
                size="small"
                label="Phone Number"
                helperText=""
                required={validations(fields.phone_number).required}
                type={validations(fields.phone_number).type}
                value={details.phone_number || ''}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['phone_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['phone_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.phone_number).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <LocalPhoneIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="credit_card_number"
                size="small"
                label="Credit Card Number"
                helperText=""
                value={details.credit_card_number || ''}
                required={validations(fields.credit_card_number).required}
                type={validations(fields.credit_card_number).type}
                onChange={handleChange}
                sx={`& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['credit_card_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['credit_card_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
                inputProps={{ maxLength: validations(fields.credit_card_number).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <AddCardIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="addressBase"
                size="small"
                label="Address"
                value={details.credit_card_number || ''}
                required={validations(fields.address).required}
                type={validations(fields.address).type}
                helperText=""
                value={details.addressBase || ''}
                onChange={handleChange}
                inputProps={{ maxLength: validations(fields.address).maxLength }}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <HomeIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
            <FormTextField
                name="addressCountry"
                size="small"
                label="Country"
                helperText=""
                value={details.addressCountry || ''}
                onChange={handleChange}
                InputProps={{
                    startAdornment: <InputAdornment position="start">
                        <FlagIcon sx={{ color: '#15291b' }} />
                    </InputAdornment>
                }}
            ></FormTextField>
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

    </FormBox>
    )
}

export default CustomerSignUp
