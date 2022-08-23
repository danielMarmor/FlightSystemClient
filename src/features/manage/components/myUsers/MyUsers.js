import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../../../app/components/TabPanel';
import PropTypes from 'prop-types';
import { FormFrameBox, FormBox } from '../../../../app/components/FormStyles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AirlinesIcon from '@mui/icons-material/Airlines';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useState} from 'react';
import Customers from './Customers';
import Airlines from './Airlines';
import Administrators from './Administrators';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const MyUsers = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <FormFrameBox sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-between'
        }}>
            <FormBox>
                <Tabs id='tabs' value={value} onChange={handleChange}
                    textColor="white"
                    indicatorColor="white"
                    sx={{ backgroundColor: '#15291b', marginBottom : '10px' }}>
                    <Tab sx={{
                        width: '33.4%',
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
                            alignItems: 'center'
                        }}><PeopleAltIcon /> CUSTOMERS </div>}
                    />
                    <Tab sx={{
                        width: '33.3%',
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
                            alignItems: 'center'
                        }}><AirlinesIcon /> AIRLINES </div>}
                    />
                    <Tab sx={{
                        width: '33.3%',
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
                            alignItems: 'center'
                        }}><AdminPanelSettingsIcon /> Administrators </div>}
                    />
                </Tabs>
                <TabPanel id='TabCustomers' value={value} index={0}>
                    {/* CUSTOMERS */}
                   <Customers/>
                </TabPanel>
                <TabPanel id='TabAirlines' value={value} index={1}>
                    {/* AIRLINES */}  
                    <Airlines/>            
                </TabPanel>
                <TabPanel id='TabAdmins' value={value} index={2}>
                    {/* ADMINISTRATORS */}  
                    <Administrators/>             
                </TabPanel>
            </FormBox>
        </FormFrameBox>
    )
}

export default MyUsers
