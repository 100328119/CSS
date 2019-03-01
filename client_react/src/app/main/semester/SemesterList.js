import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import moment from "moment/moment.js";
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class SemesterList extends Component {


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
        const {semesters, openEditSemesterDialog,searchText,removeSemester} = this.props;
        console.log(semesters);
        let data = [];
        if(semesters != undefined){
          data = this.getFilteredArray(semesters, searchText);
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
                                    openEditSemesterDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Year",
                            accessor  : "year",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Season",
                            accessor  : "season",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "From Date",
                            accessor  : (data)=>{
                              return moment(data.from_date)
                                    .local()
                                    .format("YYYY-MM-DD")
                            },
                            id        : "from_date",
                            filterable: true
                        },
                        {
                            Header    : "End Date",
                            accessor  : (data)=>{
                              return moment(data.end_date)
                                    .local()
                                    .format("YYYY-MM-DD")
                            },
                            id:"end_date",
                            filterable: true
                        },
                        {
                            Header    : "Duration/week",
                            accessor  : "duration",
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
                                            removeSemester(row.original._id);
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
      openEditSemesterDialog: Actions.openEditSemesterDialog,
      removeSemester: Actions.removeSemester
    }, dispatch);
}

function mapStateToProps({SemesterApp})
{
    return {
      semesters: SemesterApp.semester.data,
      searchText: SemesterApp.semester.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SemesterList));
