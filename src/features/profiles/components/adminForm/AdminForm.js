import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoubleForm from '../../../../app/components/layout/DoubleForm'
import ActionGrid from '../../../../app/components/ActionGrid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { FormButton, IconTextBox, primaryColor } from '../../../../app/components/FormStyles';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAdminById, addAdministrator, editAdministrator as editAdminByPeerAdmin } from '../../../manage/manageSlice';
import { editAdministrator  as editAdminBySelf, SelectIdentityId} from '../../profilesSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, fields, messages } from '../../../../constants/enums';
import { AdminValidations as validators } from '../../../../models/validation';
import { CenterBox } from '../../../../app/components/FormStyles';
import { HorizonStack, LeftCenterBox, SubHeaderTypography } from '../../../../app/components/FormStyles';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../../constants/configuration';
import { FormControl, InputLabel, Select, Typography, IconButton, OutlinedInput, MenuItem } from '@mui/material';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { GenerateProfilePhoto } from '../../../../api/photoGenrator';
import CircularIndeterminate from '../../../../app/components/waitIndicator/waitIndicator';
import Error from '../../../../app/components/Error';

const AdminForm = () => {
    const navigate = useNavigate();
    const { mode, administratorId } = useParams();

    const dispatch = useDispatch();
    const identityId= useSelector(SelectIdentityId);

    const [details, setDetails] = useState({});

    const [photoLoading, setPhotoLoading] = useState(false);
    const [photoError, setPhotoError] = useState(false);

    const loadAdmin = async (adminId) => {
        try {
            const administrator = await dispatch(fetchAdminById(adminId)).unwrap();
            const newDetails = {
                ...administrator,
                confirmPassword: administrator.password
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }

    }
    const insertAdmin = async () => {
        //ONLY BY ADMINISTRATOR
        const newAdmin = await dispatch(addAdministrator(details)).unwrap();
        const successUrl = `/Profile/Admin/Details/${newAdmin.id}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
    }
    const updateAdmin = async () => {
        //BY ADMIN OR BY CUSOTOMEr
        const updateAdminData = {
            administratorId: administratorId,
            adminData: details
        }
        if (isUpdatingSelf){ //ADMIN UPDATING HIMSELF ====PROFILE SLICE
            const response = await dispatch(editAdminBySelf(updateAdminData)).unwrap();
            const successUrl = `/Profile/Admin/Details/${administratorId}`;
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
        }
        //ADMIN UPDATING HIS COLLEAGE === MANAGE SLICE
        else{
            const response = await dispatch(editAdminByPeerAdmin(updateAdminData)).unwrap();
            const successUrl = `/Profile/Admin/Details/${administratorId}`;
            dispatch(showSuccessMessage
                (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
        }
       
    }
    const isUpdatingSelf =(administratorId)=>{
        return administratorId === identityId;
    }
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            validate();
            switch (mode) {
                case 'Insert':
                    await insertAdmin();
                    break;
                case 'Edit':
                    //EDIT ADMIN ===> CHECK IT OUT
                    await updateAdmin()
                    break;
            }
            //BOTH USER TYPES (ADMIN/CUST) ==> REDIRECT AFTER SUSCCESS DIALOG TO CUSTOMER DETAILLS PROFILE PAGE
        }
        catch (err) {
            handleError(err);
        }
    }
    const setPhotoIndicators = (action) => {
        switch (action) {
            case 'init':
                {
                    if (!photoLoading) {
                        setPhotoLoading(true);
                    }
                    if (photoError) {
                        setPhotoError(false);
                    }
                    break;
                }
            case 'success': {
                setPhotoLoading(false);
                break;
            }
            case 'failure': {
                setPhotoLoading(false);
                setPhotoError(true);
                break;
            }
        }
    }

    const handleCancel = () => {
        try {
            navigate(-1);
        }
        catch (err) {
            handleError(err);
        }
    }
    const handleChange = (e) => {
        try {
            const newDetails = {
                ...details,
                [e.target.name]: e.target.value
            }
            setDetails(newDetails);
        }
        catch (err) {
            handleError(err);
        }
    }

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    const validate = () => {
        if (details.password != details.confirmPassword) {
            throw Error('Passwords dont match!');
        }
    }
    const handleGeneratePhoto = async () => {
        try {
            if (!details.gender) {
                handleError({ message: 'Please select Man/Woman' });
                return;
            }
            setPhotoIndicators('init');
            const search = `${details.gender} face`
            const profilePhotoUrl = await GenerateProfilePhoto(search);
            setPhotoIndicators('success');
            const newDetails = {
                ...details,
                ['image_url']: profilePhotoUrl
            }
            setDetails(newDetails);
        }
        catch (err) {
            setPhotoIndicators('failure');
            handleError(err);
        }
    }

    useEffect(() => {
        try {
            if (mode == 'Edit') {
                if (!administratorId) {
                    const notFoundError = { message: 'Administrator Not Found !' };
                    handleError(notFoundError);
                    return;
                }
                loadAdmin(administratorId);
            }
        }
        catch (err) {
            handleError(err);
        }
    }, []);

    const formCtrls = [
        //children, name, label, details, icon, handleChange
        //USER NAME
        <IconTextBox name={'username'} label={'User Name'} details={details} validation={validators(fields.username)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'password'} label={'Password'} details={details} validation={validators(fields.password)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'email'} label={'Email'} details={details} validation={validators(fields.email)}
            icon={<EmailIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'confirmPassword'} label={'Confirm Password'} details={details} validation={validators(fields.confirmPassword)}
            icon={<LockIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'first_name'} label={'First Name'} details={details} validation={validators(fields.first_name)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <IconTextBox name={'last_name'} label={'Last Name'} details={details} validation={validators(fields.last_name)}
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />,
        <FormControl fullWidth>
            <InputLabel shrink={true}>Gender For Photo</InputLabel>
            <Select
                size="small"
                name='gender'
                value={details.gender || ''}
                onChange={handleChange}
                input={
                    <OutlinedInput
                        style={{
                            height: 40,
                            boxSizing: 'border-box',
                            color: 'black',
                        }}
                    />
                }>
                <MenuItem key={1} value={'man'}>Man</MenuItem>
                <MenuItem key={2} value={'woman'}>Woman</MenuItem>
            </Select>
        </FormControl>,
        <IconButton sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: '0px 0px 0px 5px'
        }}>
            <AddAPhotoIcon
                onClick={handleGeneratePhoto}
                sx={{ color: '#15291b', fontSize: '40px' }} />
            <Typography variant='body2' component='div'
                sx={{ color: '#15291b', marginLeft: '5px' }}>
                Your Best Photo
            </Typography>
        </IconButton>
    ]

    const formActions = [
        <FormButton type='submit'
            style={{ color: 'white', flex: '1' }}
        >
            Save
        </FormButton>,
        <FormButton
            style={{ color: 'white', flex: '1' }}
            onClick={() => handleCancel()}
        >
            Cancel
        </FormButton>
    ]


    const formConfig = {
        proportions: {
            relGrid: 6,
            relActions: 1
        },
        grdDimentions: {
            horiz: 2,
            vert: 6
        },
        gaps: {
            rowGap: 30,
            colGap: 20
        }
    };

    let renderPhoto;
    if (photoLoading){
        renderPhoto =  (<CircularIndeterminate />);
    }
    else if (photoError){
        renderPhoto = (<Error />);
    }
    else{
        renderPhoto = (<CenterBox id='centerBox' sx={{
            width: '100%',
            height: '100%',
            borderStyle: 'none',
            borderWidth: '1px',
            borderColor: 'ligthGrey',
            backgroundImage: `url(${details.image_url || images.personImageDeafultURL})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
        }}>
        </CenterBox>)
    }
    return (
        <DoubleForm
            header={
                <HorizonStack>
                    <HorizonStack width={'50%'}
                        justifyContent={'flex-start'}>
                        <CenterBox width={'40px'} height={'40px'}>
                            <Avatar
                                sx={{
                                    margin: 'auto',
                                    height: '90%',
                                    width: '90%'
                                    // backgroundColor: '#15291b',
                                    // color: 'white',
                                }}
                                alt={`${details.first_name || ''} ${details.last_name || ''}`}
                                src={details.image_url || images.personImageDeafultURL}
                            >
                                {/* {`${customer.first_name.charAt(0)} ${customer.last_name.charAt(0)}`} */}
                            </Avatar>
                        </CenterBox>
                        <LeftCenterBox sx={{ paddingLeft: '5px' }}>
                            <SubHeaderTypography fontSize={'1.5rem'}>
                                {!details.id ? 'New Profile' : `(${details.id}) ${details.first_name} ${details.last_name}`}
                            </SubHeaderTypography>
                        </LeftCenterBox>
                    </HorizonStack>
                </HorizonStack>
            }
            leftForm={
                <form
                    style={{ width: '100%', height: '100%' }}
                    onSubmit={handleSubmit}
                >
                    <ActionGrid config={formConfig}
                        formCtrls={formCtrls}
                        formActions={formActions}
                    />
                </form>

            }
            rightFrom={renderPhoto}
        >
        </DoubleForm>
    )
}


export default AdminForm;

