import React from 'react';
import { CenterBox, SubHeaderTypography } from './FormStyles';

const primaryColor = '#15291b';

const NoResults = ({ message }) => {
    return (
        <CenterBox>
            <SubHeaderTypography sx={{color : primaryColor, fontWeight : 'bold'}}>
             {message}
            </SubHeaderTypography>
        </CenterBox>
    )

}

export default NoResults
