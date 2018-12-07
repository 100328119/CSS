import React from 'react';
import { Link } from "react-router-dom";

// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Assignment';
import AccountIcon from '@material-ui/icons/AccountBox';
import SignInIcon from '@material-ui/icons/Face';

export const pageNavListItems = (
  <div>
    <Link to='/'>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Homepage" />
      </ListItem>
    </Link>
    <Link to='/about'>
      <ListItem button>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
  </div>
);

export const otherPageNavListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <SignInIcon />
      </ListItemIcon>
      <ListItemText primary="Sign In" />
    </ListItem>
  </div>
);