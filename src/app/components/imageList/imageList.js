import React from 'react'
import Stack  from '@mui/material/Stack';
import coloseum from '../../../assets/coloseum.jpg';
import italy2 from '../../../assets/italy2.jpg';
import pariz from '../../../assets/pariz.jpg';
import flights4 from '../../../assets/flights4.jpg';

const ImageList = () => {
    return (
        <Stack direction='column'
         justifyContent={'space-around'}
         alignItems={'center'}
         width={'100%'}
         height={'100%'}>
            <div style={{
                backgroundImage: `url(${coloseum})`,
                backgroundSize: 'cover',
                width: '162px',
                height: '130px',
                backgroundRepeat: 'no-repeat'
            }}></div>
             <div style={{
                backgroundImage: `url(${italy2})`,
                backgroundSize: 'cover',
                width: '162px',
                height: '130px',
                backgroundRepeat: 'no-repeat'
            }}></div>
             <div style={{
                backgroundImage: `url(${pariz})`,
                backgroundSize: 'cover',
                width: '162px',
                height: '130px',
                backgroundRepeat: 'no-repeat'
            }}></div>
             <div style={{
                backgroundImage: `url(${flights4})`,
                backgroundSize: 'cover',
                width: '162px',
                height: '130px',
                backgroundRepeat: 'no-repeat'
            }}></div>
    </Stack>
  )
}

export default ImageList
