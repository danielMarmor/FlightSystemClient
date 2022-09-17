
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import logo from '../../../assets/logo.png'
import firenxe from '../../../assets/firenxe.jpg'
import flights4 from '../../../assets/flights4.jpg';
import Typography from "@mui/material/Typography";
import { styled } from "@mui/system";
import Navbar from '../navbar/Navbar';
import { HorizonStack } from "../FormStyles";
import Greeting from "../Greeting";

export const layoutVerticalMarginVh = 0.75;
export const layoutHorizontalMarginVw = 0.5;

export const getWindowSize = () => {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
const getCalculatedDrawerWidth = () => {
  const proportion = 0.175;
  const drawerWidth = Math.round(proportion * getWindowSize().innerWidth);
  return drawerWidth;
}
export const drawerWidth = getCalculatedDrawerWidth();
export const appBarHeight = 70;

const LayoutBox = styled(Box)(({ theme }) => ({
  width: `${100 - (layoutHorizontalMarginVw * 2)}vw`,
  height: `${100 - (layoutVerticalMarginVh * 2)}vh`,
  minWidth: `${100 - (layoutHorizontalMarginVw * 2)}vw`,
  minheight: `${100 - (layoutVerticalMarginVh * 2)}vh`,
  margin: `${layoutVerticalMarginVh}vh auto`,
  display: 'flex',
  backgroundColor: 'inherit',
  border: '2px solid #15291b',
  borderRadius: 0,
}));

const ApplicationBar = styled(AppBar)(({ theme }) => ({
  width: '99vw',
  minWidth: 'calc(99vw - 0px)',
  left: 0,
  top: '0.75vh',
  backgroundColor: '#15291b',
  margin: 'auto',
  display: 'fixed',
  height: appBarHeight,
  zIndex: (theme) => theme.zIndex.drawer + 1,
}));

const AppDrawer = styled(Drawer)(({ theme }) => ({
  backgroundColor: '#15291b',
  position: 'fixed',
  width: drawerWidth,
  minWidth: drawerWidth,
  height: '98.5vh',
  minheight: 'calc(98.5vh - 0px)',
  left: '0.5vw',
  top: '0.75vh',
  margin: 'auto'
}));

const Layout = ({ children }) => {
  return (
    <LayoutBox>
      <ApplicationBar>
        <Toolbar sx={{ height: appBarHeight, padding: '0 !important' }}>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            width: drawerWidth,
            height: '100%',
            backgroundColor: '#4f5b61',
            border: '2px solid #15291b'
          }}>
            <img className='imgLogo' src={logo} />

          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: getWindowSize().innerWidth - drawerWidth - 50,
            height: '100%',
            backgroundColor: '#15291b',
            paddingLeft: '5px'
          }}>
            <HorizonStack sx={{ width: '100%' }}
            >
              <Typography variant="h4" component="div"
                sx={{ width: 0.4 }}
              >
                Flight Servix
              </Typography>
              <Greeting />
            </HorizonStack>
          </Box>
        </Toolbar>
      </ApplicationBar>
      <AppDrawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: '#15291b',
            left: '0.5vw',
            top: '0.75vh',
            height: '98.5vh',
            minheight: 'calc(98.5vh - 0px)',

          }
        }}>

        <Toolbar />
        <Navbar />
      </AppDrawer>
      <Box component="main" sx={{
        flexGrow: 1,
        p: 3,
        display: 'flex',
        paddingTop: `${appBarHeight}px`,
        paddingLeft: `${drawerWidth}px`,
        paddingRight: '0px',
        paddingBottom: '0px',
        boxSizing: 'border-box',
        width: '100% !important',
        height: '100% !important'
      }}

      >
        <Box name="contentBox" sx={{
          display: 'flex',
          width: '100% !important',
          height: '100% !important',
          boxSizing: 'border-box',
          backgroundImage: `url(${firenxe})`,
          backgroundSize: 'cover',
          //background-image: url("img_tree.gif"), url("paper.gif");
          backgroundRepeat: 'no-repeat'
        }}
        >
          {children}
        </Box>
      </Box>
    </LayoutBox>
  )
}

export default Layout;