import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class RoomList extends Component {


    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) =>entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    render()
    {
        // const { contacts, user, searchText, selectedContactIds, selectAllContacts, deSelectAllContacts, toggleInSelectedContacts, openEditContactDialog, removeContacts, removeContact, toggleStarredContact, setContactsUnstarred, setContactsStarred} = this.props;
        const {room, searchText,openEditRoomDialog,removeRoom} = this.props;
        let data = [];
        if(room != undefined){
          data = this.getFilteredArray(room, searchText);
          console.log(data);
        }

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Room!
                    </Typography>
                </div>
            );
        }

        return (
            <FuseAnimate animation="transition.slideUpIn" delay={300}>
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    openEditRoomDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Room Number",
                            accessor  : "room_num",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Building",
                            accessor  : "building.building_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Campus",
                            accessor  : "building.campus.campus_name",
                            filterable: true
                        },
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">
                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeRoom(row.original._id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No Room found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getRoom:Actions.getRoom,
      openEditRoomDialog: Actions.openEditRoomDialog,
      removeRoom: Actions.removeRoom
    }, dispatch);
}

function mapStateToProps({RoomApp, BuildingApp})
{
    return {
      room: RoomApp.room.data,
      searchText : RoomApp.room.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomList));
