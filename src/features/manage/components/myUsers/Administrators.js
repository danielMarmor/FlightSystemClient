import React from 'react'
import SearchLine from '../../../../app/components/searchLine/SearchLine';
import { DataGrid } from '@mui/x-data-grid';
import { Box, TextField } from '@mui/material'
import { FormButton } from '../../../../app/components/FormStyles';
import { GetAdministratorsByParams } from '../../../../models/Management';
import { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';
import { useNavigate, NavLink } from 'react-router-dom';

const searchInputsHeight = 24;

const initFilters = {
    search: ''
}
const AdministratorsSearch = ({ fetchAdministrators }) => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState(initFilters);

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    }

    const handleSearch = () => {
        fetchAdministrators(filters);
    }

    const handelAddNew=()=>{
        navigate('/Profile/Admin/Insert/999');
    }

    return ([
        //SEARCH LINE
        <Box sx={{ flex: 5 }}>
            <TextField size='small'
                name='search'
                placeholder='search'
                value={filters.search}
                onChange={handleChange}
                InputProps={{
                    style: {
                        height: 24,
                        width: 200,
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
        </Box>,
        <Box sx={{ flex: 1 }}>
            <FormButton variant="contained"
                onClick={() => handelAddNew()}
                sx={{
                    height: searchInputsHeight + 2,
                    width: searchInputsHeight + 2,
                    fontSize: '2rem'
                }}

            >+
            </FormButton>
        </Box>,
        <FormButton variant="contained"
            onClick={() => handleSearch()}
            sx={{
                height: searchInputsHeight + 2,
                width: '120px'
            }}>Search
        </FormButton>
    ]);
}
const Administrators = () => {
    console.count('render administrators');
    const [adminisirators, setAdministrators] = useState([]);

    const fetchAdministrators = async (filters) => {
        const adminData = await GetAdministratorsByParams(filters.search);
        setAdministrators(adminData);
    }
    const searchPanel = {
        panelItmes: [
            <AdministratorsSearch fetchAdministrators={fetchAdministrators} />
        ],
        height: '40px'
    }

    useEffect(() => {
        fetchAdministrators(initFilters);
    }, []);

    let renderAdministrators;
    if (!adminisirators || adminisirators.length == 0) {
        renderAdministrators = <div></div>;
    }
    else {
        const rows = adminisirators;
        const columns = [
            {
                field: 'id',
                headerName: 'Id',
                flex: 1.5,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            }
            ,
            {
                field: 'edit',
                headerName: 'Edit',
                flex: 1.5,
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
                field: 'profile',
                headerName: '',
                flex: 1.5,
                headerAlign: 'center',
                align: 'center',
                headerClassName: 'dataGridHeader',
                cellClassName: 'dg-alignCenter',
                renderCell: (params) => (
                    <NavLink to={'/Admin/Profile'}
                        style={{ textDecoration: 'none' }}>
                        Profile
                    </NavLink>
                )
            },
            {
                field: 'first_name',
                headerName: 'First Name',
                flex: 2.5,
                headerAlign: 'center',
                headerClassName: 'dataGridHeader',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'last_name',
                headerName: 'Last Name',
                flex: 2.5,
                headerClassName: 'dataGridHeader',
                headerAlign: 'center',
                align: 'center',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'email',
                headerName: 'Email',
                flex: 4,
                headerClassName: 'dataGridHeader',
                headerAlign: 'left',
                align: 'left',
                cellClassName: 'dg-alignCenter'
            },
            {
                field: 'delete',
                headerName: 'Delete',
                flex: 1.5,
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
        renderAdministrators = (
            <div style={{ height: 425, width: '100%', overflow: 'auto', marginTop: 10 }}>
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
        <>
            <SearchLine searchPanel={searchPanel} height={'40px'} />
            {renderAdministrators}

        </>
    )
}


export default Administrators
