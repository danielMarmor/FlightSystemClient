import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        style={{flexGrow: 1}}
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box height={'100%'}>
           {children}
          </Box>
        )}
      </div>
    );
  }

  export default TabPanel;