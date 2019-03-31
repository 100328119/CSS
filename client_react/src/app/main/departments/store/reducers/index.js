import {combineReducers} from 'redux';
import departments from './departments.reducer';
import user from './user.reducer';

const reducer = combineReducers({
    departments,
    user
});

export default reducer;
