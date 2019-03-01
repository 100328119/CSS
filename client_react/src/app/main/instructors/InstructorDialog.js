import React, {Component} from 'react';
import {FormHelperText, InputLabel, Select, MenuItem, TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newInstructorState = {
    id      : '',
    first_name    : '',
    last_name: '',
    avatar  : 'assets/images/avatars/profile.jpg',
    max_course : '',
    prof_type:'',
    notes   : ''
};

class InstructorDialog extends Component {

    state = {...newInstructorState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.instructorDialog.props.open && this.props.instructorDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.instructorDialog.type === 'edit' &&
                this.props.instructorDialog.data &&
                !_.isEqual(this.props.instructorDialog.data, prevState) )
            {
                this.setState({...this.props.instructorDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.instructorDialog.type === 'new' &&
                !_.isEqual(newInstructorState, prevState) )
            {
                this.setState({...newInstructorState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.instructorDialog.type === 'edit' ? this.props.closeEditInstructorDialog() : this.props.closeNewInstructorDialog();
    };

    canBeSubmitted()
    {
        const {first_name} = this.state;
        return (
            first_name.length > 0
        );
    }

    render()
    {
        const {instructorDialog, addInstructor, updateInstructor, removeInstructor} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...instructorDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {instructorDialog.type === 'new' ? 'New Instructor' : 'Edit Instructor'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        <Avatar className="w-96 h-96" alt="instructor avatar" src={this.state.avatar}/>
                        {instructorDialog.type === 'edit' && (
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

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Last Name"
                            id="last_name"
                            name="last_name"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <TextField
                            className="mb-24"
                            label="Max Courses"
                            id="max_course"
                            name="max_course"
                            value={this.state.max_course}
                            onChange={this.handleChange}
                            variant="outlined"
                            type="number"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>
                        <InputLabel htmlFor="Contract">Contract Type</InputLabel>
                        <Select
                            className="mb-24"
                            id="prof_type"
                            name="prof_type"
                            value={this.state.prof_type}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        >
                        <MenuItem value="">
                        <em>None</em>
                        </MenuItem>
                        <MenuItem value={"Full Time"}>Full Time</MenuItem>
                        <MenuItem value={"NR2"}>NR2</MenuItem>
                        <MenuItem value={"NR1"}>NR1</MenuItem>
                        </Select>
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">note</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Notes"
                            id="notes"
                            name="notes"
                            value={this.state.notes}
                            onChange={this.handleChange}
                            variant="outlined"
                            multiline
                            rows={5}
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {instructorDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addInstructor(this.state);
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
                                updateInstructor(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeInstructor(this.state.id);
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
        closeEditInstructorDialog: Actions.closeEditInstructorDialog,
        closeNewInstructorDialog : Actions.closeNewInstructorDialog,
        addInstructor            : Actions.addInstructor,
        updateInstructor         : Actions.updateInstructor,
        removeInstructor         : Actions.removeInstructor
    }, dispatch);
}

function mapStateToProps({instructorsApp})
{
    return {
        instructorDialog: instructorsApp.instructors.instructorDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(InstructorDialog);
