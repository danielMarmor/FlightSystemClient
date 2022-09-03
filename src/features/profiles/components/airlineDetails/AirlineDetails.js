import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAirline } from '../../../flights/fligthSlice';
import { removeAirline as removeAirlineByAdmin } from '../../../manage/manageSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, messages, userType } from '../../../../constants/enums';
import {
    PrimaryTextTypography, SecTextTypography, SubHeaderTypography,
    primaryColor, HorizonStack, LeftCenterBox, VerticalStack
} from '../../../../app/components/FormStyles';
import DoubleForm from '../../../../app/components/layout/DoubleForm';
import ActionGrid from '../../../../app/components/ActionGrid';
import { IconStack } from '../../../../app/components/FormStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlagIcon from '@mui/icons-material/Flag';
import { CenterBox } from '../../../../app/components/FormStyles';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { endpoints } from '../../../../constants/configuration'
import Dreamlines787 from '../../../../assets/Dreamlines787.jpg';
import { SelectUserTypeId } from '../../profilesSlice';

const iconStackProportions = [1, 3, 5];

const AirlineDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});
    const userTypeId = useSelector(SelectUserTypeId)
    const airConfig = endpoints.airlineCompanies;
    const logoWidth = 300;
    const logoHeight = 150;
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
    const handleEdit = () => {
        navigate(`/Profile/Airline/Edit/${id}`);
    }

    const handleDelete = async () => {
        try {
            if (!id) {
                handleError({ message: 'Airline Not Found !' });
                return;
            }
            const airlineId = parseInt(id)
            await dispatch(removeAirlineByAdmin(airlineId)).unwrap();
            const deleteSuccesUrl = '/MyUsers';
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(messages.succefulyCommited, deleteSuccesUrl)));
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)));
    }

    useEffect(() => {
        if (!id) {
            handleError({ message: 'Airline Not Found !' });
            return;
        }
        const airlineId = parseInt(id);
        loadAirline(airlineId);
    }, []);
    const formCtrls = [
        //(1) NAME
        <IconStack
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Airline Name:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{`${details.name || ''}`}</SecTextTypography>}
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
        //(5)COUNTRY  NAME
        <IconStack
            icon={<FlagIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Country Name:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.country_name || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />,
        //(6)AVIATION SYMBOL
        <IconStack
            icon={<FlightTakeoffIcon sx={{ color: primaryColor }} />}
            label={<PrimaryTextTypography>Symbol:</PrimaryTextTypography>}
            value={<SecTextTypography sx={{ width: '100px' }}>{details.iata || ''}</SecTextTypography>}
            proportions={iconStackProportions}
        />
    ]

    const formActions = [
    ]


    const formConfig = {
        proportions: {
            relGrid: 6,
            relActions: 0
        },
        grdDimentions: {
            horiz: 1,
            vert: 6
        },
        gaps: {
            rowGap: 30,
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
                                {`(${details.id}) ${details.name}`}
                            </SubHeaderTypography>
                        </LeftCenterBox>
                    </HorizonStack>
                    <HorizonStack width={'50%'}
                        justifyContent={'flex-end'}>
                        <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
                            <EditIcon sx={{ color: 'white', marginRight: '20px', fontSize: '26px' }}
                            />
                        </IconButton>
                        <IconButton
                            sx={{
                                padding: '0px',
                                margin: '0px',
                                display: userTypeId == userType.airline ? 'none' : 'flex'
                            }}
                            onClick={() => handleDelete()}>
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
            rightFrom={
                <VerticalStack>
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
                </VerticalStack>
            }
        />

    )
}

export default AirlineDetails
