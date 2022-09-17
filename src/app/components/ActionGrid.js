import React from 'react'
import { Box, Stack } from '@mui/material'

const ActionGrid = ({ formCtrls, formActions, config }) => {
    const { proportions, grdDimentions, gaps, padding } = config;
    const { relGrid, relActions } = proportions;
    const { horiz, vert } = grdDimentions;
    const { rowGap, colGap } = gaps;
    return (
        <Stack direction="column"
            flex={6}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            width={'100%'}
            height={'100%'}
            sx={{
                paddingLeft: `${padding.left}px`,
                paddingRight: `${padding.right}px`
            }}
            m={0}
        >
            <Box flex={relGrid}
                width={'100%'}
                display={'grid'}
                gridTemplateColumns={`repeat(${horiz}, 1fr)`}
                gridTemplateRows={`repeat(${vert}, 1fr)`}
                alignContent={'space-between'}
                sx={{
                    rowGap: `${rowGap}px`,
                    columnGap: `${colGap}px`,
                    paddingTop: `${padding.top}px`,
                    paddingBottom: `${padding.bottom}px`
                }}
            >
                {formCtrls.map(ctrl => ctrl)}
            </Box>
            <Stack flex={relActions}
                direction={'row'}
                display={'flex'}
                justifyContent={'flex-start'}
                alignItems={'flex-end'}
                height={'100%'}
                width={'100%'}
                p={0} m={0}
                spacing={`${colGap}px`}>
                {formActions.map(action => action)}
            </Stack>
        </Stack>
    )
}

export default ActionGrid
