import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import * as Actions from './store/actions';
import * as Campus_Actions from '../campus/store/actions';
import reducer from './store/reducers';
import BuildingList from './BuildingList';
import BuildingDialog from './BuildingDialog';
import BuildingHeader from './BuildingHeader';

const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class BuildingApp extends Component {

    componentDidMount()
    {
      this.props.getBuilding();
      this.props.getCampusOrigin();
    }

    render()
    {
        const {classes,openNewBuildingDialog} = this.props;
        return (
            <React.Fragment>
                <FusePageSimple
                    classes={{
                        contentCardWrapper: "p-16 sm:p-24 pb-80",
                        leftSidebar       : "w-256 border-0",
                        header            : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                    }}
                    sidebarInner
                    content={
                      <BuildingList/>
                    }
                    header={
                      <BuildingHeader/>
                    }
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
                        onClick={openNewBuildingDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <BuildingDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getBuilding: Actions.getBuilding,
      getCampusOrigin: Campus_Actions.getCampusOrigin,
      openNewBuildingDialog: Actions.openNewBuildingDialog
    }, dispatch);
}

function mapStateToProps({BuildingApp,CampusApp})
{
    return {
      building: BuildingApp.building.data,
      campus: CampusApp.campus.data
    }
}

export default withReducer('BuildingApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(BuildingApp))));
