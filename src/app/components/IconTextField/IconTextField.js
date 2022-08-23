import React from 'react'
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material';

export const IconTextField = ({iconStart, iconEnd, InputProps, ...props}) => {
  return (
    <TextField
        {...props}
        InputProps={{
            ...InputProps,
            startAdornment :iconStart ?
            (<InputAdornment position="start">iconStart</InputAdornment>) : null,
            endAdornment :iconEnd ?
            (<InputAdornment position="end">iconEnd</InputAdornment>) : null
        }}
        >
    </TextField>
  )
}


