import React, {Component} from 'react';
import {Avatar, Checkbox, Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class InstructorsList extends Component {

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };

    HandleRowClick(id){
      this.props.history.push('/instructor/'+id);
    }

    render()
    {
        const { instructors, searchText, openEditInstructorDialog,removeInstructor} = this.props;
        const data = this.getFilteredArray(instructors, searchText);
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no instructors!
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
                                    this.HandleRowClick(rowInfo.original._id);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Department",
                            accessor  : "department.department_name",
                            filterable: true,
                        },
                        {
                            Header    : "Prof ID",
                            accessor  : "prof_id",
                            filterable: true,
                        },
                        {
                            Header    : "First Name",
                            accessor  : "first_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Last Name",
                            accessor  : "last_name",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Max Courses",
                            accessor  : "max_course",
                            filterable: true
                        },
                        {
                            Header    : "Contract Type",
                            accessor  : "prof_type",
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
                                            removeInstructor(row.original.id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No instructors found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getInstructors             : Actions.getInstructors,
        getUserData                : Actions.getUserData,
        selectAllInstructors       : Actions.selectAllInstructors,
        openEditInstructorDialog   : Actions.openEditInstructorDialog,
        removeInstructor           : Actions.removeInstructor
    }, dispatch);
}

function mapStateToProps({instructorsApp})
{
    return {
        instructors          : instructorsApp.instructors.entities,
        searchText        : instructorsApp.instructors.searchText,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorsList));
