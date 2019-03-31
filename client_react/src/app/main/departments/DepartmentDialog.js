import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newDepartmentState = {
    department_name      : '',
    department_chair    : '',
    num_staff: '',
    notes   : ''
};

class DepartmentDialog extends Component {

    state = {...newDepartmentState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.departmentDialog.props.open && this.props.departmentDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.departmentDialog.type === 'edit' &&
                this.props.departmentDialog.data &&
                !_.isEqual(this.props.departmentDialog.data, prevState) )
            {
                this.setState({...this.props.departmentDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.departmentDialog.type === 'new' &&
                !_.isEqual(newDepartmentState, prevState) )
            {
                this.setState({...newDepartmentState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.departmentDialog.type === 'edit' ? this.props.closeEditDepartmentDialog() : this.props.closeNewDepartmentDialog();
    };

    canBeSubmitted()
    {
        const {department_name} = this.state;
        return (
            department_name.length > 0
        );
    }

    render()
    {
        const {departmentDialog, addDepartment, updateDepartment, removeDepartment} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...departmentDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {departmentDialog.type === 'new' ? 'New Department' : 'Edit Department'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {departmentDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                        </div>

                        <TextField
                            className="mb-24"
                            label="Department Name"
                            autoFocus
                            id="department_name"
                            name="department_name"
                            value={this.state.department_name}
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
                            label="Department Chair"
                            id="department_chair"
                            name="department_chair"
                            value={this.state.department_chair}
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
                            label="Number of Staff"
                            id="num_staff"
                            name="num_staff"
                            value={this.state.num_staff}
                            onChange={this.handleChange}
                            variant="outlined"
                            type="number"
                            fullWidth
                        />
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

                {departmentDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addDepartment(this.state);
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
                                updateDepartment(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeDepartment(this.state._id);
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
        closeEditDepartmentDialog: Actions.closeEditDepartmentDialog,
        closeNewDepartmentDialog : Actions.closeNewDepartmentDialog,
        addDepartment            : Actions.addDepartment,
        updateDepartment         : Actions.updateDepartment,
        removeDepartment         : Actions.removeDepartment
    }, dispatch);
}

function mapStateToProps({departmentsApp})
{
    return {
        departmentDialog: departmentsApp.departments.departmentDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DepartmentDialog);
