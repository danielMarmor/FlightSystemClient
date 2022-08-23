import React from 'react'
import { FormBox } from '../FormStyles'
import { Box } from '@mui/material'
import Stack from '@mui/material/Stack'

const SearchLine = (props) => {
    const { panelItmes } = props.searchPanel;
    const height = props.height;
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            backgroundColor: '#f5c242',
            height: height,
            padding: '0',
            margin: '0',
            border: '2px solid #15291b'
        }}
        >
            <Stack spacing={0} padding={'5px'}
                direction='row'
                alignItems='center'
                justifyContent='space-between'
            >
                {panelItmes.map(item => item)}
            </Stack>
        </div>
    )
}

export default SearchLine
