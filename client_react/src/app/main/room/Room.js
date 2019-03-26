import React, {Component} from 'react';
import {withStyles, Fab, Icon} from '@material-ui/core';
import {FusePageSimple, FuseAnimate} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import * as Actions from './store/actions';
import * as Building_Actions from '../building/store/actions';
import reducer from './store/reducers';
import RoomList from './Roomlist';
import RoomDialog from './RoomDialog';
import RoomHeader from './RoomHeader';


const styles = theme => ({
    addButton: {
        position: 'absolute',
        right   : 12,
        bottom  : 12,
        zIndex  : 99
    }
});

class RoomApp extends Component {

    componentDidMount()
    {
      this.props.getRoom();
      this.props.getBuildingOrigin();
    }

    render()
    {
        const {classes,openNewRoomDialog} = this.props;
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
                      <RoomList/>
                    }
                    header={
                      <RoomHeader/>
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
                        onClick={openNewRoomDialog}
                    >
                        <Icon>add</Icon>
                    </Fab>
                </FuseAnimate>
                <RoomDialog/>
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      getRoom: Actions.getRoom,
      getBuildingOrigin: Building_Actions.getBuildingOrigin,
      openNewRoomDialog: Actions.openNewRoomDialog
    }, dispatch);
}

function mapStateToProps({RoomApp, BuildingApp})
{
    return {
      room: RoomApp.room.data,
      building: BuildingApp.building.data
    }
}

export default withReducer('RoomApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(RoomApp))));
