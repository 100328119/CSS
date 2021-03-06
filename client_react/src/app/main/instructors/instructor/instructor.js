import React, {Component} from 'react';
import {withStyles, Button, Tab, IconButton, Tabs, Fab,TextField, InputAdornment, Icon, Typography} from '@material-ui/core';
import {FuseAnimate, FusePageCarded, FuseChipSelect,FusePageSimple} from '@fuse';
import {orange} from '@material-ui/core/colors';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import ReactTable from "react-table";
import withReducer from 'app/store/withReducer';

import * as Actions from '../store/actions';
import * as DepartActions from '../../departments/store/actions';
import reducer from '../store/reducers';
import axios from 'axios';
import VettedCourseDialog from './VettedCourseDialog';

const styles = theme => ({
    productImageFeaturedStar: {
        position: 'absolute',
        top     : 0,
        right   : 0,
        color   : orange[400],
        opacity : 0
    },
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
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

class Instructor extends Component {

    // state = {
    //     tabValue: 0,
    //     form    : null,
    //     new_instructor :false,
    //     professor_type:[
    //       "Full Time Regular",
    //       "NR2",
    //       "NR1"
    //     ]
    // };
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
          tabValue: 0,
          form    : null,
          new_instructor :false,
          professor_type:[
            "Full Time Regular",
            "NR2",
            "NR1"
          ]
      };
      this.props.getDepartmentsOrignal();
    }

    componentDidMount()
    {

        this.updateInstructorState();
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.updateInstructorState();
        }

        if (
            (this.props.instructor && !this.state.form) ||
            (this.props.instructor && this.state.form && this.props.instructor._id !== this.state.form._id)
        )
        {
            this.updateFormState();
        }
        if(!_.isEqual(this.props.vetted_course_update, prevProps.vetted_course_update) ){
          this.updateFormState();
        }
    }


    updateFormState = () => {
        this.setState({form: this.props.instructor})
    };

    updateInstructorState = () => {
        const params = this.props.match.params;
        const instructor_id = params.id;
        if ( instructor_id === 'new' )
        {
            this.props.newInstructor();
            this.setState({new_instructor:true})
        }
        else
        {
            this.props.getInstructor(instructor_id);
        }
    };

    handleChangeTab = (event, tabValue) => {
        this.setState({tabValue});
    };

    handleChange = (event) => {
        this.setState({form: _.set({...this.state.form}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)});
    };

    handleChipChange = (value, name) => {
        this.setState({form: _.set({...this.state.form}, name, value.value)});
    };

    handleVettedCourseChange = (value,name) =>{
      this.setState({form: _.set({...this.state.form}, name, value.map(item => item.value))});
    }


    canBeSubmitted()
    {
        const {prof_id} = this.state.form;
        if(this.state.new_instructor === true){
          return (
              prof_id.length > 0 &&
              !_.isEqual(this.props.instructor, this.state.form)
          );
        }else{
          return (
              !_.isEqual(this.props.instructor, this.state.form)
          );
        }
    }

    render()
    {
        const {classes,addInstructor,editInstructor,openNewVetCourseDialog,removeVetCourse,openEditVetCourseDialog} = this.props;
        let department = [];
        if(this.props.department != null){
          department = this.props.department;
          console.log(department);
        }

        const {tabValue, form, new_instructor} = this.state;

        let courses = [];
        if(this.props.course_by_department == null && form !== null){
          // console.log(form.department_course);
          courses = form.department_course;
        }else if(this.props.course_by_department !== null){
          courses = this.props.course_by_department;
        }
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
                                    <Typography className="normal-case flex items-center sm:mb-12" component={Link} role="button" to="/instructors">
                                        <Icon className="mr-4 text-20">arrow_back</Icon>
                                        Instructors
                                    </Typography>
                                </FuseAnimate>

                                <div className="flex items-center max-w-full">
                                    <FuseAnimate animation="transition.expandIn" delay={300}>
                                        <img className="w-32 sm:w-48 mr-8 sm:mr-16 rounded" src="assets/images/ecommerce/product-image-placeholder.png" alt={form.name}/>
                                    </FuseAnimate>
                                    <div className="flex flex-col min-w-0">
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography className="text-16 sm:text-20 truncate">
                                                {form.first_name ? form.first_name + " " +form.last_name: 'New Instructor'}
                                            </Typography>
                                        </FuseAnimate>
                                        <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                                            <Typography variant="caption">Instructor Detail</Typography>
                                        </FuseAnimate>
                                    </div>
                                </div>
                            </div>
                            <FuseAnimate animation="transition.slideRightIn" delay={300}>
                                <Button
                                    className="whitespace-no-wrap"
                                    variant="contained"
                                    disabled={!this.canBeSubmitted()}
                                    onClick={() => new_instructor===true ? addInstructor(form):editInstructor(form)}
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
                        <Tab className="h-64 normal-case" label="Basic Info"/>
                        <Tab className="h-64 normal-case" label="Vetted Course"/>
                        <Tab className="h-64 normal-case" label="Current WorkLoad"/>
                        <Tab className="h-64 normal-case" label="History statistic"/>
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
                                  name="first_name"
                                  value={form.first_name}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="Last Name"
                                  id="last_name"
                                  name="last_name"
                                  value={form.last_name}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="Instructor ID"
                                  id="prof_id"
                                  name="prof_id"
                                  value={form.prof_id}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                              <TextField
                                  className="mt-8 mb-16 mr-8"
                                  required
                                  label="Max Course"
                                  id="max_course"
                                  name="max_course"
                                  type="number"
                                  value={form.max_course}
                                  onChange={this.handleChange}
                                  variant="outlined"
                                  fullWidth
                              />
                            </div>
                            <FuseChipSelect
                                className="mt-8 mb-24"
                                value={{label:form.prof_type,value:form.prof_type}}
                                options={this.state.professor_type.map(prof_type=>({
                                  value:prof_type,
                                  label:prof_type
                                }))}
                                name="prof_type"
                                onChange={(value)=>this.handleChipChange(value,"prof_type")}
                                placeholder="Select Contact Type"
                                textFieldProps={{
                                    label          : 'Contact Type',
                                    InputLabelProps: {
                                        shrink: true
                                    },
                                    variant        : 'outlined'
                                }}
                            />
                            <FuseChipSelect
                                className="mt-8 mb-24"
                                value={{label:form.department.department_name,value:form.department._id}}
                                options={department.map(department=>({
                                  value:department,
                                  label:department.department_name
                                }))}
                                name="department"
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
                          </div>
                        )}
                        {tabValue === 1 && (
                          <div>
                              <ReactTable
                                  className="-striped -highlight border-0"
                                  getTrProps={(state, rowInfo, column) => {
                                      return {
                                          className: "cursor-pointer",
                                          onClick  : (e, handleOriginal) => {
                                              if ( rowInfo )
                                              {
                                                  // console.log(rowInfo);
                                                  // openEditVetCourseDialog(rowInfo.original,rowInfo.index);
                                              }
                                          }
                                      }
                                  }}
                                  data={form.vetted_course}
                                  columns={[
                                      {
                                          Header    : "Course Tag",
                                          accessor  : "course_tag",
                                          filterable: true,
                                      },
                                      {
                                          Header    : "Course Number",
                                          accessor  : "course_num",
                                          filterable: true,
                                      },
                                      {
                                          Header    : "Course Name",
                                          accessor  : "course_name",
                                          filterable: true,
                                          className : "font-bold"
                                      },
                                      {
                                          Header    : "Course Level",
                                          accessor  : "course_level",
                                          filterable: true,
                                          className : "font-bold"
                                      },
                                      {
                                          Header: "",
                                          width : 128,
                                          Cell  : row => (
                                              <div className="flex items-center">
                                                  <IconButton
                                                      onClick={(ev) => {
                                                          ev.stopPropagation();
                                                          removeVetCourse(row.index);
                                                      }}
                                                  >
                                                      <Icon>delete</Icon>
                                                  </IconButton>
                                                  <IconButton
                                                      onClick={(ev) => {
                                                          ev.stopPropagation();
                                                          openNewVetCourseDialog();
                                                      }}
                                                  >
                                                      <Icon>add</Icon>
                                                  </IconButton>
                                              </div>
                                          )
                                      }
                                  ]}
                                  defaultPageSize={10}
                                  noDataText="No instructors found"
                              />
                                <Fab
                                    color="primary"
                                    aria-label="add"
                                    className={classes.addButton}
                                >
                                    <Icon>person_add</Icon>
                                </Fab>
                            <VettedCourseDialog/>
                            </div>
                        )}
                        {tabValue === 2 && (
                            <div>
                                <div className="flex justify-center sm:justify-start flex-wrap">

                                </div>
                            </div>
                        )}
                        {tabValue === 3 && (
                            <div>
                                <div className="flex justify-center sm:justify-start flex-wrap">

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
      getInstructor : Actions.getInstructor,
      getDepartmentsOrignal: DepartActions.getDepartmentsOrignal,
      openNewVetCourseDialog: Actions.openNewVetCourseDialog,
      openEditVetCourseDialog: Actions.openEditVetCourseDialog,
      newInstructor: Actions.newInstructor,
      addInstructor: Actions.addInstructor,
      editInstructor: Actions.editInstructor,
      removeVetCourse: Actions.removeVetCourse
    }, dispatch);
}

function mapStateToProps({instructorsApp, DepartmentApp})
{
    return {
      instructor: instructorsApp.instructor.data,
      department: DepartmentApp.departments.orignal_entities,
      vetted_course_update: instructorsApp.instructor.vetted_course_update,
      course_by_department: instructorsApp.instructor.course_by_department
    }
}

export default withReducer('instructorsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(Instructor))));
