import * as Actions from '../actions';

const initialState = {
    data          : [],
    departments    : [],
    searchText    : '',
    departmentFilter: 'all'
};

const boardsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_BOARDS:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_DEPARTMENTS:
        {
            return {
                ...state,
                departments: action.payload
            };
        }
        case Actions.SET_BOARDS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.SET_BOARDS_DEPARTMENT_FILTER:
        {
            return {
                ...state,
                departmentFilter: action.department
            };
        }
        default:
        {
            return state;
        }
    }
};

export default boardsReducer;
