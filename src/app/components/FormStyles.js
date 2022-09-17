import { styled } from "@mui/system";
import { TextField, Button, InputAdornment } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';

export const FormFrameBoxPadding = 10;
export const primaryColor = '#15291b';

export const FormFrameBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: `${FormFrameBoxPadding}px`,
    margin: 0,
    border: `4px solid ${primaryColor}`,
    borderRadius: '4px',
    backgroundColor: theme.palette.background.default
}));

export const FormTextField = styled(TextField)(({ theme }) => ({
    width: '100%',
    boxSizing: 'border-box',
    borderColor: primaryColor,
}));


export const ShortFormTextField = styled(TextField)(({ theme }) => ({
    width: '50%',
    boxSizing: 'border-box',
    borderColor: primaryColor,
}));

export const FormBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
}));

// 2 X 7
export const FormBoxGrid = styled(Box)(({ theme }) => ({
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto auto',
    gridTemplateRows: 'auto auto auto auto auto',
    gridRowGap: '30px',
    gridColumnGap: '20px',
    alignContent: 'space-between'
}));

export const FormButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '32px',
    backgroundColor: '#C00000 !important'
}));


export const FormCancelButton = styled(Button)(({ theme }) => ({
    width: '100%',
    height: '32px',
    backgroundColor: '#C00000 !important'
}));

export const AutoCompleteBox = styled(Autocomplete)`
  & .MuiInputBase-input {
    height: 0.4rem;
  }
`;
export const ColumnFlexBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxSizing: 'border-box'
}));


export const RowFlexBox = styled(Box)(({ theme }) => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    boxSizing: 'border-box'
}));

export const SubHeaderTypography = ({ children, ...props }) => {
    return (<Typography
        variant="h6"
        component="div"
        color={'white'}
        {...props}
    >
        {children}
    </Typography>)

}


export const PrimaryTextTypography = ({ children, ...props }) => {
    return (<Typography
        variant="body1"
        component="div"
        fontWeight={'bold'}
        fontSize={'1.1rem'}
        sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textAlign: 'left'
        }}
        {...props}
    >
        {children}
    </Typography>)

}
export const SecTextTypography = ({ children, ...props }) => {
    return (<Typography
        variant="body2"
        component="div"
        textAlign={'left'}
        fontSize={'1.1rem'}
        sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden'
        }}
        {...props}
    >
        {children}
    </Typography>)

}

export const HorizonStack = ({ children, ...props }) => {
    return (<Stack
        width={'100%'}
        height={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        {...props}
    >
        {children}
    </Stack>)
}

export const VerticalStack = ({ children, ...props }) => {
    return (<Stack
        width={'100%'}
        height={'100%'}
        direction={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        {...props}
    >
        {children}
    </Stack>)
}


export const LeftCenterBox = ({ children, ...props }) => {
    return (<Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-around'}
        alignItems={'flex-start'}
        {...props}
    >
        {children}
    </Box>)
}

export const CenterBox = ({ children, ...props }) => {
    return (<Box
        width={'100%'}
        height={'100%'}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        {...props}
    >
        {children}
    </Box>)
}

export const IconStack = ({ icon, label, value, proportions }) => {
    //PRORPRTIONS
    const flexIcon = proportions[0];
    const flexLabel = proportions[1];
    const flexValue = proportions[2];
    //STACK
    return (<HorizonStack>
        <LeftCenterBox
            flex={flexIcon}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }}
        >{icon}
        </LeftCenterBox>
        <LeftCenterBox
            flex={flexLabel}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }}
        >{label}
        </LeftCenterBox>
        <LeftCenterBox
            flex={flexValue}
            sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden'
            }}>
            {value}
        </LeftCenterBox>
    </HorizonStack >)
}

export const IconTextBox = ({
    children,
    name,
    label,
    details,
    icon,
    handleChange,
    validation,
    readOnly,
    ...props
}) => {

    let req, maxLength, type, mask;
    if (validation) {
        req = validation.required;
        maxLength = validation.maxLength;
        type = validation.type;
        mask = validation.mask;
    }
    return (<TextField
        width={'100%'}
        required={req}
        name={name}
        size="small"
        label={label}
        helperText=""
        value={details[name] || ''}
        onChange={handleChange}
        inputProps={{ maxLength: maxLength }}
        InputProps={{
            readOnly : readOnly || false,
            fontSize: '0.8rem',
            type: type,
            startAdornment: <InputAdornment position="start">
                {icon}
            </InputAdornment>
        }}
        sx={{
            boxSizing: 'border-box',
            borderColor: primaryColor,
            '& .MuiFormLabel-root': {
                color: primaryColor,
                fontWeight: '700'
            }
        }}

        {...props}
    >
        {children}
    </TextField>
    )
}

export const DatePickerStyle = {
    "& .MuiPaper-root": {
        backgroundColor: "white",
        border: '4px solid #15291b',
        borderRadius: '4px'
    },
    "& .MuiCalendarPicker-root": {
        backgroundColor: 'white'
    },
    "& .MuiPickersDay-dayWithMargin": {
        color: "white",
        backgroundColor: '#15291b',
        borderRadius: '0px'
    },
    "& .MuiPickersDay-dayWithMargin:hover": {
        color: '#C00000',
        fontWeight: '700',
        backgroundColor: '#f5c242',
        borderRadius: '0px'
    },
    "& .MuiTabs-root": { backgroundColor: "rgba(120, 120, 120, 0.4)" },
    "& .MuiTypography-root": {
        height: '24px',
        backgroundColor: '#f5c242',
        marginBottom: '5px',
        fontWeight: '800',
        color: '#C00000'
    }
}

