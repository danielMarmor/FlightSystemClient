import React from 'react'
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { useState } from 'react';
import { numbers } from '../../../../constants/configuration';
import { TextField, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { FormButton, ColumnFlexBox } from '../../../../app/components/FormStyles';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { AutoCompleteBox } from '../../../../app/components/FormStyles';
import FlagIcon from '@mui/icons-material/Flag';
import { useEffect } from 'react';
import { ProfileErrorTemplate } from '../../../../constants/enums';
import { GetAirlinesBussiness, SortAirlinesBusinnes } from '../../../../models/AirlinesBussines';
import { CompareByCountryName } from '../../../../utilities/compare';
import AirlineListItem from '../AirlineListItem';
import { useNavigate } from 'react-router-dom';
import { VariableSizeGrid as Grid } from 'react-window'
import { catchAppError } from '../../../../app/appSlice';
import NoResults from '../../../../app/components/NoResults';
import CircularIndeterminate from '../../../../app/components/waitIndicator/waitIndicator';
import Error from '../../../../app/components/Error';
import { useDispatch } from 'react-redux';

const inputHeights = '24px';

const initFilters = {
    search: '',
    active: false,
    country_id: numbers.noSelectedValue,
}

const AirlinesSearch = ({ fetchAirlines, countries }) => {
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

    const handleCountryChange = (name) => {
        try {
            let newCountryId;
            const country = countries.find(cou => cou.name == name);
            if (!country) {
                newCountryId = country.noSelectedValue;
            }
            else {
                newCountryId = country.id;
            }
            const newFilters = {
                ...filters,
                ['country_id']: newCountryId
            };
            setFilters(newFilters);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleAddNew = () => {
        try {
            navigate('/Profile/Airline/Insert/999')
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleSearch = () => {
        fetchAirlines(filters);
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    return [
        //SEARCH LINE
        <Box sx={{ minWidth: 200 }}>
            <TextField size='small'
                name='search'
                placeholder='search'
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
                            Only Active Airlines
                        </Typography>}
                />
            </FormControl>
        </Box>,
        //SELCT COUNTRY
        <AutoCompleteBox
            freeSolo
            sx={{ width: 140 }}
            id="homeCountry"
            name="country_name"
            onChange={(event, name) => {
                handleCountryChange(name)
            }}
            disableClearable
            options={countries.map((option) => option.name).sort(CompareByCountryName)}
            renderInput={(params) => (
                <TextField
                    size="small"
                    {...params}
                    placeholder='country'
                    variant="standard"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        style: {
                            height: inputHeights,
                            boxSizing: 'border-box',
                            borderRadius: '0px !important',
                            border: '1px solid #15291b',
                            fontSize: '0.9rem',
                            backgroundColor: 'white'
                        },
                        type: 'search',
                        startAdornment: <InputAdornment position="start">
                            <FlagIcon sx={{ color: '#15291b' }} />
                        </InputAdornment>
                    }}
                />
            )}
        />,
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

const Airlines = ({ countries }) => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [airlines, setAirlines] = useState([]);

    const fetchAirlines = async (filters) => {
        try {
            setIndicators('init')
            const airlinesData = await GetAirlinesBussiness(filters.search);
            const orderedAirlines = SortAirlinesBusinnes(airlinesData, filters);
            setIndicators('success')
            setAirlines(orderedAirlines);
        }
        catch (err) {
            setIndicators('failure');
            handleError(err);
        }
    }
    const searchPanel = {
        panelItmes: [
            <AirlinesSearch fetchAirlines={fetchAirlines} countries={countries} />
        ],
        height: '40px'
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
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }

    useEffect(() => {
        fetchAirlines(initFilters);
    }, []);

    let renderAirlines;
    if (isLoading) {
        renderAirlines = (<CircularIndeterminate />);
    }
    else if (isError) {
        renderAirlines = (<Error />);
    }
    else if (!airlines || airlines.length == 0) {
        renderAirlines = (<NoResults message={'Oops.. No Results. Extend your Search!'} />);
    }
    else {
        const columnsNumber = 2;
        const rowsNumber = Math.ceil(airlines.length / 2);
        const totalWidth = 884;
        const totalHeight = 435;
        const colWidth = 442;
        const rowHeight = 110;

        const Cell = ({ columnIndex, rowIndex, style }) => {
            const index = (rowIndex * 2) + columnIndex;
            const airline = airlines[index];
            if (!airline) {
                return <div></div>;
            }
            return (<div style={style}>
                <AirlineListItem key={airline.id}
                    airline={airline}
                    columnIndex={columnIndex}
                    fetchAirlines={fetchAirlines}
                    filters={initFilters}
                />
            </div>)
        }
        renderAirlines = (
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
    }
    return (
        <>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            <Box sx={{ height: '10px', width: '100%' }}></Box>
            {renderAirlines}
        </>
    )
}

export default Airlines;
