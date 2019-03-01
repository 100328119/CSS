import React, {Component} from 'react';
import {FormHelperText, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newVettedCourseState = {
            type: "course",
            prerequisites: [],
            _id: "",
            course_name: "",
            course_tag: "",
            course_num: 0,
            course_level: 0,
            department: ""
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
                this.setState({...this.props.vetCourseDialog.data});
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
        this.props.vetCourseDialog.type === 'edit' ? this.props.closeEditVettedCourse() : this.props.closeNewVettedCourse();
    };

    canBeSubmitted()
    {
        const {_id} = this.state;
        return (
            _id.length > 0
        );
    }

    render()
    {
        const {vetCourseDialog, addVetCourse, updateVetCourse, removeVetCourse} = this.props;

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
                        <Avatar className="w-96 h-96" alt="instructor avatar" src={this.state.avatar}/>
                        {vetCourseDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Professor ID"
                            autoFocus
                            id="prof_id"
                            name="prof_id"
                            value={this.state.prof_id}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            type="number"
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="First Name"
                            id="first_name"
                            name="first_name"
                            value={this.state.first_name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
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
                                updateVetCourse(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeVetCourse(this.state.id);
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

    }, dispatch);
}

function mapStateToProps({instructorsApp})
{
    return {

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(VettedCourse);
