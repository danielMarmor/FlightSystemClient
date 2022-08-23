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
import { Box } from '@mui/system';
import { Stack } from '@mui/material';
import { addCusotmer } from '../../profilesSlice';
import { useDispatch } from 'react-redux/es/exports';
import {useNavigate} from 'react-router-dom'

const CustomerSignUp =() => {
    const [details, setDetails] = useState({});
    const [blocks , setBlocks] = useState({});

    const dispatch = useDispatch();
    const navigate= useNavigate();

    const handleChange = (e) => {      
        const newDetails = {
            ...details,
            [e.target.name]: e.target.value
        };
        const value = e.target.value; 
        const checkValue ={value} 
        const blocked = FormBlock(e.target.name, checkValue);
        const newBlocks = {
            ...blocks,
            [e.target.name] : blocked
        }      
        setDetails(newDetails);
        setBlocks(newBlocks);
    }
    const handleSubmit = async() => {
        const customerDetails = {
            ...details,
            address : `${details.addressBase} ${details.addressCountry || ''}`
        }
        await dispatch(addCusotmer(customerDetails));
        navigate('/Flights');
        alert('Registered Susccefuly!');
    }
    const handleCancel = () => {
        navigate('/Flights');
    }

    return (<FormBox height={'100%'} justifyContent={'space-between'}  paddingTop={'1.5rem'}>
        <FormBoxGrid id='FormBoxGrid2'>
            <FormTextField
                name="username"
                size="small"
                label="User Name"
                helperText=""
                value={details.username || ''}
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['username'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['username'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['password'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['password'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                value={details.email || ''}
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['email'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['email'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                value={details.confirmPassword || ''}
                //value={details.confirmPassword}
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['confirmPassword'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['confirmPassword'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                helperText=""
                value={details.first_name || ''}
                onChange={handleChange}
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
                value={details.last_name || ''}
                onChange={handleChange}
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
                value={details.phone_number || ''}
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['phone_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['phone_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                onChange={handleChange}
                sx={ `& .${outlinedInputClasses.notchedOutline} {
                    border: ${blocks['credit_card_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                & .${outlinedInputClasses.notchedOutline}:focus {
                    border: ${blocks['credit_card_number'] ? '2px solid red' : '2px solid #15291b'};
                }
                `}
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
                helperText=""
                value={details.addressBase || ''}
                onChange={handleChange}
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
                    variant="contained"
                    onClick={() => handleSubmit()}
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
