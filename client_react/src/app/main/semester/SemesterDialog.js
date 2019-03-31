import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import moment from "moment/moment.js";
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newSemesterState = {
    type           :  'semester',
    year           :  '',
    season         :  '',
    from_date      :  '',
    end_date       :  '',
    duration       :  ''
};

class SemesterDialog extends Component {

    state = {...newSemesterState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.semesterDialog.props.open && this.props.semesterDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.semesterDialog.type === 'edit' &&
                this.props.semesterDialog.data &&
                !_.isEqual(this.props.semesterDialog.data, prevState) )
            {
                this.setState({...this.props.semesterDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.semesterDialog.type === 'new' &&
                !_.isEqual(newSemesterState, prevState) )
            {
                this.setState({...newSemesterState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {

        this.props.semesterDialog.type === 'edit' ? this.props.closeEditSemesterDialog() : this.props.closeNewSemesterDialog();
    };

    canBeSubmitted()
    {
        const {year,season} = this.state;
        return (
            year.length > 0 && season.length>0
        );
    }

    render()
    {
        const {semesterDialog,addSemester,editSemester,removeSemester} = this.props;
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...semesterDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {semesterDialog.type === 'new' ? 'New Semester' : 'Edit Semester'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {semesterDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.year + ' ' + this.state.season}
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
                            label="academical year"
                            autoFocus
                            id="year"
                            name="year"
                            type="number"
                            value={this.state.year}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">home</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Season"
                            id="season"
                            name="season"
                            value={this.state.season}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">domain</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="From Date"
                            type="date"
                            id="from_date"
                            name="from_date"
                            value={moment(this.state.from_date).local().format("YYYY-MM-DD")}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">domain</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="End Date"
                            type="date"
                            id="end_date"
                            name="end_date"
                            value={moment(this.state.end_date).local().format("YYYY-MM-DD")}
                            onChange={this.handleChange}
                            variant="outlined"
                            // formatDate={(date) => Moment.moment(new Date()).format('MM-DD-YYYY')}
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">domain</Icon>
                        </div>
                        <TextField
                            className="mb-24"
                            label="Duration"
                            id="duration"
                            name="duration"
                            type="number"
                            value={this.state.duration}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {semesterDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addSemester(this.state);
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
                                editSemester(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                editSemester(this.state._id);
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
      closeNewSemesterDialog: Actions.closeNewSemesterDialog,
      closeEditSemesterDialog: Actions.closeEditSemesterDialog,
      addSemester: Actions.addSemester,
      editSemester: Actions.editSemester,
      removeSemester:Actions.removeSemester
    }, dispatch);
}

function mapStateToProps({SemesterApp})
{
    return {
      semesterDialog: SemesterApp.semester.semesterDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SemesterDialog);
