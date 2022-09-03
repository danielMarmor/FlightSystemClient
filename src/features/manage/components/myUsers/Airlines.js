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
import {List} from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { AutoCompleteBox } from '../../../../app/components/FormStyles';
import FlagIcon from '@mui/icons-material/Flag'; 
import { useEffect } from 'react';
import { GetAirlinesBussiness, SortAirlinesBusinnes } from '../../../../models/AirlinesBussines';
import { CompareByCountryName } from '../../../../utilities/compare';
import AirlineListItem from '../AirlineListItem';
import { useNavigate } from 'react-router-dom';

const inputHeights = '24px';

const initFilters = {
    search: '',
    active: false,
    country_id: numbers.noSelectedValue,
}

const AirlinesSearch = ({fetchAirlines, countries}) => {
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
    const handleCountryChange=(name)=>{
        let newCountryId;
        const country = countries.find(cou =>cou.name == name);        
        if (!country){
            newCountryId  =country.noSelectedValue;
        }
        else{
            newCountryId  =country.id;
        }
        const newFilters = {
            ...filters,
            ['country_id']: newCountryId
        };
        setFilters(newFilters);
    }
    
    const handleAddNew=()=>{
        navigate('/Profile/Airline/Insert/999')
    }

    const handleSearch =()=> {
        fetchAirlines(filters);
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
            sx={{width : 140}}
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
                        } ,                    
                        type: 'search',
                        startAdornment: <InputAdornment position="start">
                            <FlagIcon sx={{ color: '#15291b' }} />
                        </InputAdornment>
                    }}
                />
            )}
        /> ,  
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

const Airlines = ({countries}) => {
    console.count('render airlines');
    const [airlines, setAirlines] = useState([]);
    
    const fetchAirlines = async (filters) => {
        const airlinesData = await GetAirlinesBussiness(filters.search);
        const orderedAirlines = SortAirlinesBusinnes(airlinesData, filters);
        setAirlines(orderedAirlines);
    }
    const searchPanel = {
        panelItmes: [
            <AirlinesSearch fetchAirlines={fetchAirlines} countries={countries}/>
        ],
        height : '40px'
    }

    useEffect(() => {
        fetchAirlines(initFilters);
    }, []);

    let renderAirlines;
    if (!airlines || airlines.length == 0) {
        renderAirlines =  <div></div>;
    }
    else {
        renderAirlines = (<ColumnFlexBox
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
                {airlines.map((airline) =>
                    <AirlineListItem key={airline.id} airline={airline} />
                )}
            </List>
        </ColumnFlexBox>)
    }
    return (
        <>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            {renderAirlines}
        </>
    )


}

export default Airlines;
