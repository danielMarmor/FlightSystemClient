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
import { useDispatch , useSelector} from 'react-redux';
import { SelectFlights } from '../../fligthSlice';
import { DataGrid } from '@mui/x-data-grid';
import { FlightModel } from '../../models/flightModel';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import PageviewIcon from '@mui/icons-material/Pageview';

const searchInputsHeight = 24;

const FlightsSearch = () => {
    const countries = useQuery('countries', getAlCountries).data;
    const [filters, setFilters] = useState({});

    const handleCountryChange = (type, value) => {
        let newCountryId, newCountryName;
        const countryByName = countries.find(cou => cou.name === value);
        if (!countryByName) {
            newCountryId = numbers.noSelectedValue;
            newCountryName = numbers.empty;
        }
        else {
            newCountryId = countryByName.id;
            newCountryName = countryByName.name;
        }
        const newFilters = {
            ...filters,
            [`${type}_country_id`]: newCountryId,
            [`${type}_country_name`]: newCountryName
        }
        setFilters(newFilters);
    }

    const handleDateChange = (type, value) => {
        setFilters({
            ...filters,
            [`${type}_date`]: value
        });
    }

    const handleSearch = () => {
       
    }

    return ([
        //SEARCH LINE
        <Box sx={{ flex: 1 }}>
            <AutoCompleteBox
                freeSolo
                id="fromCountry"
                name="fromCountry"
                value={filters.from_country_name || ''}
                onChange={(event, name) => {
                    handleCountryChange('from', name)
                }}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ width: '100%' }}
                        {...params}
                        placeholder={'From Origin'}
                        variant="outlined"
                        InputProps={{
                            style: {
                                height: 24,
                                boxSizing: 'border-box',
                                borderRadius: '0px !important',
                                border: '1px solid #15291b',
                                fontSize: '0.9rem',
                                backgroundColor: 'white'
                            },
                            startAdornment: <InputAdornment position="start">
                                <FlagIcon sx={{ color: '#15291b' }} />
                            </InputAdornment>,
                            endAdornment: <InputAdornment position="end">
                                <div style={{
                                    backgroundImage: filters.fromCountryImageUrl || '',
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
                value={filters.from_date || ''}
                inputFormat="DD/MM/yyyy"
                width={'90%'}            
                onChange={(newValue) => {
                    handleDateChange('from', newValue);
                }}
                renderInput={(params) =>
                    <TextField
                        size="small"
                        backgroundColor={'white'}
                        width={'90%'}
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
                value={filters.to_country_name || ''}
                onChange={(event, name) => {
                    handleCountryChange('to', name)
                }}
                disableClearable
                options={countries.map((option) => option.name).sort(CompareByCountryName)}
                renderInput={(params) => (
                    <TextField
                        size="small"
                        sx={{ width: '100%' }}
                        {...params}
                        placeholder={'To Destination'}
                        variant="outlined"
                        InputProps={{
                            style: {
                                height: searchInputsHeight,
                                boxSizing: 'border-box',
                                borderRadius: '0px !important',
                                border: '1px solid #15291b',
                                fontSize: '0.9rem',
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
                value={filters.to_date || ''}
                inputFormat="DD/MM/yyyy"
                onChange={(newValue) => {
                    handleDateChange('to', newValue);
                }}
                renderInput={(params) =>
                    <TextField
                        height={searchInputsHeight}
                        backgroundColor={'white'}
                        size="small"
                        variant='standard'
                        {...params} />
                }
            />
        </Box>,
        <Box sx={{ flex: 0.5 }}>
        <FormButton variant="contained"
            onClick={() => handleSearch()}
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

    const myFlights = useSelector(SelectFlights);

    const searchPanel = {
        panelItmes: [
            <FlightsSearch/>
        ],
        height: '40px'
    }

    let renderMyFlights;
    if (!myFlights || myFlights.length == 0){
        renderMyFlights = <div></div>;
    }
    else{
        const rows = FlightModel.getFlightsToGrid(myFlights);
        const columns = [
            {
                field: 'show',
                headerName: 'Open',
                flex: 0.5,
                headerAlign: 'center',
                align: 'center',
                headerClassName: 'dataGridHeader',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <IconButton sx={{ color: '#15291b' }}>
                       <PageviewIcon/>
                    </IconButton>
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
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
            },
            {
                field: 'dest_country_name',
                headerName: 'Dest',
                flex: 1,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
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
                flex: 0.5,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <IconButton sx={{ color: '#15291b' }}>
                        <EditIcon />
                    </IconButton>
                )
            },
            {
                field: 'delete',
                headerName: '',
                flex: 0.5,
                headerClassName: 'dataGridHeader',
                headerAlign: 'center',
                align: 'center',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <IconButton sx={{ color: '#15291b' }}>
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
                    sx={{
                        padding: '0px !important',
                        margin: '0px !important',
                        border: '2px solid #15291b',
                        borderRadius : 0,
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
            >
                <SearchLine searchPanel={searchPanel} height={'40px'} />
                {renderMyFlights}
            </Stack>
        </FormFrameBox>
    )
}

export default MyFlights
