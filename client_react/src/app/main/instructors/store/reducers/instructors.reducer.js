import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
    entities          : [],
    searchText        : '',
    selectedInstructorIds: [],
    routeParams       : {},
    instructorDialog     : {
        type : 'new',
        props: {
            open: false
        },
        data : null
    }
};

const instructorsReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_INSTRUCTORS:
        {
            return {
                ...state,
                entities   : _.keyBy(action.payload, '_id'),
            };
        }
        case Actions.SET_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.TOGGLE_IN_SELECTED_INSTRUCTORS:
        {

            const instructorId = action.instructorId;

            let selectedInstructorIds = [...state.selectedInstructorIds];

            if ( selectedInstructorIds.find(id => id === instructorId) !== undefined )
            {
                selectedInstructorIds = selectedInstructorIds.filter(id => id !== instructorId);
            }
            else
            {
                selectedInstructorIds = [...selectedInstructorIds, instructorId];
            }

            return {
                ...state,
                selectedInstructorIds: selectedInstructorIds
            };
        }
        case Actions.SELECT_ALL_INSTRUCTORS:
        {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedInstructorIds = arr.map(instructor => instructor.id);

            return {
                ...state,
                selectedInstructorIds: selectedInstructorIds
            };
        }
        case Actions.DESELECT_ALL_INSTRUCTORS:
        {
            return {
                ...state,
                selectedInstructorIds: []
            };
        }
        case Actions.OPEN_NEW_INSTRUCTOR_DIALOG:
        {
            return {
                ...state,
                instructorDialog: {
                    type : 'new',
                    props: {
                        open: true
                    },
                    data : null
                }
            };
        }
        case Actions.CLOSE_NEW_INSTRUCTOR_DIALOG:
        {
            return {
                ...state,
                instructorDialog: {
                    type : 'new',
                    props: {
                        open: false
                    },
                    data : null
                }
            };
        }
        case Actions.OPEN_EDIT_INSTRUCTOR_DIALOG:
        {
            return {
                ...state,
                instructorDialog: {
                    type : 'edit',
                    props: {
                        open: true
                    },
                    data : action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_INSTRUCTOR_DIALOG:
        {
            return {
                ...state,
                instructorDialog: {
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

export default instructorsReducer;
