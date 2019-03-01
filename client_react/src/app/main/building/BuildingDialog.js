import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {FuseChipSelect,FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newBuildingState = {
    type           : 'building',
    building_name    : '',
    campus         :{
      _id:'',
      campus_name : ''
    }
};

class BuildingDialog extends Component {

    state = {...newBuildingState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.buildingDialog.props.open && this.props.buildingDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.buildingDialog.type === 'edit' &&
                this.props.buildingDialog.data &&
                !_.isEqual(this.props.buildingDialog.data, prevState) )
            {
                this.setState({...this.props.buildingDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.buildingDialog.type === 'new' &&
                !_.isEqual(newBuildingState, prevState) )
            {
                this.setState({...newBuildingState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.buildingDialog.type === 'edit' ? this.props.closeEditBuildingDialog() : this.props.closeNewBuildingDialog();
    };

    handleChipChange = (value, name) => {
        this.setState({campus:{...this.state.campus, campus_name:value.label,_id:value.value }});
    };

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) =>entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    canBeSubmitted()
    {
        const {building_name} = this.state;
        const campus_id = this.state.campus._id;
        return (
            building_name.length > 0 && campus_id.length > 0
        );
    }

    render()
    {
        const {buildingDialog,addBuilding,campus,editBuilding,searchText,removeBuilding} = this.props;
        let campus_data = [];
        if(campus != undefined){
          campus_data = this.getFilteredArray(campus, searchText);
        }
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...buildingDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {buildingDialog.type === 'new' ? 'New Building' : 'Edit Building'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {buildingDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.building_name}
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
                            label="Building Name"
                            autoFocus
                            id="building_name"
                            name="building_name"
                            value={this.state.building_name}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>

                        <FuseChipSelect
                            className="mb-24"
                            value={{label:this.state.campus.campus_name,value:this.state.campus._id}}
                            options={campus_data.map(campus=>({
                              value:campus._id,
                              label:campus.campus_name
                            }))}
                            name="admin"
                            onChange={(value)=>this.handleChipChange(value,"admin")}
                            placeholder="Select Campus"
                            textFieldProps={{
                                label          : 'Campus',
                                InputLabelProps: {
                                    shrink: true
                                },
                                variant        : 'outlined',
                                disabled       : false
                            }}
                        />

                </DialogContent>

                {buildingDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addBuilding(this.state);
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
                                editBuilding(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeBuilding(this.state._id);
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
      closeNewBuildingDialog: Actions.closeNewBuildingDialog,
      closeEditBuildingDialog: Actions.closeEditBuildingDialog,
      addBuilding: Actions.addBuilding,
      editBuilding: Actions.editBuilding,
      removeBuilding: Actions.removeBuilding
    }, dispatch);
}

function mapStateToProps({BuildingApp,CampusApp})
{
    return {
      buildingDialog:BuildingApp.building.buildingDialog,
      searchText : BuildingApp.building.searchText,
      campus:CampusApp.campus.data
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BuildingDialog);
