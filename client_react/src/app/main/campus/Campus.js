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
import CampusList from './CampusList';
import CampusDialog from './CampusDialog';
import CampusHeader from './CampusHeader';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class CampusApp extends Component {

    componentDidMount()
    {
        // this.props.getContacts(this.props.match.params);

        this.props.getCampus();

    }

    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.location, prevProps.location) )
        {
            this.props.getCampus();
        }
    }

    render()
    {
        const {classes,openNewCampusDialog} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    header={
                        <CampusHeader pageLayout={() => this.pageLayout}/>
                    }
                    content={
                        <CampusList/>
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
                        onClick={openNewCampusDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <CampusDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCampus: Actions.getCampus,
        openNewCampusDialog: Actions.openNewCampusDialog
    }, dispatch);
}

function mapStateToProps({CampusApp})
{
    return {
      campus: CampusApp.campus.data
    }
}

export default withReducer('CampusApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CampusApp))));
