import React from 'react'
import { useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers';
import { AutoCompleteBox } from '../../../../app/components/FormStyles'
import FlagIcon from '@mui/icons-material/Flag';
import InputAdornment from '@mui/material/InputAdornment';
import { getAlCountries } from '../../../../api/cache'
import { CompareByCountryName } from '../../../../utilities/compare'
import { useQuery } from 'react-query';
import { Box, TextField, Stack } from '@mui/material';
import { FormButton, FormFrameBox } from '../../../../app/components/FormStyles';
import { numbers } from '../../../../constants/configuration';
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { useDispatch, useSelector } from 'react-redux';
import { SelectFlights, SelectFlightsToShow, flitersChanged } from '../../fligthSlice';
import { DataGrid } from '@mui/x-data-grid';
import { FlightModel } from '../../models/flightModel';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PageviewIcon from '@mui/icons-material/Pageview';
import { endpoints } from '../../../../constants/configuration';
import { useNavigate, NavLink } from 'react-router-dom';
import { removeFlight } from '../../fligthSlice';
import { textAlign } from '@mui/system';

const searchInputsHeight = 24;

const FlightsSearch = () => {
    const countries = useQuery('countries', getAlCountries).data;
    const [filters, setFilters] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleCountryChange = (type, value) => {
        const newFilters = {
            ...filters,
            [`${type}Country`]: value
        }
        setFilters(newFilters);
    }

    const handleDateChange = (type, value) => {
        setFilters({
            ...filters,
            [`${type}Date`]: value
        });
    }

    const handleSearch = () => {
        dispatch(flitersChanged(filters));
    }

    const handleAddNew = () => {
        navigate('/NewFlight?mode=insert')
    }

    useEffect(()=>{
        dispatch(flitersChanged({}));
    }, []);

    return ([
        //SEARCH LINE
        <Box sx={{ flex: 1 }}>
            <AutoCompleteBox
                freeSolo
                id="fromCountry"
                name="fromCountry"
                height={24}
                value={filters.fromCountry || ''}
                onChange={(event, name) => {
                    handleCountryChange('from', name)
                    
                }}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ input: { textAlign: "center" }, width: '90%' }}
                        {...params}
                        placeholder={'From'}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            style: { textAlign: "center" },
                            min: 0,
                            style: {
                                height: searchInputsHeight,
                                textAlign: 'center',
                                boxSizing: 'border-box',
                                borderRadius: '0px !important',
                                border: '1px solid #15291b',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            },
                            startAdornment: <InputAdornment position="start">
                                <FlagIcon sx={{ color: '#15291b' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <div style={{
                                    backgroundImage: filters.toCountryImageUrl || '',
                                    backgroundSize: 'cover',
                                    width: '2.1rem',
                                    height: '1.4rem',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                </div>
                            </InputAdornment>
                        }}
                        onChange={
                            (e) => handleCountryChange('from', e.target.value)
                        }
                    />
                )}
            />
        </Box>,
        <Box sx={{ flex: 1 }}>
            <DatePicker
                value={filters.fromDate || ''}
                inputFormat="DD/MM/YYYY"
                width={'90%'}
                sx={{ backgroundColor: 'white', border: '1px soiid black' }}
                onChange={(newValue) => {
                    handleDateChange('from', newValue);
                }}
                InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
                renderInput={(params) =>
                    <TextField fontSize={'0.9rem'}
                        placeholder={"DD/MM/YYYY"}
                        sx={{
                            backgroundColor: 'white',
                            margin: 'auto',
                            width: '90%',
                            height: searchInputsHeight,
                            border: '1px solid black',
                            textAlign: 'center',
                            '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                                borderBottom: 'none'

                            }
                        }}
                        size="small"
                        variant='standard'
                        {...params} />
                }
            />
        </Box>,
        <Box sx={{ flex: 1 }}>
            <AutoCompleteBox
                freeSolo
                id="toCountry"
                name="toCountry"
                value={filters.toCountry || ''}
                onChange={(event, name) => {
                    handleCountryChange('to', name)
                }}
                width={'90%'}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ input: { textAlign: "center" }, width: '90%' }}
                        {...params}
                        placeholder={'To'}
                        variant="standard"
                        InputProps={{
                            ...params.InputProps,
                            style: { textAlign: "center" },
                            min: 0,
                            style: {
                                height: searchInputsHeight,
                                textAlign: 'center',
                                boxSizing: 'border-box',
                                borderRadius: '0px !important',
                                border: '1px solid #15291b',
                                fontSize: '1rem',
                                backgroundColor: 'white'
                            },
                            startAdornment: <InputAdornment position="start">
                                <FlagIcon sx={{ color: '#15291b' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <div style={{
                                    backgroundImage: filters.toCountryImageUrl || '',
                                    backgroundSize: 'cover',
                                    width: '2.1rem',
                                    height: '1.4rem',
                                    backgroundRepeat: 'no-repeat'
                                }}>
                                </div>
                            </InputAdornment>
                        }}
                        onChange={
                            (e) => handleCountryChange('to', e.target.value)
                        }
                    />
                )}
            />
        </Box>,
        <Box sx={{ flex: 1 }}>
            <DatePicker
                value={filters.toDate || ''}
                inputFormat="DD/MM/YYYY"
                onChange={(newValue) => {
                    handleDateChange('to', newValue);
                }}
                InputAdornmentProps={{ position: 'start', color: '#15291b', marginBottom: '2px' }}
                renderInput={(params) =>
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            placeholder: "DD/MM/YYYY",
                            style: { textAlign: "center" }
                        }}
                        sx={{
                            backgroundColor: 'white',
                            margin: 'auto',
                            width: '90%',
                            height: searchInputsHeight,
                            border: '1px solid black',
                            '.css-o6n57-MuiInputBase-root-MuiInput-root.Mui-error:after': {
                                borderBottom: 'none'

                            }
                        }}
                        size="small"
                        variant="standard"
                        {...params} />
                }
            />
        </Box>,
        <Box sx={{ flex: 0.5 }}>
            <FormButton variant="contained"
                onClick={() => handleAddNew()}
                sx={{
                    height: searchInputsHeight + 2,
                    width: searchInputsHeight + 2,
                    fontSize: '2rem'
                }}

            >+
            </FormButton>
        </Box>,
        <Box sx={{ flex: 0.5 }}>
            <FormButton variant="contained"
                onClick={() => handleSearch()}
                sx={{
                    height: searchInputsHeight + 2,
                    width: '120px'
                }}>Search
            </FormButton>
        </Box>
    ]);
}


