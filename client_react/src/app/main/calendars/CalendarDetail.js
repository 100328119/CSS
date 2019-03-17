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

import * as Department_Actions from '../departments/store/actions';
import * as Semester_Actions from '../semester/store/actions';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    calendarImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    calendarImageItem        : {
        transitionProperty      : 'box-shadow',
        transitionDuration      : theme.transitions.duration.short,
        transitionTimingFunction: theme.transitions.easing.easeInOut,
        '&:hover'               : {
            boxShadow                    : theme.shadows[5],
            '& $calendarImageFeaturedStar': {
                opacity: .8
            }
        },
        '&.featured'            : {
            pointerEvents                      : 'none',
            boxShadow                          : theme.shadows[3],
            '& $calendarImageFeaturedStar'      : {
                opacity: 1
            },
            '&:hover $calendarImageFeaturedStar': {
                opacity: 1
            }
        }
    }
});

class CalendarDetail extends Component {

    state = {
        tabValue: 0,
        form    : null,
        new_calendar: false,
        calendar_status:['In Progress', 'Completed']
    };

    componentDidMount()
    {
        this.updateCalendarState();
        this.props.getSemester();
        this.props.getDepartmentsOrignal();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateCalendarState();
        }

        if (
            (this.props.calendar && !this.state.form) ||
            (this.props.calendar && this.state.form && this.props.calendar._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
    }

    updateFormState = () => {
        this.setState({form: this.props.calendar})
    };

    updateCalendarState = () => {
        const params = this.props.match.params;
        const calendarId = params.id;

        if ( calendarId === 'new' )
        {
            this.props.newCalendar();
            this.setState({new_calendar: true})
        }
        else
        {
            this.props.getCalender(calendarId);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        // this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    canBeSubmitted()
    {
        const {semester,department} = this.state.form;
        return (
            semester ===''&& department===''
            // !_.isEqual(this.props.calendar, this.state.form)
        );
    }

    render()
    {
        console.log(this.props);
        const {classes,saveCalendar,updateCalendar,current_user} = this.props;
        const {tabValue, form} = this.state;
        let departments = [];
        if(this.props.departments != null){
          departments = this.props.departments;
        }

        let semesters = [];
        if(this.props.semesters != null){
          semesters = this.props.semesters;
        }

        return (
            <FusePageCarded
                classes={{
                    toolbar: "p-0",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header = {
                  form && (
                  <div className="flex flex-1 w-full items-center justify-between">

                      <div className="flex flex-col items-start max-w-full">
                        <FuseAnimate animation="transition.slideRightIn" delay={300}>
                            <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/">
                                <Icon className="mr-4 text-20">arrow_back</Icon>
                                Calendars
                            </Typography>
                        </FuseAnimate>
                        <div className="flex items-center max-w-full">
                          <div className="flex flex-col min-w-0">
                              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                  <Typography className="text-16 sm:text-20 truncate">
                                        {form.semester.year? form.semester.season+"/"+form.semester.year: 'New Calendar'}
                                  </Typography>
                              </FuseAnimate>
                              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                  <Typography variant="caption">Calendar Detail</Typography>
                              </FuseAnimate>
                          </div>
                        </div>
                      </div>
                      <FuseAnimate animation="transition.slideRightIn" delay={300}>
                          <Button
                              className="whitespace-no-wrap"
                              variant="contained"
                              disabled={this.canBeSubmitted()}
                              onClick={() => this.state.new_calendar ? saveCalendar(form,current_user.uuid):updateCalendar(form)}
                          >
                              {this.state.new_calendar ? 'Create':'Update'}
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
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        <Tab className="h-64 normal-case" label="Owner Info"/>

                    </Tabs>
                }
                content={
                  form && (
                        <div className="p-16 sm:p-24 max-w-2xl">
                            {tabValue === 0 &&
                            (
                                <div>
                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={{label:form.semester.season +' '+ form.semester.year, value:form.semester._id}}
                                        onChange={(value) => this.handleChipChange(value, 'semester')}
                                        options={semesters.map(semester=>({
                                          value:semester,
                                          label:semester.season+" "+semester.year
                                        }))}
                                        placeholder="Select Semester"
                                        textFieldProps={{
                                            label          : 'Semester',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={{label:form.department.department_name,value:form.department._id}}
                                        options={departments.map(department=>({
                                          value:department,
                                          label:department.department_name
                                        }))}

                                        onChange={(value)=>this.handleChipChange(value,"department")}
                                        placeholder="Select department"
                                        disable="true"
                                        textFieldProps={{
                                            label          : 'Department',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                    />

                                    <FuseChipSelect
                                        className="mt-8 mb-24"
                                        value={{label:form.calendar_status,value:form.calendar_status}}
                                        options={this.state.calendar_status.map(calendar_status=>({
                                          value:calendar_status,
                                          label:calendar_status
                                        }))}
                                        name="calendar_status"
                                        onChange={(value)=>this.handleChipChange(value,"calendar_status")}
                                        placeholder="Select Calendar Status"
                                        textFieldProps={{
                                            label          : 'Calendar Status',
                                            InputLabelProps: {
                                                shrink: true
                                            },
                                            variant        : 'outlined'
                                        }}
                                    />
                                </div>
                            )}
                            {tabValue === 1 &&
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
                                        value={form.owner.full_name.first_name}
                                        // onChange={this.handleChange}
                                        disable={true}
                                        variant="outlined"
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        required
                                        label="Last Name"
                                        id="last_name"
                                        name="full_name.last_name"
                                        value={form.owner.full_name.last_name}
                                        // onChange={this.handleChange}
                                        disable={true}
                                        variant="outlined"
                                        fullWidth
                                    />

                                  </div>
                                  <div className="flex">
                                    <TextField
                                        className="mt-8 mb-16 mr-8"
                                        required
                                        label="User Name"
                                        id="user_name"
                                        name="user_name"
                                        value={form.owner.user_name}
                                        // onChange={this.handleChange}
                                        disable={true}
                                        variant="outlined"
                                        fullWidth
                                    />
                                  </div>
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
        newCalendar : Actions.newCalendar,
        getCalender : Actions.getCalender,
        saveCalendar: Actions.saveCalendar,
        updateCalendar: Actions.updateCalendar,
        getDepartmentsOrignal : Department_Actions.getDepartmentsOrignal,
        getSemester: Semester_Actions.getSemester
    }, dispatch);
}

function mapStateToProps({CalendarsApp_Pro,DepartmentApp,SemesterApp,auth})
{
    return {
        calendar: CalendarsApp_Pro.calendar.calendar_data,
        departments: DepartmentApp.departments.entities,
        semesters : SemesterApp.semester.data,
        current_user: auth.user
    }
}

export default withReducer('CalendarsApp_Pro', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CalendarDetail))));
