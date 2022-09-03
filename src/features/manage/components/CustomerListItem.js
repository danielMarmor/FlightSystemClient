import React from 'react'
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import { FormBoxGrid, RowFlexBox } from '../../../app/components/FormStyles';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeCustomer } from '../manageSlice';
import { catchAppError } from '../../../app/appSlice';
import { ProfileErrorTemplate } from '../../../constants/enums';
import moment from 'moment';


const CustomerListItem = (props) => {
    const { customer ,fetchCustomers , filters } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleEdit=()=>{
        const customerId = parseInt(customer.id)
        navigate(`/Profile/Customer/Edit/${customerId}`)
    }
    const handleDelete=async()=>{
        try {
            if (!customer.id) {
                handleError({ message: 'Customer Not Found !' });
                return;
            }
            const customerId = parseInt(customer.id)
            await dispatch(removeCustomer(customerId)).unwrap();
            fetchCustomers(filters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    const showProfile=()=>{
        const customerId=customer.id; 
        navigate(`/Profile/Customer/Details/${customer.id}`)
    }
    return (
        <ListItem alignItems="flex-start"
            sx={{
                minHeight: '100px',
                marginBottom: '10px',
                maxHeight: '100px',
                width: '100%',
                border: '2px solid #15291b',
                pageBreakInside: 'avoid',
                breakInside: 'avoid',
                padding: '0',
                margim: '0',
                backgroudColor: "#e9f0eb"

            }}>
            <Stack direction='row'
                sx={{
                    height: '100%',
                    width: '100%',
                    padding: '0',
                    margim: '0'
                }}
                spacing={0}
            >
                <RowFlexBox
                    sx={{
                        display: 'flex',
                        flexDirction: 'column',
                        width: '15%',
                        //border: '1px solid black',
                        justifyContent: 'space-around',
                        alignItems: 'center'
                    }} spacing={0}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                margin: 'auto'
                                // backgroundColor: '#15291b',
                                // color: 'white',
                            }}
                            alt={`${customer.first_name} ${customer.last_name}`}
                            src={customer.image_url}
                            imgProp={{
                                loading: 'lazy'
                            }}
                        >
                            {/* {`${customer.first_name.charAt(0)} ${customer.last_name.charAt(0)}`} */}
                        </Avatar>
                    </ListItemAvatar>
                </RowFlexBox>
                <FormBoxGrid sx={{
                    width: '85%',
                    //border: '1px solid black',
                    padding: '0',
                    margin: '0',
                    boxSizing: 'border-box',
                    gridTemplateColumns: 'repeat(2,  1fr)',
                    gridTemplateRows: 'repeat(3,  1fr)',
                    gridRowGap: '5px',
                    gridColumnGap: '5px',
                    alignContent: 'space-between'
                }}>
                    <RowFlexBox spacing={0}
                        sx={{
                            //border: '1px solid black',
                            height: '22px'
                        }}>

                        <ListItemText
                            primary={
                                <React.Fragment>
                                    <Typography
                                        component="span"
                                        variant="body2"
                                        color="text.primary"
                                        fontWeight="bold"
                                    >  {`${customer.first_name} ${customer.last_name}`}
                                    </Typography>
                                </React.Fragment>
                            } />
                    </RowFlexBox>
                    <RowFlexBox spacing={0}
                        sx={{
                            //border: '1px solid black',
                            height: '22px',
                            justifyContent: 'flex-start'
                        }}>
                        <ListItemIcon sx={{margin: '0px !important' }}>
                            <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
                                <EditIcon fontSize='small' sx={{ color: '#15291b'}}/>
                            </IconButton>
                        </ListItemIcon>

                        <ListItemIcon sx={{ margin: '0px !important' }}>
                            <IconButton onClick={() => handleDelete()} sx={{ padding: '0px', margin: '0px' }}>
                                <DeleteIcon fontSize='small'  sx={{ color: '#15291b'}}/>
                            </IconButton>
                        </ListItemIcon>
                    </RowFlexBox>
                    <RowFlexBox spacing={0}
                        sx={{
                            flexWrap: 'wrap',
                            overflow: 'hidden',
                            //border: '1px solid black',
                            height: '22px',
                            justifyContent: 'flex-start'
                        }}>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >  {`Last Ticket: ${moment.utc(customer.last_activity_date).format('DD/MM/YYYY')}`}
                        </Typography>

                    </RowFlexBox>
                    <RowFlexBox spacing={0}
                        sx={{
                            flexWrap: 'wrap',
                            overflow: 'hidden',
                            //border: '1px solid black',
                            height: '22px',
                            justifyContent: 'flex-start'
                        }}>
                        <Typography
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >  {`Purchases: ${customer.total_purchases} $`}
                        </Typography>

                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'

                    }}>
                        <Link to={`/Profile/Customer/Details/${customer.id}`}
                            style={{ color: 'blue', textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                variant="body2"
                                color='black'
                            >   {customer.email}
                            </Typography>

                        </Link>
                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px'
                    }}>
                        <NavLink to={`/Profile/Customer/Details/${customer.id}`}
                            style={{
                                color: 'blue', textDecoration: 'none',
                                marginRight: '20px'
                            }}
                        >
                            <Typography
                                component="span"
                                variant="body2"
                                color='blue'
                            >   View Profile
                            </Typography>
                        </NavLink>
                    </RowFlexBox>
                </FormBoxGrid>
            </Stack>
        </ListItem >
    )
}

export default CustomerListItem;
