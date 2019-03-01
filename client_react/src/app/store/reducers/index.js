import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import CampusApp from 'app/main/campus/store/reducers';
import BuildingApp from 'app/main/building/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        CampusApp,
        BuildingApp,
        ...asyncReducers
    });

export default createReducer;
