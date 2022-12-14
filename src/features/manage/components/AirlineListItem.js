import React from 'react'
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Link, NavLink } from 'react-router-dom';
import { FormBoxGrid, RowFlexBox, CenterBox } from '../../../app/components/FormStyles';
import { useDispatch } from 'react-redux';
import { catchAppError, showSuccessMessage } from '../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate } from '../../../constants/enums';
import { removeAirline } from '../manageSlice';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import moment from 'moment';

const AirlineListItem = (props) => {
    const { airline, columnIndex, fetchAirlines, filters } = props;
    const paddingLeft = columnIndex % 2 === 0 ? 0 : 10;
    const paddingRight = columnIndex % 2 === 0 ? 0 : 10;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleEdit = () => {
        try {
            const airlineId = parseInt(airline.id)
            navigate(`/Profile/Airline/Edit/${airlineId}`)
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleDelete = async () => {
        try {
            if (!airline.id) {
                handleError({ message: 'Airline Company Not Found !' });
                return;
            }
            const airlineId = parseInt(airline.id)
            await dispatch(removeAirline(airlineId)).unwrap();
            const deleteMessage = 'Commited successfuly! Airline removed';
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(deleteMessage, null)));
            fetchAirlines(filters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    return (
        <CenterBox
            sx={{
                minHeight: '100px',
                maxHeight: '100px',
                marginBottom: '10px',
                width: '100%',
                paddingLeft: `${paddingLeft}px`,
                paddingRight: `${0}px`
            }}>
            <Stack direction='row'
                sx={{
                    backgroudColor: "#e9f0eb",
                    border: '2px solid #15291b',
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
                        <ListItemIcon sx={{ margin: '0px !important' }}>
                            <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
                                <EditIcon fontSize='small' sx={{ color: '#15291b' }} />
                            </IconButton>
                        </ListItemIcon>

                        <ListItemIcon sx={{ margin: '0px !important' }}>
                            <IconButton onClick={() => handleDelete()} sx={{ padding: '0px', margin: '0px' }}>
                                <DeleteIcon fontSize='small' sx={{ color: '#15291b' }}/>
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
                        <NavLink to={`/Profile/Airline/Details/${airline.id}`}
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
        </CenterBox >
    )
}

export default AirlineListItem;
