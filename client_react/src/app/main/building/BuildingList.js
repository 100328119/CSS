import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class BuildingList extends Component {


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
        const {building, searchText,openEditBuildingDialog,removeBuilding} = this.props;
        let data = [];
        if(building != undefined){
          data = this.getFilteredArray(building, searchText);
        }

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Building!
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
                                    openEditBuildingDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Building Name",
                            accessor  : "building_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Campus",
                            accessor  : "campus.campus_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "address",
                            accessor  : "campus.address",
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
                                            removeBuilding(row.original._id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No Building found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getBuilding: Actions.getBuilding,
      openEditBuildingDialog: Actions.openEditBuildingdialog,
      removeBuilding: Actions.removeBuilding
    }, dispatch);
}

function mapStateToProps({BuildingApp})
{
    return {
      building: BuildingApp.building.data,
      searchText : BuildingApp.building.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BuildingList));
