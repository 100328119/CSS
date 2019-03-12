import React, {Component} from 'react';
import {withStyles,Card,OutlinedInput,Icon,TextField,Typography,Divider,Select,InputLabel,FormControl,MenuItem,} from '@material-ui/core';
import {FuseUtils,FuseAnimate, FuseAnimateGroup} from '@fuse';
import withReducer from 'app/store/withReducer';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

const styles = theme => ({
    header    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : 'absolute',
        top          : -64,
        left         : 0,
        opacity      : .04,
        fontSize     : 512,
        width        : 512,
        height       : 512,
        pointerEvents: 'none'
    }
});

class Boards extends Component {

    state = {
        data: this.props.boards
    };

    componentDidMount()
    {
        this.props.getDepartments();
        this.props.getBoards();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.boards, prevProps.boards) ||
            !_.isEqual(this.props.searchText, prevProps.searchText) ||
            !_.isEqual(this.props.departmentFilter, prevProps.departmentFilter)
        )
        {
            const data = this.getFilteredArray(this.props.boards, this.props.searchText, this.props.departmentFilter);
            this.setState({data})
        }
    }

    getFilteredArray = (data, searchText, departmentFilter) => {
        if ( searchText.length === 0 && departmentFilter === "all" )
        {
            return data;
        }


        // return FuseUtils.filterArrayByString(data, searchText);
        let arr_filtered  = _.filter(data, item => {
            if ( departmentFilter !== "all" && item.department._id !== departmentFilter )
            {
                return false;
            }
            return item
        });

        return FuseUtils.filterArrayByString(arr_filtered, searchText);
    };


    render()
    {
        const {classes, setSearchText, searchText, departments, departmentFilter, setDepartmentFilter, theme} = this.props;

        const {data} = this.state;

        return (
            <div className="w-full">

                <div className={classNames(classes.header, "relative overflow-hidden flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-40 font-light">
                            WELCOME TO CSS
                        </Typography>
                    </FuseAnimate>

                    <FuseAnimate duration={400} delay={600}>
                        <Typography variant="subtitle1" color="inherit" className="mt-8 sm:mt-16 mx-auto max-w-512">
                            <span className="opacity-75">

                            </span>
                        </Typography>
                    </FuseAnimate>

                    <Icon className={classes.headerIcon}>school</Icon>
                </div>

                <div className="max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                    <div className="flex flex-col sm:flex-row items-center justify-between py-24">
                        <TextField
                            label="Search"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={setSearchText}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="department-label-placeholder">
                                Department
                            </InputLabel>
                            <Select
                                value={departmentFilter}
                                onChange={setDepartmentFilter}
                                input={
                                    <OutlinedInput
                                        labelWidth={("department".length * 9)}
                                        name="department"
                                        id="department-label-placeholder"
                                    />
                                }
                            >
                                <MenuItem value="all">
                                    <em>All</em>
                                </MenuItem>

                                {departments.map(department => (
                                    <MenuItem value={department._id} key={department._id}>{department.department_name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex flex-wrap py-24"
                    >
                        {data.length === 0 && (
                            <div className="flex flex-1 items-center justify-center">
                                <Typography color="textSecondary" className="text-24 my-24">
                                    No Calendars Found!
                                </Typography>
                            </div>
                        )}

                        {data.map((board) => {
                            const department = departments.find(_cat => _cat.value === board.department);
                            return (
                                <div className=" pb-24 sm:w-1/8 lg:w-1/4 sm:p-8" key={board._id}>
                                    <Card elevation={1} className="flex flex-col h-256 w-256">
                                        <div
                                            className="flex flex-no-shrink items-center justify-between px-24 h-64"
                                            style={{
                                                background: '#B22222',
                                                color     : 'B22222'
                                                // color     : theme.palette.getContrastText(department.color)
                                            }}
                                        >
                                            <Typography className="font-medium truncate" color="inherit">{board.department.department_name}</Typography>
                                            <div className="flex items-center justify-center opacity-75">
                                            </div>

                                        </div>
                                        <Link
                                            to={`/calendars/${board._id}`}
                                            className={classNames(classes.board, "flex flex-col items-center justify-center w-full h-full rounded py-24")}
                                            role="button"

                                        >
                                        <Typography className="text-center text-16 font-400">{board.semester.season+" "+board.semester.year}</Typography>
                                        <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">{board.calendar_status}</Typography>
                                        </Link>

                                        <Divider/>
                                    </Card>
                                </div>
                            )
                        })}
                    </FuseAnimateGroup>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getDepartments    : Actions.getDepartments,
        getBoards       : Actions.getBoards,
        setDepartmentFilter: Actions.setDepartmentFilter,
        setSearchText    : Actions.setBoardsSearchText
    }, dispatch);
}

function mapStateToProps({dashboardApp})
{
    return {
        boards       : dashboardApp.boards.data,
        searchText    : dashboardApp.boards.searchText,
        departments    : dashboardApp.boards.departments,
        departmentFilter: dashboardApp.boards.departmentFilter
    }
}

export default withReducer('dashboardApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Boards)));
