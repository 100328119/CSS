import * as Actions from '../actions';

const initialState = {
    data: null,
    admins_data: null
};

const userReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_USER:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.SAVE_USER:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.GET_ADMINS:
        {
            return {
                ...state,
                admins_data: action.payload
            };
        }
        default:
        {
            return state;
        }
    }
};

export default userReducer;
