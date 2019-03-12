import * as Actions from '../actions';

const initialState = {
  calendar_data: null,
  calendars_data: null
}

const calendarReducer = function ( state = initialState, action){
  switch( action.type)
  {
    case Actions.NEW_CALENDAR:
    {
      return{
        ...state,
        calendar_data: action.payload
      }
    }
    case Actions.SAVE_CALENDAR:
    {
      return {
        ...state,
        calendar_data: action.payload
      }
    }
    case Actions.GET_CALENDAR:
    {
      return {
        ...state,
        calendar_data: action.payload
      }
    }
    default:
    {
      return state
    }
  }
}

export default calendarReducer;
