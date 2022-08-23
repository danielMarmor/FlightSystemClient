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
import { Link } from 'react-router-dom';
import { FormBoxGrid, RowFlexBox } from '../../../app/components/FormStyles';
import moment from 'moment';


const CustomerListItem = (props) => {
    const { customer } = props;
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
                        alt={`${customer.first_name} ${customer.last_name}` }
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
                        <ListItemIcon sx={{ color: '#15291b', margin: '0px !important' }}>
                            <EditIcon fontSize='small' />
                        </ListItemIcon>

                        <ListItemIcon sx={{ color: '#15291b', margin: '0px !important' }}>
                            <DeleteIcon fontSize='small' />
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
                        <Link to={`{/Customer/Profile}`}
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
                        <Link to={`{/Customer/Profile}`}
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
                        </Link>
                    </RowFlexBox>
                </FormBoxGrid>

            </Stack>
        </ListItem >
    )
}

export default CustomerListItem;
