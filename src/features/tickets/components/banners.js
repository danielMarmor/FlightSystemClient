import React from 'react'
import { Stack, Box } from '@mui/material';
import bannerFlights7 from '../../../assets/bannerFlights7.png'
import bannerFlights8 from '../../../assets/bannerFlights8.jpg'
import bannerFlights3 from '../../../assets/bannerFlights3.jpg'
import bannerFlights4 from '../../../assets/bannerFlights4.jpg'
import bannerFlights1 from '../../../assets/bannerFlights1.jpg'
import bannerFlights6 from '../../../assets/bannerFlights6.jpg'

const Banners = () => {
    return (
        <Stack direction={'row'}
            width={'100%'}
            height={'100%'}
            justifyContent={'space-between'}
            alignItems={'center'}
            spacing={0}
            sx={{margin: 0, padding: 0}}
        >
             <Box key={'banner1'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights3})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                    
                }}>
            </Box>
            <Box key={'banner3'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights8})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                }}>
            </Box>
            <Box key={'banner4'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights4})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                }}>
            </Box>
            <Box key={'banner2'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights7})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                }}>
            </Box>
            <Box key={'banner5'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights1})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                }}>
            </Box>
            <Box key={'banner6'} flex={1} height={'100%'}
                sx={{
                    backgroundImage: `url(${bannerFlights6})`,
                    backgroundSize: 'cover',
                    // width: '162px',
                    // height: '130px',
                    backgroundRepeat: 'no-repeat'
                }}>
            </Box>
            

        </Stack>
    )
}

export default Banners
