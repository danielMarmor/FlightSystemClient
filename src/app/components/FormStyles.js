import { styled } from "@mui/system";
import { TextField, Button } from "@mui/material";
import Box from "@mui/material/Box";
import Autocomplete from '@mui/material/Autocomplete';

const primaryColor = '#15291b';

export const FormFrameBox =  styled(Box)(({ theme }) =>({
    width : '100%',
    height : '100%',
    display : 'flex',
    justifyContent :'space-around',
    alignItems :'center',
    padding: '10px',
    margin : 0,
    border : `4px solid ${primaryColor}`,
    borderRadius : '4px',
    backgroundColor :theme.palette.background.default
}));

export const FormTextField =  styled(TextField)(({ theme }) =>({
    width : '100%',
    boxSizing:'border-box',
    borderColor : primaryColor,
}));


export const ShortFormTextField =  styled(TextField)(({ theme }) =>({
    width : '50%',
    boxSizing:'border-box',
    borderColor : primaryColor,
}));

export const FormBox =  styled(Box)(({ theme }) =>({
    width : '100%',
    height : '100%',
    display : 'flex',
    flexDirection :'column',  
    boxSizing : 'border-box',
}));

// 2 X 7
export const FormBoxGrid =  styled(Box)(({ theme }) =>({
    width : '100%',
    display : 'grid',
    gridTemplateColumns : 'auto auto',
    gridTemplateRows :'auto auto auto auto auto',
    gridRowGap : '30px',
    gridColumnGap: '20px',  
    alignContent : 'space-between'
}));

export const FormButton =  styled(Button)(({ theme }) =>({
    width : '100%',
    height : '32px',
    backgroundColor: '#C00000 !important'
}));


export const FormCancelButton =  styled(Button)(({ theme }) =>({
    width : '100%',
    height : '32px',
    backgroundColor: '#C00000 !important'
}));

export const AutoCompleteBox = styled(Autocomplete)`
  & .MuiInputBase-input {
    height: 0.4rem;
  }
`;
export const ColumnFlexBox =  styled(Box)(({ theme }) =>({
    width : '100%',
    height : '100%',
    display : 'flex',
    flexDirection : 'column',
    justifyContent : 'space-around',
    alignItems : 'center',
    boxSizing : 'border-box'
}));


export const RowFlexBox =  styled(Box)(({ theme }) =>({
    width : '100%',
    height : '100%',
    display : 'flex',
    flexDirection : 'row',
    justifyContent : 'space-around',
    alignItems : 'center',
    boxSizing : 'border-box'
}));
