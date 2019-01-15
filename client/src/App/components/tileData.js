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
    <Link to="/test">
      <ListItem button>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Test" />
      </ListItem>
    </Link>
    <Link to="/test2">
      <ListItem button>
        <ListItemIcon>
          <AccountIcon />
        </ListItemIcon>
        <ListItemText primary="Test 2" />
      </ListItem>
    </Link>
  </div>
);

export const otherPageNavListItems = (
  <div>
  <Link to="/SignUp">
    <ListItem button>
      <ListItemIcon>
        <SignInIcon />
      </ListItemIcon>
      <ListItemText primary="Sign Up" />
    </ListItem>
  </Link>
  <Link to="/Login">
    <ListItem button>
      <ListItemIcon>
        <SignInIcon />
      </ListItemIcon>
      <ListItemText primary="Sign In" />
    </ListItem>
  </Link>
  <Link to="/Logout">
    <ListItem button>
      <ListItemIcon>
        <SignInIcon />
      </ListItemIcon>
      <ListItemText primary="Log Out" />
    </ListItem>
  </Link>
  </div>
);

// <ListItem button>
//   <ListItemIcon>
//     <SignInIcon />
//   </ListItemIcon>
//   <ListItemText primary="Sign In" />
// </ListItem>
