import React, {Component} from 'react';
import {TextField, Button, Dialog, DialogActions, DialogContent, Icon, IconButton, Typography, Toolbar, AppBar, Avatar} from '@material-ui/core';
import {FuseChipSelect,FuseUtils} from '@fuse';
import {bindActionCreators} from 'redux';
import * as Actions from './store/actions';
import {connect} from 'react-redux';
import _ from '@lodash';

const newRoomState = {
    type        : 'room',
    room_num    : '',
    floor       : 1,
    equipment   :[],
    building    :{
      _id:'',
      building_name : ''
    }
};

class RoomDialog extends Component {

    state = {...newRoomState};

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        /**
         * After Dialog Open
         */
        if ( !prevProps.roomDialog.props.open && this.props.roomDialog.props.open )
        {
            /**
             * Dialog type: 'edit'
             * Update State
             */
            if ( this.props.roomDialog.type === 'edit' &&
                this.props.roomDialog.data &&
                !_.isEqual(this.props.roomDialog.data, prevState) )
            {
                this.setState({...this.props.roomDialog.data});
            }

            /**
             * Dialog type: 'new'
             * Update State
             */
            if ( this.props.roomDialog.type === 'new' &&
                !_.isEqual(newRoomState, prevState) )
            {
                this.setState({...newRoomState});
            }
        }
    }

    handleChange = (event) => {
        this.setState(_.set({...this.state}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
    };

    closeComposeDialog = () => {
        this.props.roomDialog.type === 'edit' ? this.props.closeEditRoomDialog() : this.props.closeNewRoomDialog();
    };

    handleChipChange = (value) => {
        this.setState({building:{...this.state.building, building_name:value.label,_id:value.value }});
    };

    handleEquipmentChange = (value, name)=>{
      this.setState({equipment: value.map(item => item.value)});
    }

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
        const {room_num} = this.state;
        const building_id = this.state.building._id;
        const equipment = this.state.equipment;
        return (
            room_num.length > 0 || building_id.length > 0 || equipment.length > 0
        );
    }

    render()
    {
        const {roomDialog,addRoom,building,editRoom,removeRoom} = this.props;
        let building_data = [];
        if(building != undefined){
          building_data = this.getFilteredArray(building, '');
        }
        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...roomDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {roomDialog.type === 'new' ? 'New Room' : 'Edit Room'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {roomDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.building.building_name + this.state.room_num}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                <FuseChipSelect
                    className="mb-24"
                    value={{label:this.state.building.building_name,value:this.state.building._id}}
                    options={building_data.map(building=>({
                      value:building._id,
                      label:building.building_name
                    }))}
                    name="building"
                    onChange={(value)=>this.handleChipChange(value)}
                    placeholder="Select Building"
                    textFieldProps={{
                        label          : 'Building',
                        InputLabelProps: {
                            shrink: true
                        },
                        variant        : 'outlined',
                        disabled       : false
                    }}
                />
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="Room Number"
                            autoFocus
                            id="room_num"
                            name="room_num"
                            value={this.state.room_num}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <div className="flex">
                        <div className="min-w-48 pt-20">
                            <Icon color="action">account_circle</Icon>
                        </div>

                        <TextField
                            className="mb-24"
                            label="floor"
                            autoFocus
                            id="floor"
                            name="floor"
                            value={this.state.floor}
                            onChange={this.handleChange}
                            variant="outlined"
                            required
                            fullWidth
                        />
                    </div>
                    <FuseChipSelect
                        className="mt-8 mb-24"
                        value={
                            this.state.equipment.map(item => ({
                                value: item,
                                label: item
                            }))
                        }
                        onChange={(value) => this.handleEquipmentChange(value, 'equipment')}
                        placeholder="Select multiple Equipment"
                        textFieldProps={{
                            label          : 'Equipment',
                            InputLabelProps: {
                                shrink: true
                            },
                            variant        : 'outlined'
                        }}
                        isMulti
                    />

                </DialogContent>

                {roomDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addRoom(this.state);
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
                                editRoom(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeRoom(this.state._id);
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
      closeNewRoomDialog: Actions.closeNewRoomDialog,
      closeEditRoomDialog: Actions.closeEditRoomDialog,
      addRoom: Actions.addRoom,
      editRoom: Actions.editRoom,
      removeRoom: Actions.removeRoom
    }, dispatch);
}

function mapStateToProps({BuildingApp,RoomApp})
{
    return {
      roomDialog: RoomApp.room.roomDialog,
      building: BuildingApp.building.data
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(RoomDialog);
