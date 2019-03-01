import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import InstructorsList from './InstructorsList';
import InstructorsHeader from './InstructorsHeader';
import InstructorsSidebarContent from './InstructorsSidebarContent';
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

class InstructorsApp extends Component {

    componentDidMount()
    {
        this.props.getInstructors();
    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getInstructors(this.props.match.params);
        }
    }

    render()
    {
        const {classes, openNewInstructorDialog} = this.props;

        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <InstructorsHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <InstructorsList/>
                    }
                    sidebarInner
                    onRef={instance => {
                        this.pageLayout = instance;
                    }}
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getInstructors         : Actions.getInstructors,
        openNewInstructorDialog: Actions.openNewInstructorDialog
    }, dispatch);
}

function mapStateToProps({instructorsApp})
{
    return {
        instructors          : instructorsApp.instructors.entities,
        searchText        : instructorsApp.instructors.searchText
    }
}

export default withReducer('instructorsApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(InstructorsApp))));
