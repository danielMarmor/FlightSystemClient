import React from 'react'
import { useState, useEffect } from 'react'
import FlightsSearchDialog from '../../features/tickets/components/flightsSearchDialog/FlightsSearchDialog'
import { CenterBox } from './FormStyles'
import { useNavigate } from 'react-router-dom'

const Facade = ({ countries }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const openDialog = () => {
        setIsOpen(true);
    }
    const handleSearch = () => {
        handleClose();
        setTimeout(navigate('/Flights'), 500);
    }
    const handleClose = () => {
        setIsOpen(false);
    }
    useEffect(() => {
        const myTimeout = setTimeout(openDialog, 2500);
    }, [])

    return (
        <CenterBox>
            <FlightsSearchDialog
                open={isOpen}
                handleSearch={handleSearch}
                handleClose={handleClose}
                countries={countries} />
        </CenterBox>
    )
}

export default Facade
