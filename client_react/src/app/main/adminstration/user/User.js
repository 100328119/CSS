import React, {Component} from 'react';
import {withStyles, Button, Tab, Tabs, TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import axios from 'axios';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    productImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $productImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $productImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $productImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class User extends Component {

    state = {
        tabValue: 0,
        form    : null,
        new_user :false
    };

    componentDidMount()
    {
        this.updateUserState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateUserState();
        }

        if (
            (this.props.user.data && !this.state.form) ||
            (this.props.user.data && this.state.form && this.props.user.data._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }

    getAdmins =()=> {
      const request = axios.get("http://localhost:4000/api/admin")
      request.then(admins =>{
        this.setState({admins:admins.data});
      })
    }

    updateFormState = () => {
        this.setState({form: this.props.user.data})
    };

    updateUserState = () => {
        const params = this.props.match.params;
        const {userId} = params;
        this.props.getAdmins();
        if ( userId === 'new' )
        {
            this.props.newUser();
            this.setState({new_user:true})
        }
        else
        {
            this.props.getUser(this.props.match.params);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        console.log(event);
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };


    canBeSubmitted()
    {
        const {email,pd,c_pd} = this.state.form;
        // return (
        //     email.length > 0 && pd.length>0 && c_pd.length>0 &&
        //     !_.isEqual(this.props.user.data, this.state.form)
        // );
        if(this.state.new_user === "new"){
          return (
              email.length > 0 && pd.length>0 && c_pd.length>0 &&
              !_.isEqual(this.props.user.data, this.state.form)
          );
        }else{
          return (
              email.length > 0 &&
              !_.isEqual(this.props.user.data, this.state.form)
          );
        }
    }

    render()
    {
        const {classes, saveUser,save_new_user,update_user} = this.props;
        console.log(this.props);
        let admins = [];
        if(this.props.user.admins_data != null){
          admins = this.props.user.admins_data;
        }
        const {tabValue, form, new_user} = this.state;
        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    form && (
                        <div className="flex flex-1 w-full items-center justify-between">

                            <div className="flex flex-col items-start max-w-full">

                                <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/admin/users">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Users
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.user_name ? form.user_name : 'New User'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">User Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => new_user===true ? save_new_user(form):update_user(form)}
                                >
                                    Save
                                </Button>
                            </FuseAnimate>
                        </div>
                    )
                }
                contentToolbar={
                    <Tabs
                        value={tabValue}
                        onChange={this.handleChangeTab}
                        indicatorColor="secondary"
                        textColor="secondary"
                        variant="scrollable"
                        scrollButtons="auto"
                        classes={{root: "w-full h-64"}}
                    >
                        <Tab className="h-64 normal-case" label="User Info"/>
                    </Tabs>
                }
                content={
                    form && (
                      <div className="p-16 sm:p-24 max-w-2xl">
                      {tabValue === 0 &&
                      (
                          <div>
                            <div className="flex">
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="First Name"
                                  autoFocus
                                  id="first_name"
                                  name="full_name.first_name"
                                  value={form.full_name.first_name}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="Last Name"
                                  id="last_name"
                                  name="full_name.last_name"
                                  value={form.full_name.last_name}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="User Name"
                                  id="user_name"
                                  name="user_name"
                                  value={form.user_name}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                            </div>
                            <div className="flex">
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  error={form.email === ''}
                                  required
                                  label="Email"
                                  id="email"
                                  name="email"
                                  value={form.email}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                            </div>
                            <FuseChipSelect
                                className="mt-8 mb-24"
                                value={{label:form.admin.role,value:form.admin._id}}
                                options={admins.map(admin=>({
                                  value:admin,
                                  label:admin.role
                                }))}
                                name="admin"
                                onChange={(value)=>this.handleChipChange(value,"admin")}
                                placeholder="Select Admin level"
                                textFieldProps={{
                                    label          : 'Admin Type',
                                    InputLabelProps: {
                                        shrink: true
                                    },
                                    variant        : 'outlined',
                                    disabled       : false
                                }}
                            />
                            {new_user === true &&(
                              <div className="flex">
                                <TextField
                                    className="mt-8 mb-16 mr-8"
                                    error={form.pd === ''}
                                    required
                                    label="Password"
                                    type="password"
                                    autoFocus
                                    id="pd"
                                    name="pd"
                                    value={form.pd}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                                <TextField
                                    className="mt-8 mb-16 mr-8"
                                    error={form.c_pd === ''}
                                    required
                                    label="Confirm Password"
                                    type="password"
                                    id="c_pd"
                                    name="c_pd"
                                    value={form.c_pd}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                innerScroll
            />
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUser : Actions.getUser,
        newUser : Actions.newUser,
        saveUser: Actions.saveUser,
        save_new_user: Actions.save_new_user,
        update_user: Actions.update_user,
        getAdmins: Actions.getAdmins,
    }, dispatch);
}

function mapStateToProps({AdminApp})
{
    return {
        user: AdminApp.user
    }
}

export default withReducer('AdminApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(User))));
