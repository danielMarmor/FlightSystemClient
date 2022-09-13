import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { CenterBox } from '../FormStyles';

const CircularIndeterminate=()=>{
  return (
    <CenterBox>
      <CircularProgress size={175} />
    </CenterBox>
  );
}

export default CircularIndeterminate;