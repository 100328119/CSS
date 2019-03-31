import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newCampusState = {
    type           : 'campus',
    campus_name    : '',
    address        : '',
    postal_code    : ''
};

class CampusDialog extends Component {

    state = {...newCampusState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.campusDialog.props.open && this.props.campusDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.campusDialog.type === 'edit' &&
                this.props.campusDialog.data &&
                !_.isEqual(this.props.campusDialog.data, prevState) )
            {
                this.setState({...this.props.campusDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.campusDialog.type === 'new' &&
                !_.isEqual(newCampusState, prevState) )
            {
                this.setState({...newCampusState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {

        this.props.campusDialog.type === 'edit' ? this.props.closeEditCampusDialog() : this.props.closeNewCampusDialog();
    };

    canBeSubmitted()
    {
        const {campus_name} = this.state;
        return (
            campus_name.length > 0
        );
    }

    render()
    {
        const {campusDialog,addCampus,updateCampus,removeCampus} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...campusDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {campusDialog.type === 'new' ? 'New Campus' : 'Edit Campus'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {campusDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.campus_name}
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
                            label="Campus Name"
                            autoFocus
                            id="campus_name"
                            name="campus_name"
                            value={this.state.campus_name}
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
                            label="Address"
                            id="address"
                            name="address"
                            value={this.state.address}
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
                            label="Postal Code"
                            id="postal_code"
                            name="postal_code"
                            value={this.state.postal_code}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </div>
                </DialogContent>

                {campusDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCampus(this.state);
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
                                updateCampus(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeCampus(this.state._id);
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
      getCampus: Actions.getCampus,
      closeNewCampusDialog: Actions.closeNewCampusDialog,
      closeEditCampusDialog: Actions.closeEditCampusDialog,
      addCampus: Actions.addCampus,
      updateCampus: Actions.updateCampus,
      removeCampus: Actions.removeCampus
    }, dispatch);
}

function mapStateToProps({CampusApp})
{
    return {
        campusDialog: CampusApp.campus.campusDialog
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CampusDialog);
