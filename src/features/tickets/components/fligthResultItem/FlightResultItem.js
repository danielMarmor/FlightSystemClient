import React from 'react'
import { Box, Stack, Typography, ListItemButton } from '@mui/material';
import { endpoints } from '../../../../constants/configuration';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import airplane1 from '../../../../assets/airplane1.png';
import { FlightModel } from '../../../flights/models/flightModel'
import { cusotmerFlightStatus } from '../../../../constants/enums'
import DoneIcon from '@mui/icons-material/Done';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { resetOrderDetails } from '../../ticketsSlice';
import { SelectUserTypeId } from '../../../profiles/profilesSlice';
import { userType, TicketsLoginTemplate } from '../../../../constants/enums';
import { showSuccessMessage } from '../../../../app/appSlice';

momentDurationFormatSetup(moment);

const FlightStatus = ({ statusId, flight }) => {
  switch (statusId) {
    case cusotmerFlightStatus.availiable:
      const availiableTemplate = (
        <Stack direction={'column'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}>
          <Box
            width={'100%'}
            height={20}
            textAlign={'center'}
            fontSize={'0.9rem'}
            fontWeight={'800'}>
            {`${flight.price} $`}
          </Box>
          <Box
            width={'100%'}
            height={20}
            textAlign={'center'}
          >
            <DoneIcon sx={{ color: '#4ead5b' }} />
          </Box>
        </Stack>);
      return availiableTemplate;

    case cusotmerFlightStatus.booked:
      const bookedStatusTemplate = (
        <Stack direction={'column'}
          width={'100%'}
          height={'100%'}>
          <Box flex={1}
            width={'100%'}
            textAlign={'center'}
            fontSize={'0.9rem'}
            fontWeight={'800'}>
            {`${flight.price} $`}
          </Box>
          <Box flex={1}
            width={'100%'}
            textAlign={'center'}
            fontSize={'0.9rem'}
            fontWeight={'700'}
            color={'#15291b'}
          >
            Booked
          </Box>
        </Stack>);
      return bookedStatusTemplate

    case cusotmerFlightStatus.departured:
      const departuredStatusTemplate = (
        <Stack direction={'column'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}>
          <Box
            width={'100%'}
            height={15}
            textAlign={'center'}
            fontSize={'0.8rem'}
            fontWeight={'800'}>
            Departured
          </Box>
          <Box
            width={'100%'}
            height={15}
            marginTop={'2px'}
            textAlign={'center'}
            fontSize={'0.7rem'}
            fontWeight={'400'}
            color={'red'}
          >
            Not Availiable
          </Box>
        </Stack>);
      return departuredStatusTemplate;

    case cusotmerFlightStatus.soldout:
      const soldOutStatusTemplate = (
        <Stack direction={'column'}
          width={'100%'}
          height={'100%'}>
          <Box flex={1}
            width={'100%'}
            textAlign={'center'}
            fontSize={'0.8rem'}
            fontWeight={'800'}>
            Sold Out
          </Box>
          <Box flex={1}
            width={'100%'}
            textAlign={'center'}
            fontSize={'0.7rem'}
            fontWeight={'400'}
            color={'red'}
          >
            Not Availiable
          </Box>
        </Stack>);
      return soldOutStatusTemplate;
    case cusotmerFlightStatus.userTypeBlocked:
      const cusotmersOnlyTemplate = (
        <Stack direction={'column'}
          justifyContent={'center'}
          width={'100%'}
          height={'100%'}>
          <Box
            width={'100%'}
            height={15}
            textAlign={'center'}
            fontSize={'0.8rem'}
            fontWeight={'800'}>
            Customers Only
          </Box>
          <Box
            width={'100%'}
            height={15}
            marginTop={'2px'}
            textAlign={'center'}
            fontSize={'0.7rem'}
            fontWeight={'400'}
            color={'red'}
          >
            Not Availiable
          </Box>
        </Stack>);
      return cusotmersOnlyTemplate;
    default: return (<div></div>)
  }

}

