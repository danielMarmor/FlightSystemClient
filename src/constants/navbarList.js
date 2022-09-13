import { userType } from "./enums"
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AirlinesIcon from '@mui/icons-material/Airlines';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';


export const navbarsList = (userTypeId, identityId) => {
    switch (userTypeId) {
        case userType.anonym:
            return [
                {
                    id: 1,
                    icon: <AllInclusiveIcon />,
                    url: '',
                    urlList: [],
                    text: 'About',
                },
                {
                    id: 2,
                    icon: <HomeIcon />,
                    url: '/Flights',
                    urlList: ['/Flights'],
                    text: 'Home'
                },
                {
                    id: 3,
                    icon: <LoginIcon />,
                    text: 'Login',
                    urlList: ['/Login'],
                    url: '/Login'
                },
                {
                    id: 4,
                    icon: <PersonAddIcon />,
                    text: 'Sign Up',
                    urlList: ['/SignUp'],
                    url: '/SignUp'
                },
                {
                    id: 5,
                    icon: <ContactMailIcon />,
                    text: 'Contact Us',
                    urlList: [],
                    url: ''
                },
            ]
        case userType.customer:
            return [
                {
                    id: 1,
                    icon: <AllInclusiveIcon />,
                    text: 'About',
                    urlList: [],
                    url: ''
                },
                {
                    id: 2,
                    icon: <HomeIcon />,
                    text: 'Home',
                    urlList: ['/Flights', '/Ticket/Order', '/Ticket/Pay'],
                    url: '/Flights'
                },
                {
                    id: 3,
                    icon: <AirplaneTicketIcon />,
                    text: 'My Tickets',
                    urlList: ['/MyTickets', '/Ticket/Details'],
                    url: '/MyTickets'
                },
                {
                    id: 4,
                    icon: <AccountCircleIcon />,
                    text: 'Profile',
                    urlList: ['/Profile'],    
                    url: `/Profile/Customer/Details/${identityId}`
                },
                {
                    id: 5,
                    icon: <LogoutIcon />,
                    text: 'Logout',
                    urlList: [],   
                    url: ''
                },
                {
                    id: 6,
                    icon: <PersonAddIcon />,
                    text: 'Sign Up',
                    urlList: ['/SignUp'],  
                    url: '/SignUp'
                },
                {
                    id: 7,
                    icon: <ContactMailIcon />,
                    urlList: [],  
                    url: '',
                    text: 'Contact Us',
                   
                },
            ]
        case userType.airline:
            return [
                {
                    id: 1,
                    icon: <AllInclusiveIcon />,
                    text: 'About',
                    urlList: [],  
                    url: ''
                },
                {
                    id: 2,
                    icon: <HomeIcon />,
                    text: 'Home',
                    urlList: ['/Flights'],  
                    url: '/Flights'
                },
                {
                    id: 3,
                    icon: <FlightTakeoffIcon />,
                    text: 'My Fligths',
                    urlList: ['/MyFlights', '/NewFlight?mode=edit'],  
                    url: '/MyFlights'
                },
                {
                    id: 4,
                    icon: <AddCircleIcon />,
                    text: 'New Flight',
                    urlList: ['/NewFlight?mode=insert'],  
                    url: `/NewFlight?mode=insert`
                },
                {
                    id: 5,
                    icon: <AccountCircleIcon />,
                    text: 'Profile',
                    urlList: ['/Profile'],  
                    url: `/Profile/Airline/Details/${identityId}`
                },
                {
                    id: 6,
                    icon: <LogoutIcon />,
                    text: 'Logout',
                    urlList: [],  
                    url: ''
                },
                {
                    id: 7,
                    icon: <PersonAddIcon />,
                    text: 'Sign Up',
                    urlList: ['/SignUp'],  
                    url: '/SignUp'
                },
                {
                    id: 8,
                    icon: <ContactMailIcon />,
                    text: 'Contact Us',
                    urlList: [],  
                    url: ''
                },
            ]
        case userType.admin:
            return [
                {
                    id: 1,
                    icon: <AllInclusiveIcon />,
                    text: 'About',
                    urlList: [],  
                    url: ''
                },
                {
                    id: 2,
                    icon: <HomeIcon />,
                    text: 'Home',
                    urlList: ['/Flights'],  
                    url: '/Flights'
                },
                {
                    id: 3,
                    icon: <PeopleAltIcon />,
                    text: 'My Users',
                    urlList: ['/MyUsers'],  
                    url: '/MyUsers'
                },
                {
                    id: 4,
                    icon: <AccountCircleIcon />,
                    text: 'Profile',
                    urlList: ['/Profile'],  
                    url: `/Profile/Admin/Details/${identityId}`
                },
                {
                    id: 5,
                    icon: <DashboardCustomizeIcon />,
                    text: 'Dashboard',
                    urlList: ['/Dashboard'],  
                    url: `/Dashboard`
                },
                {
                    id: 6,
                    icon: <LogoutIcon />,
                    text: 'Logout',
                    urlList: [],  
                    url: ''
                },
                {
                    id: 7,
                    icon: <PersonAddIcon />,
                    text: 'Sign Up',
                    urlList: ['/SignUp'],  
                    url: '/SignUp'
                },
                {
                    id: 8,
                    icon: <ContactMailIcon />,
                    text: 'Contact Us',
                    urlList: [],  
                    url: ''
                },
            ]
    }
}




