import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import { Link, withRouter } from "react-router-dom";
// Material-UI
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';

// Icons
import DashboardIcon from '@material-ui/icons/Dashboard';
import ProjectsIcon from '@material-ui/icons/Assignment';
import AccountIcon from '@material-ui/icons/AccountBox';
import SignInIcon from '@material-ui/icons/Face';

import { connect } from 'react-redux';
import * as actions from '../actions';
import { pageNavListItems } from './tileData';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'auto',
    position: 'relative',
    display: 'flex',
    width: '100%',
  },
  appBar: {
    position: 'fixed',
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    backgroundColor: '#1976D2',
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    height: '100vh',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
  drawerHeader: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: '0 30px',
    ...theme.mixins.toolbar,
  },
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
  }

  signOut() {
    this.props.signOut();
    this.props.history.push('/Homepage');
  }

  state = {
    mobileOpen: false,
    open: true,
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  render() {
    const { classes, title, content } = this.props;
    const { mobileOpen } = this.state;

    const drawer = (
      <div>
        <div className={classes.drawerHeader}>
          <div style={{ fontSize: '16pt', fontWeight: 'bold', }}>CSS</div>
          <div style={{ fontSize: '10pt', }}>v1.0.0</div>
        </div>
        <Divider />
          <List onClick={this.handleClick}>{pageNavListItems}</List>
        <Divider />
        <List onClick={this.handleClick}>
        { !this.props.isAuth ?
            [<Link to="/SignUp" key="signup">
              <ListItem button>
                <ListItemIcon>
                  <SignInIcon />
                </ListItemIcon>
                <ListItemText primary="Sign Up" />
              </ListItem>
            </Link>,
            <Link to="/Login" key="login">
              <ListItem button>
                <ListItemIcon>
                  <SignInIcon />
                </ListItemIcon>
                <ListItemText primary="Sign In" />
              </ListItem>
            </ Link>]:null}
          { this.props.isAuth ?
            <Link to='/signout' key="logout" onClick={this.signOut}>
              <ListItem button>
                <ListItemIcon>
                  <SignInIcon />
                </ListItemIcon>
                <ListItemText primary="Log Out" />
              </ListItem>
            </Link> : null}
        </List>
      </div>
    )

    return (
      <div className={classes.root}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='Open drawer'
              onClick={this.handleDrawerToggle}
              className={classes.navIconHide}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant='h6' color='inherit' noWrap>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            variant='temporary'
            anchor='left'
            open={mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
         <Hidden smDown implementation="css">
          <Drawer
            variant='permanent'
            open
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {content()}
        </main>
      </div>
    );
  }

  // after click a list item, close the drawer
  handleClick = () => {
    this.setState({ mobileOpen: false });
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuthenticated
  };
}

const DeshboardStyles = withStyles(styles, { withTheme: true })(Dashboard);

export default connect(mapStateToProps, actions)(withRouter(DeshboardStyles));
