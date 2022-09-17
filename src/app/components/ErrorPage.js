import { CenterBox, SubHeaderTypography, VerticalStack, HorizonStack } from "./FormStyles";
import { useState } from "react";
import ErrorIcon from '@mui/icons-material/Error';
import Dialog from '@mui/material/Dialog';
import { IconButton } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';

const errorColor = '#15291b';

const ErrorPage = () => {
    const [open, setIsOpen] = useState(true);
    const handleDialogClose = () => {
        setIsOpen(false);
    }
    return (
        <Dialog open={open}
            PaperProps={{
                style: {
                    border: '4px solid #15291b',
                    borderRadius: 4,
                    width: '800px',
                    height: '400px',
                    marginLeft: '30px'
                }
            }}>
            <CenterBox justifyContent={'flex-start'}
                sx={{ padding: '5px' }}>
                <HorizonStack height={40}
                    sx={{
                        backgroundColor: '#15291b',
                        width: '100%',
                        borderRadius: '4px',
                        marginBottom: '25px',
                        paddingLeft: '10px'
                    }}>
                    <SubHeaderTypography>
                        Flight Servix
                    </SubHeaderTypography>
                    <IconButton onClick={() => handleDialogClose()}>
                        <CancelIcon sx={{ color: 'white' }} />
                    </IconButton>
                </HorizonStack>
                <VerticalStack justifyContent={'center'} sx={{ paddingBottom: '90px' }}>
                    <ErrorIcon sx={{ color: errorColor, fontSize: '30px', marginBottom: '40px' }} />
                    <SubHeaderTypography sx={{ color: errorColor, fontWeight: '800', marginBottom: '30px' }}>
                        Oops... Something went wrong.
                    </SubHeaderTypography>
                    <SubHeaderTypography sx={{ color: errorColor, fontWeight: 'bold', marginBottom: '10px' }}>
                        Please Contact Support !
                    </SubHeaderTypography>
                    <SubHeaderTypography sx={{ color: '#105270', fontSize: '1rem' }}>
                        {'(Check log for details)'}
                    </SubHeaderTypography>

                </VerticalStack>

            </CenterBox>
        </Dialog >
    )

}

export default ErrorPage;