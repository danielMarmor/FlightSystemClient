import React from 'react'
import FlightResultHeader from '../flightResultHeader/FlightResultHeader';
import FlightResultItem from '../fligthResultItem/FlightResultItem'
import { Box, Stack } from '@mui/material';

const FlightResultDay = (props) => {
  const { dateGroup, itemHeight, headerHeight } = props;
  const { date, dateFlights } = dateGroup;
  return (

    <Stack direction={'column'}
      justifyContent={'flex-start'}
      alignItems={'center'}
      spacing={0}
      sx={{
        width: '100%',
        margin: '0px',
        padding: '0px',
        boxSizing:'border-box'

      }}
    >
      <FlightResultHeader date={date} height={headerHeight} />
      {dateFlights.map(flight => {
        return <FlightResultItem key={flight.flight_id} flight={flight} height={itemHeight} />
      })}
      <Box width={'100%'} height={'5px'}></Box>
    </Stack>

  )
}

export default FlightResultDay
