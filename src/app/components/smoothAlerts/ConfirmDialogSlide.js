import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from 'react-redux'
import { SelectApplicationError, resetAppError } from '../../appSlice'
import { Button } from '@mui/material';
import { FormButton } from '../FormStyles';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ConfirmDialogSlide = (props) => {
    const { confirm } = props;
    const isOpen = confirm != null;
    const [open, setOpen] = React.useState(isOpen);

    const feature = confirm && confirm.feature;
    const message = confirm && confirm.message;
    const details = confirm && confirm.details;
    const confirmActionName = confirm && confirm.confirmActionName;
    const confirmActionCalback = confirm && confirm.confirmActionCalback;
    const cancelActionName = confirm && confirm.confirmActionName;
    const cancelActionCalback = confirm && confirm.cancelActionCalback;

    const handleAction = () => {
        confirmActionCalback();
    };
    const handleCancel = () => {
        cancelActionCalback();

        return (
            <div>
                <Dialog
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    sx={{ border: '4px solid #15291b' }}
                >

                    <DialogTitle color={'#15291b'} fontWeight={'800'}>{feature || ''}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="txtMessage" fontSize={'1rem'} fontWeight={'bold'} color={'black'}>
                            {message || ''}
                        </DialogContentText>
                        <DialogContentText marginTop={'20px'} id="txtDetails" fontSize={'0.9rem'} color={'black'}>
                            {details || ''}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <FormButton sx={{ width: 100, backgroundColor: '#15291b', color: 'white' }} onClick={handleAction}>{confirmActionName}</FormButton>
                        <FormButton sx={{ width: 100, backgroundColor: '#15291b', color: 'white' }} onClick={handleCancel}>{cancelActionName}</FormButton>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default ConfirmDialogSlide;
