import * as Actions from '../actions';
import _ from '@lodash'

const initialState = {
    data      : [],
    searchText: '',
    semesterDialog: {
      type: "new",
      props: { open: false},
      data: null
    }
};

const semesterReducer = function (state = initialState, action){
  switch(action.type)
  {
    case Actions.GET_SEMESTER:
    {
      return{
        ...state,
        data:action.payload
      }
    }
    case Actions.OPEN_NEW_SEMESTER_DIALOG:
    {
      return{
        ...state,
        semesterDialog:{
          type:"new",
          props:{open: true},
          data:null
        }
      }
    }
    case Actions.CLOSE_NEW_SEMESTER_DIALOG:
    {
      return {
        ...state,
        semesterDialog:{
          type:"new",
          props:{open:false},
          data:null
        }
      }
    }
    case Actions.OPEN_EDIT_SEMESTER_DIALOG:
    {
      return {
        ...state,
        semesterDialog:{
          type:"edit",
          props:{open:true},
          data:action.payload
        }
      }
    }
    case Actions.CLOSE_EDIT_SEMESTER_DIALOG:
    {
      return{
        ...state,
        semesterDialog:{
          type:"edit",
          props:{open:false},
          data:null
        }
      }
    }
    case Actions.SET_SEARCH_TEXT:
    {
      return{
        ...state,
        searchText: action.searchText
      }
    }
    default:
    {
      return state
    }
  }
}

export default semesterReducer;
