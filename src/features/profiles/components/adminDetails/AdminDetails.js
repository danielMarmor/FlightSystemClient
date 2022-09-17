import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAdminById } from '../../../manage/manageSlice';
import { removeAdministrator } from '../../../manage/manageSlice';
import { catchAppError, showSuccessMessage } from '../../../../app/appSlice';
import { ProfileErrorTemplate, ProfileSuccessTemplate, messages, userType } from '../../../../constants/enums';
import {
  PrimaryTextTypography, SecTextTypography, SubHeaderTypography,
  primaryColor, HorizonStack, LeftCenterBox
} from '../../../../app/components/FormStyles';
import { SelectUserTypeId, SelectIdentityId } from '../../profilesSlice';
import DoubleForm from '../../../../app/components/layout/DoubleForm';
import ActionGrid from '../../../../app/components/ActionGrid';
import { IconStack } from '../../../../app/components/FormStyles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { CenterBox } from '../../../../app/components/FormStyles';
import { IconButton } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { images } from '../../../../constants/configuration';

const iconStackProportions = [1, 3, 5];

const AdminDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const identityId = useSelector(SelectIdentityId);
  const dispatch = useDispatch();
  const [details, setDetails] = useState({});
  const userTypeId = useSelector(SelectUserTypeId);

  const loadAdmin = async (adminId) => {
    try {
      const administrator = await dispatch(fetchAdminById(adminId)).unwrap();
      const newDetails = {
        ...administrator,
        //CUSTOM STATE PROPERTIES ===> ONLY FOR SCREEN
        confirmPassword: administrator.password
      }
      setDetails(newDetails);
    }
    catch (err) {
      handleError(err);
    }
  }
  const handleEdit = () => {
    navigate(`/Profile/Admin/Edit/${id}`);
  }

  const handleDelete = async () => {
    try {
      if (!id) {
        handleError({ message: 'Administrator Not Found !' });
        return;
      }
      const administratorId = parseInt(id)
      checkSelf(administratorId);
      await dispatch(removeAdministrator(administratorId)).unwrap();
      const deleteSuccesUrl = '/MyUsers';
      dispatch(showSuccessMessage
        (ProfileSuccessTemplate(messages.succefulyCommited, deleteSuccesUrl)));
    }
    catch (err) {
      handleError(err);
    }
  }

  const handleBack = () => {
    navigate(-1);
  }

  const checkSelf = (administratorId) => {
    const deleteSelf = administratorId === identityId;
    if (deleteSelf) {
      throw Error('You cannot delete yourself');
    }
  }

  const handleError = (err) => {
    dispatch(catchAppError(ProfileErrorTemplate(err.message)));
  }

  useEffect(() => {
    if (!id) {
      handleError({ message: 'Administrator Not Found !' });
      return;
    }
    const administratorId = parseInt(id);
    loadAdmin(administratorId);
  }, []);
  const formCtrls = [
    //(1)FULL NAME
    <IconStack
      icon={<AccountCircleIcon sx={{ color: primaryColor }} />}
      label={<PrimaryTextTypography>Full Name:</PrimaryTextTypography>}
      value={<SecTextTypography sx={{ width: '100px' }}>{`${details.first_name || ''} ${details.last_name || ''}`}</SecTextTypography>}
      proportions={iconStackProportions}
    />,
    //(2) USER NAME
    <IconStack
      icon={<AccountCircleIcon sx={{ color: primaryColor }} />}
      label={<PrimaryTextTypography>User Name:</PrimaryTextTypography>}
      value={<SecTextTypography sx={{ width: '100px' }}>{details.username || ''}</SecTextTypography>}
      proportions={iconStackProportions}
    />,
    //(3) PASSWORD
    <IconStack
      icon={<LockIcon sx={{ color: primaryColor }} />}
      label={<PrimaryTextTypography>Password:</PrimaryTextTypography>}
      value={<SecTextTypography sx={{ width: '100px' }}>{details.password || ''}</SecTextTypography>}
      proportions={iconStackProportions}
    />,
    //(4)EMAIL
    <IconStack
      icon={<EmailIcon sx={{ color: primaryColor }} />}
      label={<PrimaryTextTypography>Email:</PrimaryTextTypography>}
      value={<SecTextTypography sx={{ width: '100px' }}>{details.email || ''}</SecTextTypography>}
      proportions={iconStackProportions}
    />

  ]

  const formActions = [
  ]


  const formConfig = {
    proportions: {
      relGrid: 4,
      relActions: 0
    },
    grdDimentions: {
      horiz: 1,
      vert: 4
    },
    gaps: {
      rowGap: 30,
      colGap: 20
    }
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
                src={details.image_url || ''}
              >
                {/* {`${customer.first_name.charAt(0)} ${customer.last_name.charAt(0)}`} */}
              </Avatar>
            </CenterBox>
            <LeftCenterBox sx={{ paddingLeft: '5px' }}>
              <SubHeaderTypography fontSize={'1.5rem'}>
                {`(${details.id || ''}) ${details.first_name || ''} ${details.last_name || ''}`}
              </SubHeaderTypography>
            </LeftCenterBox>
          </HorizonStack>
          <HorizonStack width={'50%'}
            justifyContent={'flex-end'}>
            <IconButton onClick={() => handleBack()} sx={{ padding: '0px', margin: '0px' }}>
              <ArrowBackIosNewIcon sx={{ color: 'white', marginRight: '20px', fontSize: '26px' }}
              />
            </IconButton>
            <IconButton onClick={() => handleEdit()} sx={{ padding: '0px', margin: '0px' }}>
              <EditIcon sx={{ color: 'white', marginRight: '20px', fontSize: '26px' }}
              />
            </IconButton>
            <IconButton onClick={() => handleDelete()}
              sx={{
                display: userTypeId == userType.customer ? 'none' : 'flex',
                padding: '0px',
                margin: '0px',
              }}>
              <DeleteIcon sx={{ color: 'white', marginRight: '5px', fontSize: '26px' }} />
            </IconButton>
          </HorizonStack>
        </HorizonStack>
      }
      leftForm={
        <ActionGrid config={formConfig}
          formCtrls={formCtrls}
          formActions={formActions}
        />

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

export default AdminDetails
