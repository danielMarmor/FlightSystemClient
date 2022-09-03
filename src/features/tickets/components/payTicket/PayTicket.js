import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import ActionGrid from '../../../../app/components/ActionGrid'
import DoubleForm from '../../../../app/components/layout/DoubleForm'
import { catchAppError  ,showSuccessMessage} from '../../../../app/appSlice'
import { OrderErrorTemplate,  OrderSuccessTemplate } from '../../../../constants/enums'
import { fetchFlightById, orderDetailsChanged, SelectOrderDetails, addTicket } from '../../ticketsSlice';
import { fetchCustomerById, SelectIdentityId, SelectFirstName } from '../../../profiles/profilesSlice'
import { endpoints } from '../../../../constants/configuration'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import secure from '../../../../assets/secure.png'
import visaCardIcon from '../../../../assets/visaCardIcon.jpg'
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddCardIcon from '@mui/icons-material/AddCard';
import HomeIcon from '@mui/icons-material/Home';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HourglassTopIcon from '@mui/icons-material/HourglassTop';
import { Box, Typography } from '@mui/material'
import { fields, messages } from '../../../../constants/enums'
import { PaymentValidations as validations } from '../../../../models/validation';
import {
    HorizonStack,
    VerticalStack,
    CenterBox,
    LeftCenterBox,
    SubHeaderTypography,
    FormButton,
    IconTextBox
} from '../../../../app/components/FormStyles'

const primaryColor = '#15291b';

