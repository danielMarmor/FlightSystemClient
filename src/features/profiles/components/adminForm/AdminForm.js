import React from 'react'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import DoubleForm from '../../../../app/components/layout/DoubleForm'
import ActionGrid from '../../../../app/components/ActionGrid'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { FormButton, IconTextBox, primaryColor } from '../../../../app/components/FormStyles';
import { useNavigate, useParams } from 'react-router-dom'
import { fetchAdminById, addAdministrator, editAdministrator  as editAdminByPeerAdmin} from '../../../manage/manageSlice';
import { editAdministrator as editAdminBySelf } from '../../../manage/manageSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, fields, messages } from '../../../../constants/enums';
import { AdminValidations as validators } from '../../../../models/validation';
import { CenterBox } from '../../../../app/components/FormStyles';
import { HorizonStack, LeftCenterBox, SubHeaderTypography } from '../../../../app/components/FormStyles';
import Avatar from '@mui/material/Avatar';
import { images } from '../../../../constants/configuration';

const AdminForm = () => {
    const navigate = useNavigate();
    const { mode, administratorId } = useParams();
    const dispatch = useDispatch();
    const [details, setDetails] = useState({});

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
        const reponse = await dispatch(editAdminBySelf(updateAdminData)).unwrap();
        const successUrl = `/Profile/Admin/Details/${administratorId}`;
        dispatch(showSuccessMessage
            (ProfileSuccessTemplate(messages.succefulyCommited, successUrl)));
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
    const handleCancel = () => {
        navigate(-1);
    }
    const handleChange = (e) => {
        const newDetails = {
            ...details,
            [e.target.name]: e.target.value
        }
        setDetails(newDetails);
    }

    const handleError = (err) => {
        dispatch(catchAppError(ProfileErrorTemplate(err.message)))
    }
    const validate = () => {
        if (details.password != details.confirmPassword) {
            throw Error('Passwords dont match!');
        }
    }

    useEffect(() => {
        if (mode == 'Edit') {
            if (!administratorId) {
                const notFoundError = { message: 'Administrator Not Found !' };
                handleError(notFoundError);
                return;
            }
            loadAdmin(administratorId);
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
            icon={<AccountCircleIcon sx={{ color: primaryColor }} />} handleChange={handleChange} />
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
            rightFrom={<CenterBox id='centerBox' sx={{
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
            </CenterBox>}
        >
        </DoubleForm>
    )
}


export default AdminForm;

