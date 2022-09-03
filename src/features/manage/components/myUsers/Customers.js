import React from 'react'
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { FormButton, ColumnFlexBox } from '../../../../app/components/FormStyles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography';
import { OutlinedInput } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import InputAdornment from '@mui/material/InputAdornment';
import CustomerListItem from '../CustomerListItem';
import List from '@mui/material/List';
import { GetCustomersBussiness, SortCustomerBusinnes } from '../../../../models/customersBusiness';
import { sortByField, directions } from '../../../../constants/enums';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const inputHeights = '24px';

const initFilters = {
    search: '',
    active: true,
    sortBy: sortByField.purchases,
    direction: directions.descending
}

const CustomerSearch = ({ fetchCustomers }) => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initFilters);
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        })
    };
    const handleCheckedChanged = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.checked
        })
    }
    const handleValueToggled = (name) => {
        const newDirection = filters[name] == directions.ascending ? directions.descending : directions.ascending;
        const newFilters = {
            ...filters,
            [name]: newDirection
        }
        fetchCustomers(newFilters);
        setFilters(newFilters);
    }

    const handleSearch = () => {
        fetchCustomers(filters);
    }
    
    const handleAddNew = () => {
        navigate(`/Profile/Customer/Insert/999`)
    }
    //SEARCH LINE
    return [<Box sx={{ minWidth: 200 }}>
        <TextField size='small'
            name='search'
            value={filters.search}
            onChange={handleChange}
            sx={{
                borderRadius: '0px !important'
            }}
            InputProps={{
                style: {
                    height: inputHeights,
                    boxSizing: 'border-box',
                    borderRadius: '0px !important',
                    border: '1px solid #15291b',
                    fontSize: '0.9rem',
                    backgroundColor: 'white'
                },
                startAdornment: <InputAdornment position="start">
                    <SearchIcon sx={{ color: '#15291b' }} />
                </InputAdornment>
            }}
        />
    </Box >,
    //ONLY ACTIVE
    <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
            <FormControlLabel
                control={<Checkbox
                    name='active'
                    checked={filters.active}
                    onChange={handleCheckedChanged}
                    sx={{ color: '#15291b' }}
                />}
                label={
                    <Typography variant="body2" color="#15291b">
                        Only Active Customers
                    </Typography>}
            />
        </FormControl>
    </Box>,
    //SORT BY SELECTION
    <Box sx={{
        minWidth: 160,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }}>
        <FormControl fullWidth>
            <Select
                size="small"
                name='sortBy'
                value={filters.sortBy}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        style={{
                            height: inputHeights,
                            boxSizing: 'border-box',
                            color: 'black',
                            borderRadius: '0px',
                            backgroundColor: 'white'
                        }}
                    />
                }>
                <MenuItem value={1}>
                    <Typography variant="body2" color="black">Purchases Amount</Typography>
                </MenuItem>
                <MenuItem value={2}>
                    <Typography variant="body2" color="black">Name</Typography>
                </MenuItem>
            </Select>
        </FormControl>
        <IconButton size="small" onClick={() => handleValueToggled('direction')}>
            <SortByAlphaIcon color="#15291b" />
        </IconButton>
    </Box>,
    <Box>
    <FormButton variant="contained"
        onClick={() => handleAddNew()}
        sx={{
            height: 26,
            width: 26,
            fontSize: '2rem'
        }}

    >+
    </FormButton>
    </Box>,
    <FormButton variant="contained"
        onClick={() => handleSearch()}
        sx={{
            height: '26px',
            width: '120px'
        }}>Search</FormButton>
    ]
}

const Customers = () => {
    console.count('render customers');
    const [customers, setCustomers] = useState([]);
    const fetchCustomers = async (filters) => {
        const cutomers = await GetCustomersBussiness(filters.search);
        const orderCustomers = SortCustomerBusinnes(cutomers, filters);
        setCustomers(orderCustomers);
    }
    const searchPanel = {
        panelItmes: [
            <CustomerSearch fetchCustomers={fetchCustomers} />
        ],
        height: '40px'
    }

    useEffect(() => {
        fetchCustomers(initFilters);
    }, []);

    let renderCustomers;
    if (!customers || customers.length == 0) {
        renderCustomers = <div></div>;
    }
    else {
        renderCustomers = (<ColumnFlexBox
            sx={{
                overflow: 'auto',
                justifyContent: 'flex-start',
                alignItems: 'center',
                maxHeight: '435px'
            }}>
            <List sx={{
                width: '100%',
                columnCount: 2,
                columnGap: '10px'
            }}>
                {customers.map((cust) =>
                    <CustomerListItem key={cust.id} customer={cust} fetchCustomers={fetchCustomers} filters={initFilters}/>
                )}
            </List>
        </ColumnFlexBox>)
    }
    return (
        <>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            {renderCustomers}
        </>
    )
}

export default React.memo(Customers)