const MyFlights = () => {
    console.count('render MyFlights');
    const countries = useQuery('countries', getAlCountries).data;
    const myFlights = useSelector(SelectFlightsToShow);
    const dispatch = useDispatch();

    const getCountryImageUrl = (name) => {
        const countryFlagUrl = `url(${endpoints.countriesFlags}${name})`;
        return countryFlagUrl;
    }

    const handleDelete = async (flightId) => {
        await dispatch(removeFlight(flightId));
    }

    const searchPanel = {
        panelItmes: [
            <FlightsSearch />
        ],
        height: '40px'
    }

    let renderMyFlights;
    if (!myFlights || myFlights.length == 0) {
        renderMyFlights = <div></div>;
    }
    else {
        const rows = FlightModel.getFlightsToGrid(myFlights);
        const columns = [
            {
                field: 'flightNumber',
                headerName: 'No.',
                flex: 0.75,
                headerAlign: 'center',
                align: 'center',
                headerClassName: 'dataGridHeader',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <NavLink to={'/Admin/Profile'}
                        style={{ textDecoration: 'none' }}>
                        {params.row.flightNumber}
                    </NavLink>
                )
            },
            {
                field: 'datesRange',
                headerName: 'Dates',
                flex: 1.2,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'origin_country_name',
                headerName: 'Origin',
                flex: 0.75,
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
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                )
            },
            {
                field: 'dest_country_name',
                headerName: 'Dest',
                flex: 0.75,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <div style={{
                        backgroundImage: getCountryImageUrl(params.row.dest_country_name),
                        backgroundSize: 'cover',
                        width: '2.1rem',
                        height: '1.4rem',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </div>
                )
            },
            {
                field: 'soldTickets',
                headerName: 'Tickets Sold',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
            },
            {
                field: 'occupance',
                headerName: 'Occup %',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',

            },
            {
                field: 'revenue',
                headerName: 'Revenue',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'cost',
                headerName: 'Cost',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'profit',
                headerName: 'Profit',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'edit',
                headerName: '',
                flex: 0.1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <IconButton>
                        <NavLink to={`/NewFlight?mode=edit&id=${params.row.id}`} >
                            <EditIcon sx={{ color: '#15291b' }} />
                        </NavLink>
                    </IconButton>
                )
            },
            {
                field: 'delete',
                headerName: '',
                flex: 0.1,
                headerClassName: 'dataGridHeader',
                headerAlign: 'center',
                align: 'center',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <IconButton
                        onClick={() => handleDelete(params.row.id)}
                        sx={{ color: '#15291b' }}>
                        <DeleteIcon />
                    </IconButton>
                )
            }
        ]

        renderMyFlights = (
            <div style={{ height: 485, width: '100%', overflow: 'auto', marginTop: 10 }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={12}
                    rowHeight={36}
                    hideFooter 
                    sx={{
                        padding: '0px !important',
                        margin: '0px !important',
                        border: '2px solid #15291b',
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
            justifyContent: 'space-between'
        }}>
            <Stack direction="column"
                justifyContent={'flex-start'}
                alignItems={'center'}
                width={'100%'}
            >
                <SearchLine searchPanel={searchPanel} height={'40px'} />
                {renderMyFlights}
            </Stack>
        </FormFrameBox>
    )
}

export default MyFlights
