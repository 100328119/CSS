import {combineReducers} from 'redux';
import fuse from './fuse';
import auth from 'app/auth/store/reducers';
import CampusApp from 'app/main/campus/store/reducers';
import BuildingApp from 'app/main/building/store/reducers';
import DepartmentApp from 'app/main/departments/store/reducers';
import SemesterApp from 'app/main/semester/store/reducers';
import quickPanel from 'app/fuse-layouts/shared-components/quickPanel/store/reducers';

const createReducer = (asyncReducers) =>
    combineReducers({
        auth,
        fuse,
        quickPanel,
        CampusApp,
        BuildingApp,
        DepartmentApp,
        SemesterApp,
        ...asyncReducers
    });

export default createReducer;
