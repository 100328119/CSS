import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import SemesterList from './SemesterList';
import SemesterDialog from './SemesterDialog';
import SemesterHeader from './SemesterHeader';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class SemesterApp extends Component {

    componentDidMount()
    {
        // this.props.getContacts(this.props.match.params);

        this.props.getSemester();

    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getSemester();
        }
    }

    render()
    {
        const {classes,openNewSemesterDialog} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                      <SemesterHeader/>
                    }
                    content={
                        <SemesterList/>
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
                        onClick={openNewSemesterDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <SemesterDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getSemester: Actions.getSemester,
      openNewSemesterDialog: Actions.openNewSemesterDialog
    }, dispatch);
}

function mapStateToProps({SemesterApp})
{
    return {
      semesters: SemesterApp.semester.data
    }
}

export default withReducer('SemesterApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(SemesterApp))));
