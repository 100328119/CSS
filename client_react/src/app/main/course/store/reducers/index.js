import {combineReducers} from 'redux';
import courses from './courses.reducers';

const reducer = combineReducers({
	courses
});

export default reducer;
