import * as Actions from '../actions';
import _ from '@lodash'

const initialState = {
    data      : [],
    searchText: '',
    campusDialog: {
      type: "new",
      props: { open: false},
      data: null
    }
};

const campusReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CAMPUS:
        {
            return {
                ...state,
                data: _.keyBy(action.payload, "_id")
            };
        }
        case Actions.GET_CAMPUS_ORIGIN:
        {
          return {
            ...state,
            data:action.payload
          }
        }
        case Actions.SET_CAMPUS_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.OPEN_NEW_CAMPUS_DIALOG:
        {
          return {
            ...state,
            campusDialog:{
              type: "new",
              props: {open: true},
              data: null
            }
          };
        }
        case Actions.CLOSE_NEW_CAMPUS_DIALOG:
        {
          return {
            ...state,
            campusDialog:{
              type: "new",
              props: {open: false},
              data: null
            }
          }
        }
        case Actions.OPEN_EDIT_CAMPUS_DIALOG:
        {
          return{
            ...state,
            campusDialog:{
              type:"edit",
              props:{
                open: true
              },
              data: action.payload
            }
          }
        }
        case Actions.CLOSE_EDIT_CAMPUS_DIAOG:
        {
          return{
            ...state,
            campusDialog:{
              type:'edit',
              props:{
                open: false
              },
              data: null
            }
          }
        }
        default:
        {
            return state;
        }
    }
};

export default campusReducer;