const PayTicket = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const orderDetails = useSelector(SelectOrderDetails)
    const [flight, setFlight] = useState(null);
    const [customer, setCustomer] = useState(null);

    const customerId = useSelector(SelectIdentityId);
    const customerFirstName = useSelector(SelectFirstName);

    const airConfig = endpoints.airlineCompanies;
    const logoWidth = 100;
    const logoHeight = 40;
    const airlineLogoUrl = flight &&
        (!flight.airline_company_iata || flight.airline_company_iata.length < 2 ? null : `url(${airConfig.logoPrefix}${logoWidth}/${logoHeight}/${flight.airline_company_iata}${airConfig.logoPostfix})`);

    const loadData = async () => {
        const fetchCustomer = await dispatch(fetchCustomerById(customerId)).unwrap();
        const fetchedFlight = await dispatch(fetchFlightById(flightId)).unwrap();
        setCustomer(fetchCustomer);
        setFlight(fetchedFlight);
    }
    const handleBack = () => {
        navigate(-1);
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        try { 
            const ticketData ={
                flight_id: flight.id,
                customer_id : customer.id,
                position : orderDetails.seat
            }
            const ticket = await dispatch(addTicket(ticketData)).unwrap();
            const homeUrl  ='/MyTickets';
            dispatch(showSuccessMessage
                (OrderSuccessTemplate(`Ticket number ${ticket.id} created. See you on board, ${customerFirstName}!`, homeUrl))); 
        }
        catch (err) {
            handleError(err);
        }

    }
    const handleCustomerChange = () => {
        //FOR NOW ====> PASS
    }
    const handleCancel = () => {
        navigate('/Flights');
    }
    const handlePaymentChange = (e) => {
        const payDetails = {
            name: e.target.name,
            value: e.target.value
        }
        dispatch(orderDetailsChanged(payDetails));
    }
    const handleError = (err) => {
        dispatch(catchAppError(OrderErrorTemplate(err.message)));
    }

    useEffect(() => {
        try {
            loadData();
        }
        catch (err) {
            handleError(err);
        }
    }, []);
    const formCustomerCtrls = [
        <HorizonStack sx={{ borderBottom: '1px solid black', paddingLeft: '7px' }}>
            <Typography flex={2} component={'div'} variant={'h6'}
                sx={{ fontWeight: 'bolder', fontSize: '1.3rem', padding: '0px 0px 5px 10px' }}>
                Servix Secured
            </Typography>
            <Box flex={3}
                height={'100%'}
                m={0} p={0}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems='flex-start'
            >
                <CenterBox id='centerBox' sx={{
                    width: '40px',
                    height: '40px',
                    borderStyle: 'none',
                    borderWidth: '1px',
                    borderColor: 'ligthGrey',
                    backgroundImage: `url(${secure})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </CenterBox>
            </Box>
        </HorizonStack>,
        <IconTextBox name={'first_name'} label={'First Name'} details={customer || {}} readonly={'true'}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,
        <IconTextBox name={'last_name'} label={'Last Name'} details={customer || {}} readonly={'true'}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,
        <IconTextBox name={'phone_number'} label={'Phone Number'} details={customer || {}} readonly={'true'}
            icon={<LocalPhoneIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,
        <IconTextBox name={'email'} label={'Email'} details={customer || {}}
            icon={<EmailIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,
        <IconTextBox name={'address'} label={'Home Address'} details={customer || {}} readonly={'true'}
            icon={<HomeIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,
    ];
    const formCustomerActions = [
        <FormButton
            style={{ color: 'white', flex: '1' }}
            onClick={() => handleBack()}
        >
            Back To Order
        </FormButton>,
        <FormButton
            style={{ color: 'white', flex: '1' }}
            onClick={() => handleCancel()}
        >
            Cancel
        </FormButton>
    ]
    const formCustomerConfig = {
        proportions: {
            relGrid: 5,
            relActions: 1
        },
        grdDimentions: {
            horiz: 1,
            vert: 6
        },
        gaps: {
            rowGap: 20,
            colGap: 20
        }
    }
    const formPaymentActions = [
        <FormButton type='submit'
            sx={{
                backgroundColor: '#f7c602 !important',
                color: 'black',
                fontWeight: 'bold',
                flex: '1'
            }}
        >
            Pay
        </FormButton>
    ];
    const formPaymentCtrls = [
        <Box flex={3} sx={{ gridRowEnd: 'span 3', gridColumnEnd: 'span 2' }}
            height={'100%'}
            m={0} p={0}
            display={'flex'}
            justifyContent={'flex-start'}
            alignItems='flex-start'
        >
            <CenterBox id='centerBox' sx={{
                width: '100%',
                height: '100%',
                borderStyle: 'none',
                borderWidth: '1px',
                borderColor: 'ligthGrey',
                backgroundImage: `url(${visaCardIcon})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center'
            }}>
            </CenterBox>
        </Box>,
        <IconTextBox name={'priceText'} label={'Total Charge:'} details={flight || {}} readonly={'true'}
            sx={{ gridColumnEnd: 'span 2' }}
            icon={<MonetizationOnIcon sx={{ color: primaryColor }} />} handleChange={handleCustomerChange} />,

        <IconTextBox name={'credit_card_number'} label={'Credit Card Number'} details={orderDetails || {}}
            sx={{ gridColumnEnd: 'span 2' }} validation={validations(fields.credit_card_number)}
            icon={< AddCardIcon sx={{ color: primaryColor }} />} handleChange={handlePaymentChange} />,

        <IconTextBox name={'expirationDate'} label={'Expires'} details={orderDetails || {}} validation={validations(fields.expirationDate)}
            icon={<HourglassTopIcon sx={{ color: primaryColor }} />} handleChange={handlePaymentChange} />,

        <IconTextBox name={'securityCode'} label={'Security'} details={orderDetails || {}} validation={validations(fields.securityCode)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handlePaymentChange} />



    ];
    const formPaymentConfig = {
        proportions: {
            relGrid: 5,
            relActions: 1
        },
        grdDimentions: {
            horiz: 2,
            vert: 6
        },
        gaps: {
            rowGap: 20,
            colGap: 20
        }
    }
    return (
        <DoubleForm
            header={
                <CenterBox flex={1}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: primaryColor,
                        paddingLeft: '10px'
                    }}>
                    <HorizonStack flex={1} sx={{ paddingLeft: '10px' }}
                    >
                        <LeftCenterBox flex={0.25}
                            sx={{
                                textOverflow: 'elipsis',
                                overflow: 'hidden',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            <SubHeaderTypography>{flight && `${flight.airline_company_name} (${flight.airline_company_iata})`}</SubHeaderTypography>
                        </LeftCenterBox>

                        <Box flex={0.25} sx={{ borderRight: '2px solid #15291b' }}
                            height={'100%'}
                            m={0} p={0}
                            display={'flex'}
                            justifyContent={'center'}
                            alignItems='flex-start'
                        >
                            <Box sx={{
                                width: '100px',
                                height: '40px',
                                borderStyle: 'none',
                                borderWidth: '1px',
                                borderColor: 'ligthGrey',
                                backgroundImage: airlineLogoUrl,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat'
                            }}>
                            </Box>
                        </Box>
                        <HorizonStack flex={0.5} sx={{ paddingLeft: '12px' }}>
                            <SubHeaderTypography flex={0.4} >{flight && `Flight No. ${flight.airline_company_iata}-${flight.id}`}</SubHeaderTypography>
                            <SubHeaderTypography flex={0.4}>{orderDetails && `Seat No. ${orderDetails.seatChar}`}</SubHeaderTypography>
                        </HorizonStack>

                    </HorizonStack>
                </CenterBox>
            }
            leftForm={
                <ActionGrid config={formCustomerConfig}
                    formCtrls={formCustomerCtrls}
                    formActions={formCustomerActions}
                />
            }
            rightFrom={
                <form onSubmit={handleSubmit}
                    style={{ width: '100%', height: '100%' }}>
                    <ActionGrid config={formPaymentConfig}
                        formCtrls={formPaymentCtrls}
                        formActions={formPaymentActions}
                    />
                </form>
            }
        />

    )
}

export default PayTicket
