import React from 'react'
import { useState, useEffect } from 'react';
import DoubleForm from '../../../../app/components/layout/DoubleForm';
import ActionGrid from '../../../../app/components/ActionGrid';
import { FormButton, FormTextField, IconTextBox, primaryColor } from '../../../../app/components/FormStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddCardIcon from '@mui/icons-material/AddCard';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import { useNavigate, useParams } from 'react-router-dom'
import {
    editCustomer as editCustomerBySelf,
    SelectUserTypeId,
    fetchCustomerById
} from '../../profilesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import {
    addCustomer as addCustomerByAdmin,
    editCustomer as editCustomerByAdmin
} from '../../../manage/manageSlice';
import {
    ProfileErrorTemplate,
    ProfileSuccessTemplate,
    messages, userType,
    fields
} from '../../../../constants/enums';
import { CenterBox } from '../../../../app/components/FormStyles';
import { HorizonStack, LeftCenterBox, SubHeaderTypography } from '../../../../app/components/FormStyles';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../../constants/configuration';
import { CustomerValidations as validations } from '../../../../models/validation';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { FormControl, InputLabel, Select, OutlinedInput, MenuItem, IconButton, Typography } from '@mui/material';
import { GenerateProfilePhoto } from '../../../../api/photoGenrator';
import CircularIndeterminate from '../../../../app/components/waitIndicator/waitIndicator';
import ErrorPage from '../../../../app/components/ErrorPage';

const CustomerForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userTypeId = useSelector(SelectUserTypeId)
    const [details, setDetails] = useState({});
    const { mode, customerId } = useParams();

    const [photoLoading, setPhotoLoading] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            validate();
            switch (mode) {
                case 'Insert':
                    await insertCustomer();
                    break;
                case 'Edit':
                    await updateCustomer()
                    break;
            }
            //BOTH USER TYPES (ADMIN/CUST) ==> REDIRECT AFTER SUSCCESS DIALOG TO CUSTOMER DETAILLS PROFILE PAGE

        }
        catch (err) {
            handleError(err);
        }
    }
    const insertCustomer = async () => {
        //ONLY BY ADMINISTRATOR
        const newCustomer = await dispatch(addCustomerByAdmin(details)).unwrap();
        const successUrl = `/Profile/Customer/Details/${newCustomer.id}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
    }
    const updateCustomer = async () => {
        //BY ADMIN OR BY CUSOTOMEr
        const updateCustomerData = {
            customerId: customerId,
            customerData: details
        }
        //CUSTOMER
        if (userTypeId == userType.customer) {
            const response = await dispatch(editCustomerBySelf(updateCustomerData)).unwrap();
        }
        //ADMIN
        else {//(userTypeId == userType.administrator){
            const response = await dispatch(editCustomerByAdmin(updateCustomerData)).unwrap();
        }
        const successUrl = `/Profile/Customer/Details/${customerId}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
    }

    const handleCancel = () => {
        try {
            navigate(-1);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleChange = (e) => {
        try {
            const newDetails = {
                ...details,
                [e.target.name]: e.target.value
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleGeneratePhoto = async () => {
        try {
            if (!details.gender) {
                handleError({ message: 'Please select Man/Woman' });
                return;
            }
            setPhotoIndicators('init');

            const search = `${details.gender} face`
            const profilePhotoUrl = await GenerateProfilePhoto(search);

            setPhotoIndicators('success');

            const newDetails = {
                ...details,
                ['image_url']: profilePhotoUrl
            }
            setDetails(newDetails);
        }
        catch (err) {
            setPhotoIndicators('failure');
            handleError(err);
        }
    }

    const setPhotoIndicators = (action) => {
        switch (action) {
            case 'init':
                {
                    if (!photoLoading) {
                        setPhotoLoading(true);
                    }
                    if (photoError) {
                        setPhotoError(false);
                    }
                    break;
                }
            case 'success': {
                setPhotoLoading(false);
                break;
            }
            case 'failure': {
                setPhotoLoading(false);
                setPhotoError(true);
                break;
            }
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    const validate = () => {
        if (details.password != details.confirmPassword) {
            throw Error('Passwords dont match!');
        }
    }

    const loadCustomer = async (custId) => {
        try {
            const customer = await dispatch(fetchCustomerById(custId)).unwrap();
            const newDetails = {
                ...customer,
                confirmPassword: customer.password
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }

    }

    useEffect(() => {
        try {
            if (mode == 'Edit') {
                if (!customerId) {
                    const notFoundError = { message: 'Customer Not Found !' };
                    handleError(notFoundError);
                    return;
                }
                const custId = parseInt(customerId);
                loadCustomer(custId);
            }
        }
        catch (err) {
            handleError(err);
        }

    }, []);
    const formCtrls = [
        //children, name, label, details, icon, handleChange
        //USER NAME
        <IconTextBox key={1} name={'username'} label={'User Name'} details={details} validation={validations(fields.username)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={2} name={'password'} label={'Password'} details={details} validation={validations(fields.password)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={3} name={'email'} label={'Email'} details={details} validation={validations(fields.email)}
            icon={<EmailIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={4} name={'confirmPassword'} label={'Confirm Password'} details={details} validation={validations(fields.confirmPassword)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={5} name={'first_name'} label={'First Name'} details={details} validation={validations(fields.first_name)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={6} name={'last_name'} label={'Last Name'} details={details} validation={validations(fields.last_name)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox key={7} name={'phone_number'} label={'Phone Number'} details={details} validation={validations(fields.phone_number)}
            icon={<LocalPhoneIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={8} name={'credit_card_number'} label={'Credit Card Number'} details={details} validation={validations(fields.credit_card_number)}
            icon={<AddCardIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={9} name={'address'} label={'Home Address'} details={details} validation={validations(fields.address)}
            icon={<HomeIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <IconTextBox key={10} name={'addressCountry'} label={'Country'} details={details}
            icon={<FlagIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,

        <FormControl key={11} fullWidth>
            <InputLabel shrink={true}>Gender For Photo</InputLabel>
            <Select
                size="small"
                name='gender'
                value={details.gender || ''}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        style={{
                            height: 40,
                            boxSizing: 'border-box',
                            color: 'black',
                        }}
                    />
                }>
                <MenuItem key={1} value={'man'}>Man</MenuItem>
                <MenuItem key={2} value={'woman'}>Woman</MenuItem>
            </Select>
        </FormControl>,
        <IconButton
            key={12}
            onClick={() => handleGeneratePhoto()}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                padding: '0px 0px 0px 5px'
            }}
        >
            <AddAPhotoIcon
                sx={{ color: '#15291b', fontSize: '40px' }} />
            <Typography variant='body2' component='div'
                sx={{ color: '#15291b', marginLeft: '5px' }}>
                Your Best Photo
            </Typography>
        </IconButton>
    ]


    const formActions = [
        <FormButton key={1} type='submit'
            style={{ color: 'white', flex: '1' }}
        // onClick={() => handleSubmit()}
        >
            Save
        </FormButton>,
        <FormButton key={2}
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
            rowGap: 25,
            colGap: 20
        },
        padding: {
            top: 15,
            bottom: 10,
            right: 5,
            left: 5
        }
    };

    let renderPhoto;
    if (photoLoading) {
        renderPhoto = (<CircularIndeterminate />);
    }
    else if (photoError) {
        renderPhoto = (<ErrorPage />);
    }
    else {
        renderPhoto = (<CenterBox id='centerBox' sx={{
            width: '100%',
            height: '100%',
            borderStyle: 'none',
            borderWidth: '1px',
            borderColor: 'ligthGrey',
            backgroundImage: `url(${details.image_url || images.personImageDeafultURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
        </CenterBox>)
    }
    return (
        <DoubleForm
            header={
                <HorizonStack>
                    <HorizonStack width={'100%'}
                        justifyContent={'flex-start'}>
                        <CenterBox width={'40px'} height={'40px'}>
                            <Avatar
                                sx={{
                                    margin: 'auto',
                                    height: '90%',
                                    width: '90%'
                                    // backgroundColor: '#15291b',
                                    // color: 'white',
                                }}
                                alt={`${details.first_name || ''} ${details.last_name || ''}`}
                                src={details.image_url}
                            >
                                {/* {`${customer.first_name.charAt(0)} ${customer.last_name.charAt(0)}`} */}
                            </Avatar>
                        </CenterBox>
                        <LeftCenterBox sx={{ paddingLeft: '5px' }}>
                            <SubHeaderTypography fontSize={'1.5rem'}>
                                {!details.id ? 'New Profile' : `(${details.id}) ${details.first_name} ${details.last_name}`}
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
            rightFrom={renderPhoto}
        >
        </DoubleForm>
    )
}

export default CustomerForm;