const FlightResultItem = (props) => {
  const { flight, height } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userTypeId = useSelector(SelectUserTypeId);

  const handleFlightSelceted = (e) => {
    if (flight.status != cusotmerFlightStatus.availiable) {
      return;
    }
    if (userTypeId == userType.anonym) {
      const loginMessage = 'Purchase Ticket ? first login or register';
      const loginUrl = '/Login';
      dispatch(showSuccessMessage(TicketsLoginTemplate(loginMessage, loginUrl)));
      return;
    }
    dispatch(resetOrderDetails({}));
    const flightDate = moment(flight.departure_time).format('DD/MM/YYYY');
    navigate(`/Ticket/Order/${flight.flight_id}`);
  }

  const airConfig = endpoints.airlineCompanies;
  const logoWidth = 100;
  const logoHeight = 40;
  const airlineLogoUrl = !flight.airline_iata || flight.airline_iata.length < 2 ? null : `url(${airConfig.logoPrefix}${logoWidth}/${logoHeight}/${flight.airline_iata}${airConfig.logoPostfix})`
  const origCountryFlag = `url(${endpoints.countriesFlags}${flight.origin_country_name})`;
  const destCountryFlag = `url(${endpoints.countriesFlags}${flight.dest_country_name})`;

  const flightDuration = FlightModel.getDurationFormat(flight.departure_time, flight.landing_time);
  return (
    <ListItemButton
      onClick={() => handleFlightSelceted()}
      spacing={0}
      sx={{
        width: '100%',
        height: height,
        margin: '5px 0px 0px 0px',
        padding: '0px',
        '&:hover': {
          backgroundColor: flight.status == cusotmerFlightStatus.availiable ?
            '#79fc9c' : 'inherit',
          cursor: flight.status == cusotmerFlightStatus.availiable ?
            'pointer' : 'default',
        }
      }}
    >
      <Box spacing={0}
        sx={{
          width: '100%',
          height: '100%',
          padding: '0px',
          boxSizing: 'border-box',
          border: '2px solid #15291b'
        }}>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
          spacing={0}
          sx={{
            width: '100%',
            height: '100%',
            margin: '0px',
            padding: '0px',
            flexDirection: 'row'
          }}
        >
          <Box flex={1.5} sx={{ borderRight: '2px solid #15291b' }}
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
          <Box flex={1.25} height={'100%'} m={0} p={0} >
            <Stack direction={'column'} sx={{ width: '100%', height: '100%', paddingLeft: '5px' }}>
              <Stack direction={'row'} justifyContent={'flex-end'} flex={1}>
                <Box color={'black'} flex={0.8} sx={{ fontSize: '0.8rem', color: 'black', textAlign: 'right' }}>{flight.origin_country_name}</Box>
                <Box flex={0.8}>
                  <div name="origlogo"
                    style={{
                      width: '80%',
                      height: '90%',
                      borderStyle: 'none',
                      borderWidth: '1px',
                      borderColor: 'ligthGrey',
                      backgroundImage: origCountryFlag,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'

                    }}>
                  </div>
                </Box>
              </Stack>
              <Box flex={1}
                sx={{ width: '100%', textAlign: 'center' }}>
                {flight.origin_country_airport_abbr}
              </Box>
            </Stack>
          </Box>
          <Box flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-around'}
            alignItems={'center'}
            fontWeight={'bold'}
            height={'100%'}
            m={0}
            p={0}
          >
            {moment(flight.departure_time).format('HH:mm')}
          </Box>
          <Box flex={1} height={'100%'} m={0} p={0}>

          </Box>
          <Box flex={0.5}
            height={'100%'}
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            m={0}
            p={0}
          >
            <div name="flightIcon"
              style={{
                width: '20px',
                height: '20px',
                borderStyle: 'none',
                borderWidth: '1px',
                borderColor: 'ligthGrey',
                backgroundImage: `url(${airplane1}`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'

              }}>
            </div>
          </Box>
          <Box flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-around'}
            alignItems={'flex-end'}
            fontWeight={'bold'}
            height={'100%'}
            fontSize={'0.75rem'}
            m={0}
            p={0}
          >
            {`..........${flightDuration}`}
          </Box>
          <Box flex={1}
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'space-around'}
            alignItems={'center'}
            fontWeight={'bold'}
            height={'100%'}
            m={0}
            p={0}
          >
            {moment(flight.landing_time).format('HH:mm')}
          </Box>


          <Box flex={1.25} height={'100%'} m={0} p={0}>
            <Stack direction={'column'} sx={{ width: '100%', height: '100%', paddingLeft: '5px' }}>
              <Stack direction={'row'} justifyContent={'flex-end'} flex={1}>
                <Box color={'black'} flex={0.8} sx={{ fontSize: '0.8rem', color: 'black', textAlign: 'right' }}>{flight.dest_country_name}</Box>
                <Box flex={0.8}>
                  <div name="destlogo"
                    style={{
                      width: '80%',
                      height: '90%',
                      borderStyle: 'none',
                      borderWidth: '1px',
                      borderColor: 'ligthGrey',
                      backgroundImage: destCountryFlag,
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center'

                    }}>
                  </div>
                </Box>
              </Stack>
              <Box flex={1}
                sx={{ width: '100%', textAlign: 'center' }}>
                {flight.dest_country_airport_abbr}
              </Box>
            </Stack>
          </Box>
          <Box flex={1.5} height={'100%'} m={0} p={0} sx={{ borderLeft: '2px solid #15291b' }}>
            <FlightStatus statusId={flight.status} flight={flight} />
          </Box>
        </Stack>
      </Box>
    </ListItemButton>
  )
}

export default FlightResultItem
