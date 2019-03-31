import {combineReducers} from 'redux';
import boards from './boards.reducer';

const reducer = combineReducers({
    boards,
});

export default reducer;
