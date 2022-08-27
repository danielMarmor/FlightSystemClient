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


export const navbarsList =(userTypeId, identityId)=>{
    switch(userTypeId){
        case userType.anonym:
            return [
                {id : 1,
                icon : <AllInclusiveIcon/>,
                url : '',
                text : 'About',
                },
                {id : 2,
                icon : <HomeIcon/>,
                text : 'Home',
                url : '/Flights'
                },
                {id : 3,
                icon : <LoginIcon/>,
                text : 'Login',
                url : '/Login'
                },
                {id : 4,
                icon : <PersonAddIcon/>,
                text : 'Sign Up',
                url : '/SignUp'
                },
                {id : 5,
                icon : <ContactMailIcon/>,
                text : 'Contact Us',
                url : ''
                },
            ]
        case userType.customer:
            return [
                {id : 1,
                icon : <AllInclusiveIcon/>,
                text : 'About',
                url : ''
                },
                {id : 2,
                icon : <HomeIcon/>,
                text : 'Home',
                url : '/'
                },
                {id : 3,
                icon : <AirplaneTicketIcon/>,
                text : 'My Tickets',
                url : ''
                },
                {id : 4,
                icon : <AccountCircleIcon/>,
                text : 'Profile',
                url : ''
                },
                {id : 5,
                icon : <LogoutIcon/>,
                text : 'Logout',
                url : ''
                },
                {id : 6,
                icon : <PersonAddIcon/>,
                text : 'Sign Up',
                url : '/SignUp'
                },
                {id :7,
                icon : <ContactMailIcon/>,
                text : 'Contact Us',
                url : ''
                },
            ]
        case userType.airline:
            return [
                {id : 1,
                icon : <AllInclusiveIcon/>,
                text : 'About',
                url : ''
                },
                {id : 2,
                icon : <HomeIcon/>,
                text : 'Home',
                url : '/Flights'
                },
                {id : 3,
                icon : <FlightTakeoffIcon/>,
                text : 'My Fligths',
                url : '/MyFlights'
                },
                {id : 4,
                icon : <AddCircleIcon/>,
                text : 'New Flight',
                url : `/NewFlight?mode=insert`
                },
                {id : 5,
                icon : <AccountCircleIcon/>,
                text : 'Profile',
                url : ''
                },
                {id : 6,
                icon : <LogoutIcon/>,
                text : 'Logout',
                url : ''
                },
                {id : 7,
                icon : <PersonAddIcon/>,
                text : 'Sign Up',
                url :  '/SignUp'
                },
                {id : 8,
                icon : <ContactMailIcon/>,
                text : 'Contact Us',
                url : ''
                },
            ]
        case userType.admin:
            return [
                {id : 1,
                icon : <AllInclusiveIcon/>,
                text : 'About',
                url : ''
                },
                {id : 2,
                icon : <HomeIcon/>,
                text : 'Home',
                url : '/'
                },
                {id : 3,
                icon : <PeopleAltIcon/>,
                text : 'Customers',
                url : ''
                },    
                {id : 4,
                    icon : <PeopleAltIcon/>,
                    text : 'My Users',
                    url : '/MyUsers'
                },
                {id : 5,
                icon : <LogoutIcon/>,
                text : 'Logout',
                url : ''
                },
                {id : 6,
                icon : <PersonAddIcon/>,
                text : 'Sign Up',
                url :  '/SignUp'
                },
                {id : 7,
                icon : <ContactMailIcon/>,
                text : 'Contact Us',
                url : ''
                },
            ]
        }
}   
        

    
    
