import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : [],
    orignal_entities  : [],
    searchText        : '',
    departmentDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const departmentsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_DEPARTMENTS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, '_id')
            };
        }
        case Actions.GET_DEPARTMENTS_ORIGNAL:
        {
            return {
                ...state,
                orignal_entities   : action.payload
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.OPEN_NEW_DEPARTMENT_DIALOG:
        {
            return {
                ...state,
                departmentDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_DEPARTMENT_DIALOG:
        {
            return {
                ...state,
                departmentDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_DEPARTMENT_DIALOG:
        {
            return {
                ...state,
                departmentDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_DEPARTMENT_DIALOG:
        {
            return {
                ...state,
                departmentDialog: {
                    type : 'edit',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        default:
        {
            return state;
        }
    }
};

export default departmentsReducer;
