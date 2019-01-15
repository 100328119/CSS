import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import classNames from 'classnames';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import withStyles from '@material-ui/core/styles/withStyles';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from '../actions';
import { withRouter } from "react-router-dom";

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
};

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  success: {
   backgroundColor: green[600],
 },
 error: {
   backgroundColor: theme.palette.error.dark,
 },
 info: {
   backgroundColor: theme.palette.primary.dark,
 },
 warning: {
   backgroundColor: amber[700],
 },
 icon: {
   fontSize: 20,
 },
 iconVariant: {
   opacity: 0.9,
   marginRight: theme.spacing.unit,
 },
 message: {
   display: 'flex',
   alignItems: 'center',
 },
});

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <Input
    {...input}
    {...custom}
  />
);

function MySnackbarContent(props) {
  const { classes, className, message, onClose, variant, ...other } = props;
  const Icon = variantIcon[variant];

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          className={classes.close}
          onClick={onClose}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>,
      ]}
      {...other}
    />
  );
}

MySnackbarContent.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  message: PropTypes.node,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(FormData){
    // call action creator
    await this.props.signUp(FormData);
    if(!this.props.errorMessage){
      this.props.history.push('/');
    }
  }
  render(){
    const { classes, handleSubmit } = this.props;
    return (
      <main className={classes.main} >
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(this.onSubmitForm)}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="Username">User Name</InputLabel>
            <Field component={renderTextField} id="user_name" name="user_name" autoComplete="user_name" autoFocus />
          </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Field component={renderTextField} id="email" name="email" autoComplete="email"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Field component={renderTextField} name="password" type="password" id="passowrd" autoComplete="current-password" />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="Confirmpassword">Confirm Password</InputLabel>
              <Field component={renderTextField} name="Confirmpassword" type="password" id="Confirmpassword"  autoComplete="current-password" />
            </FormControl>
            { this.props.errorMessage ?
              <MySnackbarContentWrapper
                variant="error"
                className={classes.margin}
                message="This is an error message!"
              />:null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state){
  return{
    errorMessage: state.auth.errorMessage
  }
}
const StylesWraper = withStyles(styles)(SignUp);

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({form: 'signup'})
)(withRouter(StylesWraper));
