import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectGreetingName } from '../../features/profiles/profilesSlice'
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeNightIcon from '@mui/icons-material/ModeNight';
import moment from 'moment';
import { CenterBox, HorizonStack, SubHeaderTypography } from './FormStyles';
import './layout/layout.css';

const Greeting = () => {
    const userName = useSelector(SelectGreetingName);
    const [isShow, setIsShow] = useState(false);

    const getTimeIcon = (hour) => {
        if (!isShow) {
            return null;
        }
        //MESSAGE
        if (hour >= 6 && hour < 18) {
            return <LightModeIcon sx={{ color: 'yellow', fontSize: '32px' }} />
        }
        else {
            return <ModeNightIcon sx={{ color: 'white', fontSize: '32px' }} />
        }
    }
    const getGreeting = (hour) => {
        if (!isShow) {
            return '';
        }
        //MESSAGE
        if (hour >= 6 && hour < 14) {
            return 'Good Morging';
        }
        else if (hour >= 14 && hour < 18) {
            return 'Good Afternoon';
        }
        else if (hour >= 18 && hour > 23) {
            return 'Good Evening';
        }
        else {
            return 'Good Night';
        }
    }
    const currentHour = moment().hour();
    const greetingText = `${getGreeting(currentHour)}, ${userName}`;
    const timeIcon = getTimeIcon(currentHour);

    const greet =()=> {
        const promise = new Promise((resolve, rejected) => {
            setTimeout(
                () => {
                    setIsShow(true);
                    resolve();
                }, 1500
            )
        });
        return promise;
    }
    
    const showGreeting =async()=>{
        await greet();
        setTimeout(
            () => setIsShow(false), 7000
        )
    }

    useEffect(() => {
        if (!userName) {
            return;
        }
        showGreeting()

    }, [userName])

    //WITH GREETING USER NAME



    return (
        <HorizonStack justifyContent={'flex-end'} sx={{ display: isShow ? 'flex' : 'none' }}>
            <SubHeaderTypography>
                {greetingText}
            </SubHeaderTypography>
            {timeIcon}
        </HorizonStack>
    )
}

export default Greeting
