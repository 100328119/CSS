import React, {Component} from 'react';
import {Icon, Table, TableBody, TableCell, TablePagination, TableRow, Checkbox} from '@material-ui/core';
import {FuseScrollbars} from '@fuse';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import UsersTableHeader from './UsersTableHeader';
import * as Actions from '../store/actions';

class UsersTable extends Component {

    state = {
        order      : 'asc',
        orderBy    : null,
        selected   : [],
        data       : this.props.users,
        page       : 0,
        rowsPerPage: 10
    };

    componentDidMount()
    {
        this.props.getUsers();
    }

    //filtering table
    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.users, prevProps.users) || !_.isEqual(this.props.searchText, prevProps.searchText) )
        {
            const data = this.getFilteredArray(this.props.users, this.props.searchText);
            this.setState({data})
        }
    }
    //filtering array.
    getFilteredArray = (data, searchText) => {
        if ( searchText.length === 0 )
        {
            return data;
        }
        return _.filter(data, item => {
          let name = item.email;
          name.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if ( this.state.orderBy === property && this.state.order === 'desc' )
        {
            order = 'asc';
        }

        this.setState({
            order,
            orderBy
        });
    };

    handleSelectAllClick = event => {
        if ( event.target.checked )
        {
            this.setState(state => ({selected: this.state.data.map(n => n._id)}));
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (item) => {
        //redirect to user detail page
        this.props.history.push('/admin/user/' + item._id);
    };

    handleCheck = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if ( selectedIndex === -1 )
        {
            newSelected = newSelected.concat(selected, id);
        }
        else if ( selectedIndex === 0 )
        {
            newSelected = newSelected.concat(selected.slice(1));
        }
        else if ( selectedIndex === selected.length - 1 )
        {
            newSelected = newSelected.concat(selected.slice(0, -1));
        }
        else if ( selectedIndex > 0 )
        {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        this.setState({selected: newSelected});
    };

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render()
    {
        const {order, orderBy, selected, rowsPerPage, page, data} = this.state;

        return (
            <div className="w-full flex flex-col">

                <FuseScrollbars className="flex-grow overflow-x-auto">

                    <Table className="min-w-xl" aria-labelledby="tableTitle">

                    <UsersTableHeader
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={data.length}
                    />
                    <TableBody>
                    {_.orderBy(data, [
                        (o) => {
                            switch ( orderBy )
                            {
                                case 'categories':
                                {
                                    return o.categories[0];
                                }
                                default:
                                {
                                    return o[orderBy];
                                }
                            }
                        }
                    ], [order])
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map(n => {
                            const isSelected = this.isSelected(n._id);
                            return (
                                <TableRow
                                    className="h-64 cursor-pointer"
                                    hover
                                    role="checkbox"
                                    aria-checked={isSelected}
                                    tabIndex={-1}
                                    key={n._id}
                                    selected={isSelected}
                                    onClick={event => this.handleClick(n)}
                                >

                                    <TableCell component="th" scope="row">
                                        {n.full_name.first_name + " " + n.full_name.last_name}
                                    </TableCell>

                                    <TableCell className="truncate" component="th" scope="row">
                                        {n.email}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="left">
                                          {n.admin.role}
                                    </TableCell>

                                    <TableCell component="th" scope="row" align="right">
                                        <Icon className="text-green text-20">check_circle</Icon>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                    </Table>
                </FuseScrollbars>

                <TablePagination
                    component="div"
                    count={1}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getUsers: Actions.getUsers
    }, dispatch);
}

function mapStateToProps({AdminApp})
{
    return {
        users  : AdminApp.users.data,
        searchText: AdminApp.users.searchText
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UsersTable));
