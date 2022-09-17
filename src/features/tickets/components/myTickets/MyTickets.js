import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SelectMyTickets, removeTicket } from '../../ticketsSlice';
import {
    FormFrameBox,
    VerticalStack,
    HorizonStack,
    SubHeaderTypography,
    FormButton,
    CenterBox,
    FormFrameBoxPadding
} from '../../../../app/components/FormStyles'
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { endpoints } from '../../../../constants/configuration';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { TicketsErrorTemplate, TicketsSuccesTemplate } from '../../../../constants/enums';
import { numberWithCommas } from '../../../../utilities/strings';
import NoResults from '../../../../app/components/NoResults';
import { getWindowSize, layoutVerticalMarginVh, appBarHeight } from '../../../../app/components/layout/layout';
import { mainSurfaceTopPadding } from '../../../../App';
import moment from 'moment';

const primaryColor = '#15291b';
const headingHeight = 40;
const headingMarginBottom = 5;
const searchLineHeight = 40;
const gridTopMargin = 10;

const MyTickets = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const tickets = useSelector(SelectMyTickets);
    const countTickets = tickets.length;

    const sumAmountTickets = tickets.reduce((a, b) => { return a + parseFloat(b.price) }, 0).toFixed(2);

    const getCountryImageUrl = (name) => {
        const countryFlagUrl = (`url(${endpoints.countriesFlags}${name})`).replace(' ', '%20');
        return countryFlagUrl;
    }

    const handleAddNew = () => {
        try {
            navigate('/Flights');
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleCancelTicket = async (ticketId) => {
        try {
            const response = await dispatch(removeTicket(ticketId)).unwrap();
            const susccesMessage = 'Order succesfuly canceled. You will not be charged';
            dispatch(showSuccessMessage(TicketsSuccesTemplate(susccesMessage)));
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(TicketsErrorTemplate(err.message)));
    }

    const getGridHeight=()=>{
        const windowHeight = getWindowSize().innerHeight;
        const gridCalclatedHeight = windowHeight
            - ((2 * layoutVerticalMarginVh) / 100 * windowHeight)
            - appBarHeight
            - mainSurfaceTopPadding
            - (2 * FormFrameBoxPadding)
            - headingHeight
            - headingMarginBottom
            - searchLineHeight
            - gridTopMargin;
            // - securitySize;
        const gridHeight = Math.round(gridCalclatedHeight);
        return gridHeight;
    }

    const columns = [
        {
            field: 'flightNumber',
            headerName: 'Flight',
            flex: 0.75,
            headerAlign: 'center',
            align: 'center',
            headerClassName: 'dataGridHeader',
            cellClassName: 'dg-alignCenter',
            valueGetter: (params) => {
                return `${params.row.airline_iata}-${params.row.flight_id}`
            }
        },
        {
            field: 'airline_company_name',
            headerName: 'Airline',
            flex: 1.5,
            headerAlign: 'left',
            headerClassName: 'dataGridHeader',
            align: 'left',
            cellClassName: 'dg-alignCenter',
        },
        {
            field: 'origin_country_name',
            headerName: 'From',
            flex: 0.5,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
            renderCell: (params) => (
                <div style={{
                    backgroundImage: getCountryImageUrl(params.row.origin_country_name),
                    backgroundSize: 'cover',
                    width: '2.1rem',
                    height: '1.4rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </div>
            )
        },
        {
            field: 'departure_time',
            headerName: 'Departure Time',
            flex: 1.5,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
        },
        {
            field: 'destination_country_name',
            headerName: 'To',
            flex: 0.5,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
            renderCell: (params) => (
                <div style={{
                    backgroundImage: getCountryImageUrl(params.row.destination_country_name),
                    backgroundSize: 'cover',
                    width: '2.1rem',
                    height: '1.4rem',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center'
                }}>
                </div>
            )
        },
        {
            field: 'landing_time',
            headerName: 'Landing Time',
            flex: 1.5,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
        },
        {
            field: 'price',
            headerName: 'Price ($)',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
        },
        {
            field: 'cancel',
            headerName: 'Cancel',
            flex: 1,
            headerAlign: 'center',
            headerClassName: 'dataGridHeader',
            align: 'center',
            cellClassName: 'dg-alignCenter',
            renderCell: (params) => {
                const departureTime = moment(params.row.departure_time, 'DD/MM/YYYY HH:mm:SS');
                const isDisabled = departureTime <= moment();
                return (<FormButton
                    // disabled={isDisabled}
                    onClick={() => handleCancelTicket(params.row.ticket_id)}
                    sx={{
                        height: '20px',
                        fontSize: '12px !important',
                        backgroundColor: `${primaryColor} !important`,
                        color: 'white'
                    }}>
                    Cancel
                </FormButton>);
            }
        }
    ];
    let renderTickets;
    if (countTickets === 0) {
        renderTickets = <CenterBox
            width={'100%'}
            sx={{ padding: '0px'}}>
            <NoResults message={'Your tickets list is empty. Purchase tickets!'} />
        </CenterBox >;
    }
    else {
        renderTickets = (
            <div style={{ height: getGridHeight(), width: '100%', overflow: 'auto', marginTop: gridTopMargin }}>
                <DataGrid
                    rows={tickets}
                    columns={columns}
                    pageSize={12}
                    rowHeight={36}
                    hideFooter
                    sx={{
                        padding: '0px !important',
                        margin: '0px !important',
                        borderTop: '0px solid #15291b',
                        borderRadius: 0,
                        '& .MuiDataGrid-columnHeaders': {
                            height: '36px !important',
                            minHeight: '36px !important',
                            maxHeight: '36px !important',
                            lineHeight: '36px !important'
                        },
                        '& .MuiDataGrid-columnHeaderTitle': {
                            fontWeight: 'bold'
                        }
                    }}

                />
            </div>
        )
    }
    return (
        <FormFrameBox sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
            <VerticalStack>
                {/* HEADER */}
                <HorizonStack height={`${headingHeight}px`}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: primaryColor,
                        paddingLeft: '10px',
                        marginBottom: `${headingMarginBottom}px`
                    }}>
                    <SubHeaderTypography flex={0.3} sx={{ textAlign: 'left' }}>
                        Purchases
                    </SubHeaderTypography>
                    <SubHeaderTypography flex={0.6} sx={{ textAlign: 'left' }}>
                        <IconButton onClick={() => handleAddNew()}>
                            <AddIcon sx={{ color: 'white' }} />
                        </IconButton>
                    </SubHeaderTypography>
                    <SubHeaderTypography flex={1} sx={{ textAlign: 'left' }}>
                        {`Total Count : ${countTickets} tickets`}
                    </SubHeaderTypography>
                    <SubHeaderTypography flex={1} sx={{ textAlign: 'left' }}>
                        {`Total Amount : ${numberWithCommas(sumAmountTickets)} $`}
                    </SubHeaderTypography>
                </HorizonStack>
                {/* CONTENT */}
                <VerticalStack flex={1}
                    sx={{
                        border: `4px solid ${primaryColor}`
                    }}
                >
                    {renderTickets}
                </VerticalStack>
            </VerticalStack>
        </FormFrameBox >
    )
}

export default MyTickets
