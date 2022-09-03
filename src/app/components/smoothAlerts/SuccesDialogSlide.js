import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Button } from '@mui/material';
import { FormButton } from '../FormStyles';
import { SelectSuccessMessgae, resetSuccessMessage } from '../../appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SuccessDialogSlide=()=>{
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const success = useSelector(SelectSuccessMessgae);

  const isOpen = success != null;
  const [open, setOpen] = React.useState(isOpen);
  
 
  const feature = success && success.feature;
  const message= success && success.message;
  const details= success && success.details;
  const calbackUrl= success && success.url;
 
  const handleClose = () => {
    dispatch(resetSuccessMessage({}));
    if (calbackUrl){
      navigate(calbackUrl);
    }
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{border:'4px solid #15291b'}}
      >
        
        <DialogTitle color={'#15291b'} fontWeight={'800'}>{feature || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="txtMessage" fontSize={'1rem'} fontWeight={'bold'} color={'black'}>
          {message || ''}
          </DialogContentText>
          <DialogContentText marginTop={'20px'} id="txtDetails" fontSize={'0.9rem'}  color={'black'}>
          {details || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormButton sx={{width:100,  backgroundColor: '#15291b !important', color:'white'}} onClick={handleClose}>Close</FormButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SuccessDialogSlide
