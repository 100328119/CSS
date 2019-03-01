import * as Actions from '../actions';
import _ from '@lodash';

const initialState = {
  data      : [],
  searchText: '',
  roomDialog: {
    type: "new",
    props: { open: false},
    data: null
  }
}

const roomReducer = function( state = initialState, action){
  switch(action.type)
  {
    case Actions.GET_ROOM:
    {
      return {
        ...state,
        data: _.keyBy(action.payload, "_id")
      }
    }
    case Actions.OPEN_NEW_ROOM_DIALOG:
    {
      return {
        ...state,
        roomDialog:{
          type: "new",
          props:{
            open: true
          },
          data: null
        }
      }
    }
    case Actions.CLOSE_NEW_ROOM_DIALOG:
    {
      return {
        ...state,
        roomDialog:{
          type: "new",
          props:{
            open: false
          },
          data: null
        }
      }
    }
    case Actions.OPEN_EDIT_ROOM_DIALOG:
    {
      return {
        ...state,
        roomDialog:{
          type: "edit",
          props:{
            open: true
          },
          data: action.payload
        }
      }
    }
    case Actions.CLOSE_EDIT_ROOM_DIALOG:
    {
      return {
        ...state,
        roomDialog:{
          type: "edit",
          props:{
            open: false
          },
          data: null
        }
      }
    }
    default:
    {
      return state
    }
  }
}

export default roomReducer;
