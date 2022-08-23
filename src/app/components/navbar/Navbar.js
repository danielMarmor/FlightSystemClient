import React from 'react'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { SelectUserTypeId, SelectIdentityId } from '../../../features/profiles/profilesSlice';
import { navbarsList } from '../../../constants/navbarList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import { useNavigate, NavLink } from 'react-router-dom';
import './navbar.css';
//ICONS LIST


const Navbar = () => {
  const navigate = useNavigate();
  const userTypeId = useSelector(SelectUserTypeId);
  const identityId = useSelector(SelectIdentityId);

  const [navbarItems, setNavbarItems] = useState([]);

  useEffect(() => {
    const userTypeItems = navbarsList(userTypeId, identityId);
    setNavbarItems(userTypeItems);
  }, [userTypeId]);

  return (
    <Box sx={{ overflow: 'auto' }}>
      <List>
        {navbarItems.map((item) =>
          <ListItem key={item.id} disablePadding>
            <ListItemButton component="button">
              <NavLink to={item.url} style={{display:'flex', alignItems: 'center', padding :0, margin :0}}>
                <ListItemIcon sx={{ color: 'White' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              </NavLink>
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Box>
  )
}

export default Navbar
