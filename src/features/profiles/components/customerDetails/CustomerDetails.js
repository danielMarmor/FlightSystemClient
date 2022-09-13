import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchCustomerById } from '../../profilesSlice';
import { removeCustomer as removeCustomerByAdmin } from '../../../manage/manageSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, messages, userType } from '../../../../constants/enums';
import {
    PrimaryTextTypography, SecTextTypography, SubHeaderTypography,
    primaryColor, HorizonStack, LeftCenterBox
} from '../../../../app/components/FormStyles';
import { SelectUserTypeId } from '../../profilesSlice';
import DoubleForm from '../../../../app/components/layout/DoubleForm';
import ActionGrid from '../../../../app/components/ActionGrid';
import { IconStack } from '../../../../app/components/FormStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddCardIcon from '@mui/icons-material/AddCard';
import HomeIcon from '@mui/icons-material/Home';
import FlagIcon from '@mui/icons-material/Flag';
import { CenterBox } from '../../../../app/components/FormStyles';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const iconStackProportions = [1, 3, 5];

const CustomerDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    const userTypeId = useSelector(SelectUserTypeId);
    const loadCustomer = async (customerId) => {
        try {
            const customer = await dispatch(fetchCustomerById(customerId)).unwrap();
            const newDetails = {
                ...customer,
                //CUSTOM STATE PROPERTIES ===> ONLY FOR SCREEN
                confirmPassword: customer.password
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleEdit = () => {
        navigate(`/Profile/Customer/Edit/${id}`);
    }

    const handleDelete = async () => {
        try {
            if (!id) {
                handleError({ message: 'Customer Not Found !' });
                return;
            }
            const customerId = parseInt(id)
            await dispatch(removeCustomerByAdmin(id)).unwrap();
            const deleteSuccesUrl = '/MyUsers';
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(messages.succefulyCommited, deleteSuccesUrl)));
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleBack = () => {
        navigate(-1);
    }

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)));
    }

    useEffect(() => {
        if (!id) {
            handleError({ message: 'Customer Not Found !' });
            return;
        }
        const customerId = parseInt(id);
        loadCustomer(customerId);
    }, []);
    const formCtrls = [
        //(1)FULL NAME
        <IconStack
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Full Name:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{`${details.first_name || ''} ${details.last_name || ''}`}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(2) USER NAME
        <IconStack
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>User Name:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.username || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(3) PASSWORD
        <IconStack
            icon={<LockIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Password:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.password || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(4)EMAIL
        <IconStack
            icon={<EmailIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Email:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.email || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(5)PHONE
        <IconStack
            icon={<LocalPhoneIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Phone Num:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.phone_number || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(6)CREDIT CARD
        <IconStack
            icon={<AddCardIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Credit Card:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.credit_card_number || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(7)ADDRESS
        <IconStack
            icon={<HomeIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Aderess:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.address || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />
    ]

    const formActions = [
    ]


    const formConfig = {
        proportions: {
            relGrid: 7,
            relActions: 0
        },
        grdDimentions: {
            horiz: 1,
            vert: 7
        },
        gaps: {
            rowGap: 20,
            colGap: 20
        }
    }
    return (
        <DoubleForm
            header={
                <HorizonStack>
                    <HorizonStack width={'50%'}
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
                                alt={`${details.first_name} ${details.last_name}`}
                                src={details.image_url}
                            >
                                {/* {`${customer.first_name.charAt(0)} ${customer.last_name.charAt(0)}`} */}
                            </Avatar>
                        </CenterBox>
                        <LeftCenterBox sx={{ paddingLeft: '5px' }}>
                            <SubHeaderTypography fontSize={'1.5rem'}>
                                {`(${details.id}) ${details.first_name} ${details.last_name}`}
                            </SubHeaderTypography>
                        </LeftCenterBox>
                    </HorizonStack>
                    <HorizonStack width={'50%'}
                        justifyContent={'flex-end'}>
                        <IconButton onClick={() => handleBack()} sx={{ padding: '0px', margin: '0px' }}>
                            <ArrowBackIosNewIcon sx={{ color: 'white', marginRight: '20px', fontSize: '26px' }}
                            />
                        </IconButton>
                        <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
                            <EditIcon sx={{ color: 'white', marginRight: '20px', fontSize: '26px' }}
                            />
                        </IconButton>
                        <IconButton onClick={() => handleDelete()}
                            sx={{
                                display: userTypeId == userType.customer ? 'none' : 'flex',
                                padding: '0px',
                                margin: '0px',
                            }}>
                            <DeleteIcon sx={{ color: 'white', marginRight: '5px', fontSize: '26px' }} />
                        </IconButton>
                    </HorizonStack>
                </HorizonStack>
            }
            leftForm={
                <ActionGrid config={formConfig}
                    formCtrls={formCtrls}
                    formActions={formActions}
                />

            }
            rightFrom={<CenterBox id='centerBox' sx={{
                width: '100%',
                height: '100%',
                borderStyle: 'none',
                borderWidth: '1px',
                borderColor: 'ligthGrey',
                backgroundImage: `url(${details.image_url})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
            </CenterBox>}
        >
        </DoubleForm>
    )
}

export default CustomerDetails;
