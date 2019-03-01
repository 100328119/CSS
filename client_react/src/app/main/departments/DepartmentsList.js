import React, {Component} from 'react';
import {Icon, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, MenuList, Typography} from '@material-ui/core';
import {FuseUtils, FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from './store/actions';

class DepartmentsList extends Component {

    getFilteredArray = (entities, searchText) => {
        const arr = Object.keys(entities).map((id) => entities[id]);
        if ( searchText.length === 0 )
        {
            return arr;
        }
        return FuseUtils.filterArrayByString(arr, searchText);
    };



    render()
    {
        const { departments, searchText, openEditDepartmentDialog, removeDepartment} = this.props;
        const data = this.getFilteredArray(departments, searchText);
        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        There are no departments!
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
                                    openEditDepartmentDialog(rowInfo.original);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Department Name",
                            accessor  : "department_name",
                            className:"font-bold",
                            filterable: true,
                        },
                        {
                            Header    : "Department Chair",
                            accessor  : "department_chair",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Number of Staff",
                            accessor  : "num_staff",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header: "",
                            width : 128,
                            Cell  : row => (
                                <div className="flex items-center">

                                    <IconButton
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            removeDepartment(row.original._id);
                                        }}
                                    >
                                        <Icon>delete</Icon>
                                    </IconButton>
                                </div>
                            )
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No departments found"
                />
            </FuseAnimate>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getDepartments             : Actions.getDepartments,
        openEditDepartmentDialog   : Actions.openEditDepartmentDialog,
        removeDepartment           : Actions.removeDepartment
    }, dispatch);
}

function mapStateToProps({departmentsApp})
{
    return {
        departments          : departmentsApp.departments.entities,
        searchText        : departmentsApp.departments.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DepartmentsList));
