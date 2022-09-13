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
import { fetchCustomersBussiness } from '../../manageSlice';
import { SortCustomerBusinnes } from '../../../../models/customersBusiness';
import {sortByField, directions, ProfileErrorTemplate} from '../../../../constants/enums';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window'
import { useDispatch, useSelector } from 'react-redux';
import { catchAppError } from '../../../../app/appSlice';
import NoResults from '../../../../app/components/NoResults';
import CircularIndeterminate from '../../../../app/components/waitIndicator/waitIndicator';
import Error from '../../../../app/components/Error';


const inputHeights = '24px';

const initFilters = {
    search: '',
    active: true,
    sortBy: sortByField.purchases,
    direction: directions.descending
}

const CustomerSearch = ({ fetchCustomers }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [filters, setFilters] = useState(initFilters);
    const handleChange = (e) => {
        try {
            setFilters({
                ...filters,
                [e.target.name]: e.target.value
            })
        }
        catch (err) {
            handleError(err);
        }
    };
    const handleCheckedChanged = (e) => {
        try {
            setFilters({
                ...filters,
                [e.target.name]: e.target.checked
            })
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleValueToggled = (name) => {
        try {
            const newDirection = filters[name] == directions.ascending ? directions.descending : directions.ascending;
            const newFilters = {
                ...filters,
                [name]: newDirection
            }
            fetchCustomers(newFilters);
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleSearch = () => {
        try {
            fetchCustomers(filters);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleAddNew = () => {
        try {
            navigate(`/Profile/Customer/Insert/999`)
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    //SEARCH LINE
    return [<Box sx={{ minWidth: 200 }}>
        <TextField size='small'
            name='search'
            value={filters.search || ''}
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
                value={filters.sortBy || ''}
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
    //console.count('render customers');   
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [customers, setCustomers] = useState([]);

    const fetchCustomers = async (filters) => {
        try {
            setIndicators('init');
            const customers = await dispatch(fetchCustomersBussiness(filters.search)).unwrap();
            const orderCustomers = SortCustomerBusinnes(customers, filters);
            setIndicators('success');
            setCustomers(orderCustomers);
        }
        catch (err) {
            setIndicators('failure');
            handleError(err);
        }
    }

    const setIndicators = (action) => {
        switch (action) {
            case 'init':
                {
                    if (!isLoading) {
                        setIsLoading(true);
                    }
                    if (isError) {
                        setIsError(false);
                    }
                    break;
                }
            case 'success': {
                setIsLoading(false);
                break;
            }
            case 'failure': {
                setIsLoading(false);
                setIsError(true);
                break;
            }
        }
    }


    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)));
    }

    useEffect(() => {
        fetchCustomers(initFilters);
    }, []);

    const searchPanel = {
        panelItmes: [
            <CustomerSearch fetchCustomers={fetchCustomers} />
        ],
        height: '40px'
    }

    let renderCustomers;
    if (isLoading) {
        renderCustomers = (<CircularIndeterminate />);
    }
    else if (isError) {
        renderCustomers = (<Error />);
    }
    //status.idle
    else if (!customers || customers.length == 0) {
        renderCustomers = (<NoResults message={'Oops.. No Results. Extend your Search!'} />);
    }
    else {
        const columnsNumber = 2;
        const rowsNumber = Math.ceil(customers.length / 2);
        const totalWidth = 884;
        const totalHeight = 435;
        const colWidth = 442;
        const rowHeight = 110;

        const Cell = ({ columnIndex, rowIndex, style }) => {
            const index = (rowIndex * 2) + columnIndex;
            const cust = customers[index];
            if (!cust) {
                return <div></div>;
            }
            return (<div style={style}>
                <CustomerListItem key={cust.id}
                    customer={cust}
                    fetchCustomers={fetchCustomers}
                    filters={initFilters}
                    columnIndex={columnIndex}
                />
            </div>)
        }
        renderCustomers = (
            <Grid
                columnCount={columnsNumber}
                columnWidth={index => colWidth}
                height={totalHeight}
                rowCount={rowsNumber}
                rowHeight={index => rowHeight}
                width={totalWidth}
            >
                {Cell}
            </Grid>)
        // <ColumnFlexBox
        //     sx={{
        //         overflow: 'auto',
        //         justifyContent: 'flex-start',
        //         alignItems: 'center',
        //         maxHeight: '435px'
        //     }}>
        //     <List sx={{
        //         width: '100%',
        //         columnCount: 2,
        //         columnGap: '10px'
        //     }}>
        //         {customers.map((cust) =>
        //             <CustomerListItem key={cust.id} customer={cust} fetchCustomers={fetchCustomers} filters={initFilters}/>
        //         )}
        //     </List>
        // </ColumnFlexBox>)
    }
    return (
        <>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            <Box sx={{ height: '10px', width: '100%' }}></Box>
            {renderCustomers}
        </>
    )
}

export default React.memo(Customers)

