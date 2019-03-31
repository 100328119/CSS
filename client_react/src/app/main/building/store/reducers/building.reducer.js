import * as Actions from '../actions';
import _ from '@lodash'

const initialState = {
    data      : [],
    searchText: '',
    buildingDialog: {
      type: "new",
      props: { open: false},
      data: null
    }
};

const buildingReducer = function (state = initialState, action){
  switch(action.type)
  {
    case Actions.GET_BUILDING:
    {
      return {
        ...state,
        data: _.keyBy(action.payload, "_id")
      }
    }
    case Actions.GET_BUILDING_ORIGIN:
    {
      return {
        ...state,
        data: action.payload
      }
    }
    case Actions.OPEN_NEW_BUILDING_DIALOG:
    {
      return {
        ...state,
        buildingDialog:{
          type:"new",
          props:{ open: true},
          data: null
        }
      }
    }
    case Actions.CLOSE_NEW_BUILDING_DIALOG:
    {
      return {
        ...state,
        buildingDialog:{
          type:"new",
          props:{
            open: false
          },
          data:null
        }
      }
    }
    case Actions.OPEN_EDIT_BUILDING_DIALOG:
    {
      return {
        ...state,
        buildingDialog:{
          type:"edit",
          props:{
            open:true
          },
          data: action.payload
        }
      }
    }
    case Actions.CLOSE_EDIT_BUILDING_DIALOG:
    {
      return{
        ...state,
        buildingDialog:{
          type:'edit',
          props:{
            open:false
          },
          data: null
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

export default buildingReducer;
