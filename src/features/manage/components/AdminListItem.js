import React from 'react'
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
import { FormBoxGrid, RowFlexBox, CenterBox } from '../../../app/components/FormStyles';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { removeAdministrator } from '../manageSlice';
import { catchAppError, showSuccessMessage } from '../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate } from '../../../constants/enums';
import { SelectIdentityId } from '../../profiles/profilesSlice';
import moment from 'moment';


const AdminListItem = (props) => {
    const { administrator, fetchAdministrators, filters, columnIndex } = props;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //CURRENT LOGGED IN ADMINISTRATOR 
    const selfAdministratorId = useSelector(SelectIdentityId);

    const paddingLeft = columnIndex % 2 === 0 ? 0 : 10;
    const paddingRight = columnIndex % 2 === 0 ? 0 : 10;

    const handleEdit = () => {
        try {
            const administratorId = parseInt(administrator.id)
            //checkUpdateSelf(administratorId);
            navigate(`/Profile/Admin/Edit/${administratorId}`)
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleDelete = async () => {
        try {
            if (!administrator.id) {
                handleError({ message: 'Administrator Not Found !' });
                return;
            }
            const administratorId = parseInt(administrator.id)
            checkDeleteSelf(administratorId);
            await dispatch(removeAdministrator(administratorId)).unwrap();
            const deleteMessage = 'Commited successfuly! Administrator removed';
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(deleteMessage, null)));
            fetchAdministrators(filters);
        }
        catch (err) {
            handleError(err);
        }
    }
    const checkUpdateSelf = (administratorId) => {
        if (administratorId == selfAdministratorId) {
            throw Error('You cannot update youself from this panel. In order to do that - Go to Profile Page');
        }
    }
    const checkDeleteSelf = (administratorId) => {
        if (administratorId == selfAdministratorId) {
            throw Error('You cannot delete yourself');
        }
    }
    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    const showProfile = () => {
        try {
            const administratorId = administrator.id;
            navigate(`/Profile/Admin/Details/${administratorId}`)
        }
        catch (err) {
            handleError(err);
        }
    }
    return (
        <CenterBox
            sx={{
                minHeight: '100px',
                maxHeight: '100px',
                marginBottom: '10px',
                width: '100%',
                paddingLeft: `${paddingLeft}px`,
                paddingRight: `${0}px`,
            }}>
            <Stack direction='row'
                sx={{
                    backgroudColor: "#e9f0eb",
                    border: '2px solid #15291b',
                    height: '100px',
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
                            alt={`${administrator.first_name} ${administrator.last_name}`}
                            src={administrator.image_url}
                            imgProp={{
                                loading: 'lazy'
                            }}
                        >
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
                                    >  {`${administrator.first_name} ${administrator.last_name}`}
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
                        <ListItemIcon sx={{ margin: '0px !important' }}>
                            <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
                                <EditIcon fontSize='small' sx={{ color: '#15291b' }} />
                            </IconButton>
                        </ListItemIcon>

                        <ListItemIcon sx={{ margin: '0px !important' }}>
                            <IconButton onClick={() => handleDelete()} sx={{ padding: '0px', margin: '0px' }}>
                                <DeleteIcon fontSize='small' sx={{ color: '#15291b' }} />
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
                        >  {'Last Activity: 01/01/2022'}
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
                        >
                        </Typography>

                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px',
                        justifyContent: 'flex-start',
                        overflow: 'hidden'

                    }}>
                        <Link to={`/Profile/Admin/Details/${administrator.id}`}
                            style={{ color: 'blue', textDecoration: 'none' }}
                        >
                            <Typography
                                component="span"
                                variant="body2"
                                color='black'
                            >   {administrator.email}
                            </Typography>

                        </Link>
                    </RowFlexBox>
                    <RowFlexBox spacing={0} sx={{
                        //border: '1px solid black',
                        height: '22px'
                    }}>
                        <NavLink to={`/Profile/Admin/Details/${administrator.id}`}
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
        </CenterBox>
    )
}

export default AdminListItem;
