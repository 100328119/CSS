import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class CampusList extends Component {


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
        const {campus, openEditCampusDialog,searchText,removeCampus} = this.props;
        console.log(campus);
        let data = [];
        if(campus != undefined){
          data = this.getFilteredArray(campus, searchText);
        }
        // const data = "";

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no Campus!
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
                                    openEditCampusDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Campus Name",
                            accessor  : "campus_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Address",
                            accessor  : "address",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Postal Code",
                            accessor  : "postal_code",
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
                                            removeCampus(row.original._id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No Campus found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getCampus: Actions.getCampus,
      openEditCampusDialog: Actions.openEditCampusDialog,
      removeCampus: Actions.removeCampus
    }, dispatch);
}

function mapStateToProps({CampusApp})
{
    return {
      campus: CampusApp.campus.data,
      searchText : CampusApp.campus.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusList));
