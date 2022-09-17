import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit'
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { FormBox, FormFrameBox, FormButton, FormTextField, FormBoxGrid, CenterBox } from '../../../../app/components/FormStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HttpsIcon from '@mui/icons-material/Https';
import { useNavigate } from 'react-router-dom';
import { login } from '../../profilesSlice';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { loginErrorTemplate , fields} from '../../../../constants/enums';
import { catchAppError } from '../../../../app/appSlice';
import { LoginValidations as validations } from '../../../../models/validation';

const Login = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();
    //const isValidated =userName && password;

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const isValidated = username && password;
            if (isValidated) {
                const loginData = { username, password };
                const response = await dispatch(login(loginData)).unwrap();
                navigate('/Flights');               
            }
        }
        catch (err) {
            handleError(err)
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(loginErrorTemplate(err.message)))
    }
    return (
        // FRAME
        <FormFrameBox sx={{
            width: '35%',
            height: '45%',
            minWidth: '265px',
            marginBottom: '100px'
        }}>
            {/* FORM CONTAINER */}
            <FormBox
                component='form'
                autoComplete="off"
                onSubmit={handleSubmit}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                {/* TABS CONTAINER */}
                <CenterBox sx={{
                    backgroundColor: '#15291b',
                    marginBottom: '0px !important',
                    height: '40px',
                    width: '100%',
                    boxSizing: 'border-box',
                    borderRadius: '4px',
                    color : 'white',
                    fontSize :'0.9rem'
                }}>
                    GET STARTED !
                    {/* <Tabs
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="Get Started !" sx={{ color: 'white', width: '100%' }} />
                    </Tabs> */}
                </CenterBox>
                {/* FORM CONTAINER 1*/}
                <FormBox
                    sx={{
                        height: '75%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                    {/* GRID CTRL CONTAINER*/}
                    <FormBox
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                        <FormTextField sx={{ marginBottom: '15px' }}
                            name="username"
                            size="small"
                            label="User Name"
                            type={validations(fields.username).type}
                            required={validations(fields.username).required}
                            placeholder="User Name"
                            autoFocus={true}
                            defaultValue=""
                            helperText=""
                            onChange={handleUserNameChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <AccountCircleIcon sx={{ color: '#15291b' }} />
                                </InputAdornment>
                            }}
                        >
                        </FormTextField>
                        <FormTextField sx={{ marginBottom: '15px' }}
                            name="password"
                            label="Password"
                            placeholder="Password"
                            size="small"
                            type={validations(fields.password).type}
                            required={validations(fields.password).required}
                            defaultValue=""
                            helperText=""
                            onChange={handlePasswordChange}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <HttpsIcon sx={{ color: '#15291b' }} />
                                </InputAdornment>
                            }}
                        >
                        </FormTextField>
                    </FormBox>
                    <Box sx={{
                        height: '35%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'center'
                    }}>
                        <FormButton
                            type="submit"
                            variant="contained"
                            sx={{ width: '100%' }}
                        >
                            Login
                        </FormButton>
                    </Box>
                </FormBox>
            </FormBox>
        </FormFrameBox>
    )
}

export default Login
