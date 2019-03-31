import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import DepartmentsList from './DepartmentsList';
import DepartmentsHeader from './DepartmentsHeader';
import DepartmentDialog from './DepartmentDialog';
import * as Actions from './store/actions';
import reducer from './store/reducers';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class DepartmentsApp extends Component {

    componentDidMount()
    {
        this.props.getDepartments();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getDepartments(this.props.match.params);
        }
    }

    render()
    {
        const {classes, openNewDepartmentDialog} = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <DepartmentsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <DepartmentsList/>
                    }

                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
                <FuseAnimate animation="transition.expandIn" delay={300}>
                    <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={openNewDepartmentDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <DepartmentDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getDepartments         : Actions.getDepartments,
        openNewDepartmentDialog: Actions.openNewDepartmentDialog
    }, dispatch);
}

function mapStateToProps({departmentsApp})
{
    return {
        departments          : departmentsApp.departments.entities,
        searchText        : departmentsApp.departments.searchText,
    }
}

export default withReducer('departmentsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(DepartmentsApp))));
