import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SelectUserTypeId, SelectIdentityId, clearProfile } from '../../../features/profiles/profilesSlice';
import { navbarsList } from '../../../constants/navbarList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import { useNavigate, useLocation, NavLink } from 'react-router-dom';
import { logout } from '../../../features/profiles/profilesSlice';
import './navbar.css';
//ICONS LIST


const Navbar = () => {
  const navigate = useNavigate();
  const userTypeId = useSelector(SelectUserTypeId);
  const identityId = useSelector(SelectIdentityId);

  const location = useLocation();
  const exactLocation = `${location.pathname}${location.search || ''}`;
  console.log(exactLocation);

  const [navbarItems, setNavbarItems] = useState([]);
  const dispatch = useDispatch();

  const handleClick = async (e, item) => {
    e.preventDefault();
    if (item.text == 'Logout') {
      const response = await dispatch(clearProfile({})).unwrap();
      dispatch(logout());
      navigate('/Login')
    }
  }
  const isLocationMatch = (urls) => {
    const matchUrl = urls.find(url => exactLocation.startsWith(url));
    return matchUrl;
  }
  useEffect(() => {
    const userTypeItems = navbarsList(userTypeId, identityId);
    setNavbarItems(userTypeItems);
  }, [userTypeId, location]);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {navbarItems.map((item) =>
          <ListItem key={item.id} disablePadding>
            <ListItemButton component="button" onClick={(e) => handleClick(e, item)}
              sx={{
                backgroundColor: isLocationMatch(item.urlList) ? '#9ae66c' : '#15291b'
              }}>
              <NavLink to={item.url}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: 0,
                  margin: 0,
                  textDecoration: 'none'
                }}>
                <ListItemIcon sx={{ color: 'White' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text}
                  sx={{
                    color: isLocationMatch(item.urlList) ? 'black' : 'white',
                  }} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

export default Navbar
