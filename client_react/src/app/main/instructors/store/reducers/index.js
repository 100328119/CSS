import {combineReducers} from 'redux';
import instructors from './instructors.reducer';
import instructor from './instructor.reducer';
import user from './user.reducer';

const reducer = combineReducers({
    instructors,
    instructor,
    user
});

export default reducer;
