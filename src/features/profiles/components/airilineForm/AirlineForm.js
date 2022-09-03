import React from 'react'
import { useState, useEffect } from 'react'
import DoubleForm from '../../../../app/components/layout/DoubleForm'
import ActionGrid from '../../../../app/components/ActionGrid'
import {
    IconTextBox,
    AutoCompleteBox,
    FormButton,
    VerticalStack,
    CenterBox,
    HorizonStack,
    SubHeaderTypography,
    LeftCenterBox
} from '../../../../app/components/FormStyles'
import { InputAdornment, TextField } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { CompareByCountryName } from '../../../../utilities/compare'
import FlagIcon from '@mui/icons-material/Flag';
import { NavLink, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { endpoints } from '../../../../constants/configuration'
import {
    ProfileErrorTemplate,
    ProfileSuccessTemplate,
    messages, userType,
    fields
} from '../../../../constants/enums';
import { primaryColor } from '../../../../app/components/FormStyles'
import { AirlineValidations as validations } from '../../../../models/validation'
import Dreamlines787 from '../../../../assets/Dreamlines787.jpg';
import { fetchAirline } from '../../../flights/fligthSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice'
import { addAirline as addAirlineByAdmin, editAirline as editAirlineByAdmin } from '../../../manage/manageSlice'
import { useDispatch , useSelector} from 'react-redux'
import Avatar from '@mui/material/Avatar';
import { SelectUserTypeId , editAirline as editAirlineBySelf} from '../../profilesSlice'

const AirlineForm = ({countries}) => {
    const { mode, airlineId } = useParams();
    const userTypeId= useSelector(SelectUserTypeId);

    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    const navigate = useNavigate();

    const flagImageUrl = details.country_name ? `${endpoints.countriesFlags}${details.country_name}` : null;

    const airConfig = endpoints.airlineCompanies;
    const logoWidth = 400;
    const logoHeight = 200;
    const airlineLogoUrl = !details.iata || details.iata.length < 2 ? null : `${airConfig.logoPrefix}${logoWidth}/${logoHeight}/${details.iata}${airConfig.logoPostfix}`

    const loadAirline = async (airlineId) => {
        try {
            const airline = await dispatch(fetchAirline(airlineId)).unwrap();
            const newDetails = {
                ...airline,
                //CUSTOM STATE PROPERTIES ===> ONLY FOR SCREEN
                confirmPassword: airline.password
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleSubmit = async(e) => {
        try {
            e.preventDefault();
            validate();
            switch (mode) {
                case 'Insert':
                    await insertAirline();
                    break;
                case 'Edit':
                    await updateAirline()
                    break;
            }
            //BOTH USER TYPES (ADMIN/CUST) ==> REDIRECT AFTER SUSCCESS DIALOG TO CUSTOMER DETAILLS PROFILE PAGE
        }
        catch (err) {
            handleError(err);
        }
    }
    const insertAirline = async () => {
        //ONLY BY ADMINISTRATOR
        const newAirline = await dispatch(addAirlineByAdmin(details)).unwrap();
        const successUrl = `/Profile/Airline/Details/${newAirline.id}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
    }
    const updateAirline = async () => {
        //BY ADMIN OR BY CUSOTOMEr
        const updateAirlineData = {
            airlineId: airlineId,
            airlineData: details
        }
        //AIRLINE
        if (userTypeId == userType.airline) {
            const response = await dispatch(editAirlineBySelf(updateAirlineData)).unwrap();
        }
        //ADMIN
        else {//(userTypeId == userType.administrator){
            const response = await dispatch(editAirlineByAdmin(updateAirlineData)).unwrap();
        }
        const successUrl = `/Profile/Airline/Details/${airlineId}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
    }

    const validate=()=>{
        if (details.password != details.confirmPassword) {
            throw Error('Passwords dont match!');
        }
    }
    const handleCancel = () => {
        navigate(-1);
    }
    const handleChange = (e) => {
        const newDetails = {
            ...details,
            [e.target.name]: e.target.value
        }
        setDetails(newDetails);
    }
    const handleCountryChange = (name) => {
        let country_name, country_id;
        const country = countries.find(cou => cou.name == name);
        if (!country) {
            country_id = null;
            country_name = null;
            //COUNTRY NAME REMIAN THE SAME SO DONT DISAPPER FROM COMPONENT
            //country_name = ?
        }
        else {
            country_id = country.id;
            country_name = country.name;
        }
        const newDetails = {
            ...details,
            ['country_name']: country_name,
            ['country_id']: country_id
        };
        setDetails(newDetails);

    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }

    useEffect(() => {
        if (mode == 'Edit') {
            if (!airlineId) {
                const notFoundError = { message: 'Airline Not Found !' };
                handleError(notFoundError);
                return;
            }
            loadAirline(airlineId);
        }

    }, []);

    const handleAviationSymbolInfo = () => {
        //SHOW POPUP INFO!
    }

    const formCtrls = [
        //children, name, label, details, icon, handleChange
        //USER NAME
        <IconTextBox name={'username'} label={'User Name'} details={details} validation={validations(fields.username)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'password'} label={'Password'} details={details} validation={validations(fields.password)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'email'} label={'Email'} details={details} validation={validations(fields.email)}
            icon={<EmailIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'confrimPassword'} label={'Confirm Password'} details={details} validation={validations(fields.confirmPassword)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'name'} label={'Airline Company Name'} details={details} validation={validations(fields.name)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'iata'} label={'Aviation Symbol'} details={details} validation={validations(fields.iata)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <AutoCompleteBox
            freeSolo
            id="homeCountry"
            name="country_name"
            value={details.country_name || ''}
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
                        type: 'search',
                        startAdornment: <InputAdornment position="start">
                            <FlagIcon sx={{ color: '#15291b' }} />
                        </InputAdornment>,
                        endAdornment: <InputAdornment position="end">
                            <div style={{
                                backgroundImage: `url(${flagImageUrl})`,
                                backgroundSize: 'cover',
                                width: '3rem',
                                height: '2rem',
                                backgroudPosition :'center',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </div>
                        </InputAdornment>
                    }}
                />
            )}
        />,
        <NavLink to='/Flights' style={{ fontSize: '0.9rem' }}
            onClick={() => handleAviationSymbolInfo}>
            About Aviation Symbol
        </NavLink>
    ]


    const formActions = [
        <FormButton
            style={{ color: 'white', flex: '1' }}
            type='submit'
        >
            Save
        </FormButton>,
        <FormButton
            style={{ color: 'white', flex: '1' }}
            onClick={() => handleCancel()}
        >
            Cancel
        </FormButton>
    ]


    const formConfig = {
        proportions: {
            relGrid: 6,
            relActions: 1
        },
        grdDimentions: {
            horiz: 2,
            vert: 6
        },
        gaps: {
            rowGap: 30,
            colGap: 20
        }
    };
    return (
        <DoubleForm
            header={
                <HorizonStack>
                    <HorizonStack width={'50%'}
                        justifyContent={'flex-start'}>
                        <CenterBox width={'40px'} height={'40px'}>
                            <Avatar sx={{
                                margin: 'auto',
                                height: '90%',
                                width: '90%',
                                backgroundColor: 'white',
                                color: '#15291b',
                            }}
                                alt={details.name || ''}
                            >
                                {(details.name && details.name.charAt(0)) || ''}
                            </Avatar>
                        </CenterBox>
                        <LeftCenterBox sx={{ paddingLeft: '5px' }}>
                            <SubHeaderTypography fontSize={'1.5rem'}>
                                {!details.id ? 'New Profile' : `(${details.id}) ${details.name}`}
                            </SubHeaderTypography>
                        </LeftCenterBox>
                    </HorizonStack>
                </HorizonStack>
            }
            leftForm={
                <form
                    style={{ width: '100%', height: '100%' }}
                    onSubmit={handleSubmit}>
                    <ActionGrid config={formConfig}
                        formCtrls={formCtrls}
                        formActions={formActions}
                    />
                </form>

            }
            rightFrom={<VerticalStack>
                <CenterBox id='centerBox1' sx={{
                    width: '100%',
                    height: '50%',
                    borderStyle: 'none',
                    borderWidth: '1px',
                    borderColor: 'ligthGrey',
                    backgroundImage: `url(${Dreamlines787})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </CenterBox>
                <CenterBox id='centerBox2' sx={{
                    width: '100%',
                    height: '50%',
                    borderStyle: 'none',
                    borderWidth: '1px',
                    borderColor: 'ligthGrey',
                    backgroundImage: `url(${airlineLogoUrl})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </CenterBox>
            </VerticalStack>}
        >
        </DoubleForm>
    )
}

export default AirlineForm
