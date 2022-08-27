import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux'
import { SelectApplicationError , resetAppError} from '../../appSlice'
import { Button } from '@mui/material';
import { FormButton } from '../FormStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ErrorDialogSlide=(props)=>{

  
  const dispatch = useDispatch();
  const error = useSelector(SelectApplicationError);
  const isOpen = error != null;
  const [open, setOpen] = React.useState(isOpen);
 
  const feature = error && error.feature;
  const message= error && error.message;
  const details= error && error.details;
 

  const handleClose = () => {
    dispatch(resetAppError('reset'));
  };

  return (
    <div>
      <Dialog
        open={isOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{border:'4px solid #C00000'}}
      >
        
        <DialogTitle color={'#C00000'} fontWeight={'800'}>{feature || ''}</DialogTitle>
        <DialogContent>
          <DialogContentText id="txtMessage" fontSize={'1rem'} fontWeight={'bold'} color={'black'}>
          {message || ''}
          </DialogContentText>
          <DialogContentText marginTop={'20px'} id="txtDetails" fontSize={'0.9rem'}  color={'black'}>
          {details || ''}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <FormButton sx={{width:100, color:'white'}} onClick={handleClose}>Close</FormButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ErrorDialogSlide
