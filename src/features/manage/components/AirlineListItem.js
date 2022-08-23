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

const AirlineListItem = (props) => {
    const { airline } = props;
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
                        <Avatar sx={{
                            margin: 'auto',
                            backgroundColor: '#15291b',
                            color: 'white',
                        }}
                            alt={airline.name}
                        >
                            {airline.name.charAt(0)}
                        </Avatar>
                    </ListItemAvatar>
                </RowFlexBox>
                <FormBoxGrid sx={{
                    width: '85%',
                    //border: '1px solid black',
                    padding: '0',
                    margin: '0',
                    boxSizing: 'border-box',
                    gridTemplateColumns: '4fr 3fr',
                    gridTemplateRows: 'repeat(3,  1fr)',
                    gridRowGap: '5px',
                    gridColumnGap: '5px',
                    alignContent: 'space-between'
                }}>
                    <RowFlexBox spacing={0}
                        sx={{
                            //border: '1px solid black',
                            height: '22px',
                            width: '100%'
                        }}>
                        <ListItemText>
                            <Typography
                                component="span"
                                variant="body2"
                                color="text.primary"
                                fontWeight="bold"
                                noWrap
                            >  {`${airline.name}(${airline.iata})`}
                            </Typography>

                        </ListItemText>
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
                        >  {`Last Ticket: ${moment.utc(airline.last_activity_date).format('DD/MM/YYYY')}`}
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
                        >  {`Total Sales: ${airline.sum_sales} $`}
                        </Typography>

                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'

                    }}>
                        <Link to={`{/airline/Profile}`}
                            style={{ color: 'blue', textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                variant="body2"
                                color='black'
                            >   {airline.email}
                            </Typography>

                        </Link>
                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px'
                    }}>
                        <Link to={`{/Airline/Profile}`}
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

export default AirlineListItem;
