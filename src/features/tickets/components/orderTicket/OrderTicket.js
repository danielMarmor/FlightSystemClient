import React, { useEffect } from 'react'
import {
    FormFrameBox,
    FormButton,
    VerticalStack,
    HorizonStack,
    CenterBox,
    LeftCenterBox,
    PrimaryTextTypography,
    SecTextTypography,
    SubHeaderTypography
} from '../../../../app/components/FormStyles'
import { Box, Divider, FormControl, FormControlLabel, Checkbox } from '@mui/material';
import { fetchFlightById, SelectFlightById } from '../../ticketsSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CapacityModels } from '../../../../constants/commonLists';
import { endpoints } from '../../../../constants/configuration';
import SeatPicker from './SeatPicker';
import { SelectOrderDetails, orderDetailsChanged } from '../../ticketsSlice';
import { catchAppError } from '../../../../app/appSlice';
import { OrderErrorTemplate } from '../../../../constants/enums';
import moment from 'moment';

const primaryColor = '#15291b';

const searchInputsHeight = 24;

const OrderTicket = () => {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [flight, setFlight] = useState(null);

    const departureDate = flight && moment(flight.departure_time).format('DD/MM/YY');
    const departureTime = flight && moment(flight.departure_time).format('HH:mm');
    const landignDate = flight && moment(flight.landing_time).format('DD/MM/YY');
    const landingTime = flight && moment(flight.landing_time).format('HH:mm');

    const airConfig = endpoints.airlineCompanies;
    const logoWidth = 100;
    const logoHeight = 40;
    const airlineLogoUrl = flight &&
        (!flight.airline_company_iata || flight.airline_company_iata.length < 2 ? null : `url(${airConfig.logoPrefix}${logoWidth}/${logoHeight}/${flight.airline_company_iata}${airConfig.logoPostfix})`);

    const numSeats = flight && flight.num_seats;
    const capModel = numSeats && CapacityModels.find(cap => cap.numSeats == numSeats);

    const orderDetails = useSelector(SelectOrderDetails);
    const canPurchse = orderDetails.accept && orderDetails.seat;

    const loadFlight = async (flightId) => {
        const fetchedFlight = await dispatch(fetchFlightById(flightId)).unwrap();
        setFlight(fetchedFlight);
    }
    const updatePaymentElements =()=>{
        const creditCardNumber = {
            name: 'credit_card_number',
            value: '0000-0000-0000-0000'
        }
        dispatch(orderDetailsChanged(creditCardNumber));
        const expirationDate = {
            name: 'expirationDate',
            value: '01/22'
        }
        dispatch(orderDetailsChanged(expirationDate));
        const securityCode = {
            name: 'securityCode',
            value: '000'
        }
        dispatch(orderDetailsChanged(securityCode));
    }
    const updateOrderPrice =(value)=>{
        const priceData = {
            name: 'price',
            value: value
        }
        dispatch(orderDetailsChanged(priceData));
    }
    const handleCheckedChanged = (e) => {
        try {
            const changedData = {
                name: e.target.name,
                value: e.target.checked
            }
            dispatch(orderDetailsChanged(changedData));
        }
        catch (err) {
            handleError(err);
        }
    }
    const handlePurchase = () => {
        if (!canPurchse) {
            return;
        }
        updateOrderPrice(flight.price);
        updatePaymentElements();
        navigate(`/Ticket/Pay/${flightId}`);
    }

    const handleCancel = () => {
        navigate(-1);
    }

    useEffect(() => {
        try {
            loadFlight(flightId)
        }
        catch (err) {
            handleError(err);
        }
    }, []);

    const handleError = (err) => {
        dispatch(catchAppError(OrderErrorTemplate(err.message)));
    }
    return (
        <FormFrameBox sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
            <VerticalStack>
                <CenterBox flex={1}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: primaryColor,
                        paddingLeft: '10px'
                    }}>
                    <HorizonStack flex={1}
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
                        <LeftCenterBox flex={0.5}
                            sx={{ paddingLeft: '20px' }}>
                            <SubHeaderTypography>{capModel && `${capModel.airplane} (${capModel.name})`}</SubHeaderTypography>
                        </LeftCenterBox>

                    </HorizonStack>
                </CenterBox>
                <HorizonStack flex={10} marginTop={'5px'} spacing={2}>
                    <VerticalStack marginRight={'10px'} flex={1}
                        sx={{
                            border: `4px solid ${primaryColor}`,
                            padding: '10px 15px 10px 15px'
                        }}
                    >
                        <HorizonStack flex={1} sx={{ borderBottom: `1px solid ${primaryColor}` }}>
                            <LeftCenterBox flex={0.3}>
                                <PrimaryTextTypography>Flight No:</PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox flex={0.2}
                            >
                                <SecTextTypography>{flight && `${flight.airline_company_iata}-${flight.id}`}</SecTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox flex={0.5}>
                                <PrimaryTextTypography color={'green'} fontSize={'1.05rem'}>Availiable</PrimaryTextTypography>
                            </LeftCenterBox>
                        </HorizonStack>
                        <HorizonStack flex={1}>
                            <LeftCenterBox width={'30%'}>
                                <PrimaryTextTypography>Origin:</PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'30%'}>
                                <SecTextTypography>{flight && flight.origin_country_name}</SecTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'25%'}>
                                <SecTextTypography>{departureDate || ''}</SecTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'15%'}>
                                <SecTextTypography>{departureTime || ''}</SecTextTypography>
                            </LeftCenterBox>
                        </HorizonStack>
                        <HorizonStack flex={1} sx={{ borderBottom: `1px solid ${primaryColor}` }}>
                            <LeftCenterBox width={'30%'}>
                                <PrimaryTextTypography>Destination:</PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'30%'}>
                                <SecTextTypography>{flight && flight.destination_country_name}</SecTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'25%'}>
                                <SecTextTypography>{landignDate || ''}</SecTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox width={'15%'}>
                                <SecTextTypography>{landingTime || ''}</SecTextTypography>
                            </LeftCenterBox>
                        </HorizonStack>
                        <HorizonStack flex={1}>
                            <LeftCenterBox flex={1.6}>
                                <PrimaryTextTypography>Price: </PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox flex={2}>
                                <PrimaryTextTypography fontSize={'1.1rem'} fontWeight={'700'}>{flight && `${flight.price} $`}</PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox flex={1.1}>
                                <PrimaryTextTypography>Seat:</PrimaryTextTypography>
                            </LeftCenterBox>
                            <LeftCenterBox flex={2.6}>
                                <SecTextTypography>{orderDetails.seatChar || 'Not Selected'}</SecTextTypography>
                            </LeftCenterBox>
                        </HorizonStack>
                        <Divider color={'lightgrey'} />
                        <VerticalStack flex={2.5}
                            justifyContent={'flex-start'}
                            alignItems={'flex-start'}
                        >
                            <PrimaryTextTypography
                                sx={{ marginTop: '10px' }}
                            >Clarifications:</PrimaryTextTypography>
                            <CenterBox>
                                <p style={{
                                    width: '100%',
                                    height: '100%',
                                    border: `1px solid ${primaryColor}`,
                                    fontSize: '0.9rem',
                                    lineHeight: '25px'

                                }}
                                >
                                    *Price is per one seat only <br />
                                    *Please accurate on time and don't come late on flight <br />
                                    *Departure is exactly in determined hour, plus minus <br />
                                    *Refunds on this issue will not be accepted
                                </p>
                            </CenterBox>
                        </VerticalStack>
                        <HorizonStack flex={1} justifyContent={'flex-start'} alignItems={'flex-start'}
                        >
                            <FormControl>
                                <FormControlLabel
                                    control={<Checkbox
                                        name='accept'
                                        checked={orderDetails.accept}
                                        onChange={handleCheckedChanged}
                                        sx={{ color: '#15291b' }}
                                    />}
                                    label={
                                        <SecTextTypography fontSize={'0.9rem'}>
                                            Accept and Agree
                                        </SecTextTypography>}
                                />
                            </FormControl>
                        </HorizonStack>
                        <HorizonStack flex={1} >
                            <CenterBox>
                                <p
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        fontSize: '0.9rem'
                                    }}
                                >
                                    More terms, campaign and packages offering is our website <br />
                                    visit <a href={flight && `https://${flight.airline_company_name}.com`}>
                                        {`https://${flight && flight.airline_company_name}.com`}</a>
                                </p>
                            </CenterBox>
                        </HorizonStack>
                        <HorizonStack flex={1}
                            direction={'row'}
                            alignItems={'flex-end'}
                            width={'100%'}
                        >
                            <FormButton variant="contained"
                                onClick={() => handlePurchase()}
                                flex={1}
                                height={searchInputsHeight + 2}
                                sx={{
                                    color: canPurchse ? 'white' : 'black'
                                }}
                            >
                                Purchase
                            </FormButton>

                            <FormButton variant="contained"
                                flex={1}
                                height={searchInputsHeight + 2}
                                sx={{ marginLeft: '10px' }}
                                onClick={() => handleCancel()}
                            >
                                Cancel
                            </FormButton>


                        </HorizonStack>
                    </VerticalStack>
                    <CenterBox
                        marginLeft={'10px'}
                        flex={1} height={'100%'}
                        sx={{
                            border: `4px solid ${primaryColor}`,
                        }}
                    >
                        {(!flight && (<div></div>))
                            || (flight &&
                                <SeatPicker model={capModel} dimentions={{ width: capModel.width, height: 450 }}
                                    currentSelected={orderDetails.seat}
                                    tickets={flight && flight.TicketForFlights} />)}


                    </CenterBox>
                </HorizonStack>
            </VerticalStack>

        </FormFrameBox >

    )
}

export default OrderTicket
