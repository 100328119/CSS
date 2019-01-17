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
import withStyles from '@material-ui/core/styles/withStyles';
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from "react-router-dom";

import Snackbar from "./snackbar";
import * as actions from '../actions';

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
});

const renderTextField = (
  { input, label, meta: { touched, error }, ...custom },
) => (
  <Input
    {...input}
    {...custom}
  />
);

class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  async onSubmitForm(FormData){
    // call action creator
    await this.props.signUp(FormData);
    if(!this.props.errorMessage){
      this.props.history.push('/about');
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
              <Snackbar
                variant="error"
                className={classes.margin}
                message={this.props.errorMessage}
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
