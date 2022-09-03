import React from 'react'
import { Box } from '@mui/system';

const FlightResultHeader = (props) => {
    const { date, height } = props;
    return (
        <Box 
            spacing={0}
            height={height}
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}
            sx={{
                backgroundColor: '#15291b',
                color: 'white',
                fontSize :'0.9rem',
                fontWeight : 'bold',
                textAlign: 'center',
                width: '100%',
                margin : '0px',
                padding :'0px'
            }}
        >{date}</Box>
    )
}

export default FlightResultHeader
