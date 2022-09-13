import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../../../app/components/TabPanel';
import CustomerSignUp from './CustomerSignUp';
import AirlineSignUp from './AirlineSignUp';
import { FormFrameBox, FormBox } from '../../../../app/components/FormStyles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AirlinesIcon from '@mui/icons-material/Airlines';
import { useState } from 'react';
import PropTypes from 'prop-types';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};


const SignUp = ({countries}) => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <FormFrameBox sx={{
            width: '70%',
            height: '92%',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <FormBox>
                <Tabs id='tabs' value={value} onChange={handleChange}
                    textColor="white"
                    indicatorColor="white"
                    sx={{ backgroundColor: '#15291b' }}>
                    <Tab sx={{
                        width: '50%',
                        color: 'white',
                        paddingLeft: '0rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                        label={<div style={{
                            paddingLeft: '1rem',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            textDecoration: value === 0 ? 'underline' : 'none'
                        }}><PeopleAltIcon /> CUSTOMERS </div>}
                    />
                    <Tab sx={{
                        width: '50%',
                        color: 'white',
                        paddingLeft: '0rem',
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start'
                    }}
                        label={<div style={{
                            paddingLeft: '1.4rem',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            textDecoration: value === 1 ? 'underline' : 'none'
                        }}><AirlinesIcon /> AIRLINES </div>}
                    />
                </Tabs>
                <TabPanel id='TabPanel1' value={value} index={0}>
                    {/* CUSTOMERS */}
                    <CustomerSignUp />
                </TabPanel>
                <TabPanel id='TabPanel2' value={value} index={1}>
                    {/* AIRLINES */}
                    <AirlineSignUp countries={countries}/>
                </TabPanel>
            </FormBox>
        </FormFrameBox>
    )
}

export default SignUp
