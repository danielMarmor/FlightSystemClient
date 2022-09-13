import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '../../../../app/components/TabPanel';
import PropTypes from 'prop-types';
import { FormFrameBox, FormBox } from '../../../../app/components/FormStyles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AirlinesIcon from '@mui/icons-material/Airlines';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useState } from 'react';
import Customers from './Customers';
import Airlines from './Airlines';
import { useDispatch, useSelector } from 'react-redux';
import Administrators from './Administrators';
import { catchAppError } from '../../../../app/appSlice'
import { ProfileErrorTemplate, userType } from '../../../../constants/enums'
import { SelectMyUsersType, myUsersTypeChanged } from '../../manageSlice';

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const MyUsers = ({ countries }) => {
    const dispatch = useDispatch();
    const myUsersTypeId = useSelector(SelectMyUsersType);
    const selectedTabId = (myUsersTypeId === userType.anonym ? userType.customer : myUsersTypeId) - 1;
    const [value, setValue] = useState(selectedTabId);
    const handleChange = (event, newValue) => {
        try {
            setValue(newValue);
            dispatch(myUsersTypeChanged(newValue + 1));
        }
        catch (err) {
            handleError(err);
        }
    };

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
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
                    sx={{ backgroundColor: '#15291b', marginBottom: '10px'}}>
                    <Tab  {...a11yProps(0)}
                        sx={{
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
                            alignItems: 'center',
                            textDecoration: value === 0 ? 'underline' : 'none'
                        }}><PeopleAltIcon /> CUSTOMERS </div>}
                    />
                    <Tab  {...a11yProps(1)}
                        sx={{
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
                            alignItems: 'center',
                            textDecoration: value === 1 ? 'underline' : 'none'
                        }}><AirlinesIcon /> AIRLINES </div>}
                    />
                    <Tab  {...a11yProps(2)}
                        sx={{
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
                            alignItems: 'center',
                            textDecoration: value === 2 ? 'underline' : 'none'
                        }}><AdminPanelSettingsIcon /> Administrators </div>}
                    />
                </Tabs>
                <TabPanel id='TabCustomers' value={value} index={0}>
                    {/* CUSTOMERS */}
                    <Customers />
                </TabPanel>
                <TabPanel id='TabAirlines' value={value} index={1}>
                    {/* AIRLINES */}
                    <Airlines countries={countries} />
                </TabPanel>
                <TabPanel id='TabAdmins' value={value} index={2}>
                    {/* ADMINISTRATORS */}
                    <Administrators />
                </TabPanel>
            </FormBox>
        </FormFrameBox>
    )
}

export default MyUsers
