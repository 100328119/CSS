import React, {Component} from 'react';
import {FormHelperText, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {FuseChipSelect} from '@fuse';
import {bindActionCreators} from 'redux';
import * as Actions from '../store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newVettedCourseState = {
            department: {
              department_name:null
            },
            course:{
              course_num:"",
              course_tag:"",
              course_name:""
            }
};

class VettedCourse extends Component {

    state = {...newVettedCourseState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.vetCourseDialog.props.open && this.props.vetCourseDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.vetCourseDialog.type === 'edit' &&
                this.props.vetCourseDialog.data &&
                !_.isEqual(this.props.vetCourseDialog.data, prevState) )
            {
                this.setState({course:this.props.vetCourseDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.vetCourseDialog.type === 'new' &&
                !_.isEqual(newVettedCourseState, prevState) )
            {
                this.setState({...newVettedCourseState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.vetCourseDialog.type === 'edit' ? this.props.closeEditVetCourseDialog() : this.props.closeNewVetCourseDialog();
    };

    handleDepartmentChange = (value) => {
        this.setState({department:value.value});
        this.props.getCourseByDepartment(value.value._id);
    };

    handleCourseChange = (value) =>{
      this.setState({course:value.value});
    }

    canBeSubmitted()
    {
        return (
            this.state.department !== null && this.state.course !== null
        );
    }

    render()
    {
        const {vetCourseDialog, addVetCourse, updateVetCourse, removeVetCourse,departments,editVetCourse} = this.props;

        let course_by_department = this.props.course_by_department;
        if(course_by_department === null){
            course_by_department = [];
        }
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...vetCourseDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {vetCourseDialog.type === 'new' ? 'New VetCourse' : 'Edit VetCourse'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {vetCourseDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>

                        <FuseChipSelect
                            className="mt-8 mb-24"
                            value={{label:this.state.department.department_name,value:this.state.department}}
                            options={departments.map(department=>({
                              value:department,
                              label:department.department_name
                            }))}
                            name="department"
                            onChange={(value)=>this.handleDepartmentChange(value)}
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
                            value={{label:this.state.course.course_tag+" "+this.state.course.course_num+" "+this.state.course.course_name,value:this.course}}
                            options={course_by_department.map(course=>({
                              value:course,
                              label:course.course_tag+" "+course.course_num+" "+course.course_name
                            }))}
                            name="Course"
                            onChange={(value)=>this.handleCourseChange(value)}
                            placeholder="Select Course"
                            disable="true"
                            textFieldProps={{
                                label          : 'Course',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant        : 'outlined'
                            }}
                        />
                </DialogContent>

                {vetCourseDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addVetCourse(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                editVetCourse(this.state, vetCourseDialog.props.index);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                // removeVetCourse(this.state.id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      closeNewVetCourseDialog: Actions.closeNewVetCourseDialog,
      closeEditVetCourseDialog: Actions.closeEditVetCourseDialog,
      editVetCourse: Actions.editVetCourse,
      addVetCourse: Actions.addVetCourse,
      getCourseByDepartment: Actions.getCourseByDepartment
    }, dispatch);
}

function mapStateToProps({instructorsApp, DepartmentApp})
{
    return {
      departments: DepartmentApp.departments.entities,
      vetCourseDialog: instructorsApp.instructor.vetCourseDialog,
      course_by_department: instructorsApp.instructor.course_by_department
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VettedCourse);
