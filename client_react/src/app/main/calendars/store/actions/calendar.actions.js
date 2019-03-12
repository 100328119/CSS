import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const NEW_CALENDAR = '[CALENDARS APP]CREATE NEW CALENDAR';
export const GET_CALENDAR = '[CALENDAR APP] GET EXIST CALENDAR';
export const SAVE_CALENDAR = '[CALENDAR APP] SAVE NEW CALENDAR';
export const UPDATE_CALENDAR = '[CALENDAR APP] UPDATE EXIST CALENDAR';

export function newCalendar()
{
  const new_calendar = {
    type:'calendar',
    semester: {
      season:'',
      year:''
    },
    owner:'',
    department:'',
    sections:[],
    calendar_status:'In Progress'
  }
  return (dispatch)=>{
    dispatch({
      type  : NEW_CALENDAR,
      payload : new_calendar
    })
  }
}

export function saveCalendar(calendar,uuid)
{
  const calendar_to_save = {
    type: 'calendar',
    semester:calendar.semester._id,
    owner:uuid,
    department: calendar.department._id,
    sections:calendar.sections,
    calendar_status:calendar.calendar_status
  }
  const request = axios.post("http://localhost:4000/api/calendar",calendar_to_save);
  return (dispatch)=>{
    request.then(response=>{
      console.log(response.data);
      dispatch(showMessage({message: 'Calendar is Created'}))
      dispatch({
        type:SAVE_CALENDAR,
        payload:response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function getCalender(calendar_id)
{
  const request = axios.get("http://localhost:4000/api/calendar/"+calendar_id);
  return (dispatch)=>{
    request.then(response =>{
      dispatch({
        type  : GET_CALENDAR,
        payload : response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function updateCalendar(calendar)
{
  const calendar_to_update = {
    type: 'calendar',
    semester:calendar.semester._id,
    department: calendar.department._id,
    sections:calendar.sections,
    calendar_status:calendar.calendar_status
  }
  const request = axios.put("http://localhost:4000/api/calendar/"+calendar._id,calendar_to_update);
  return (dispatch)=>{
    request.then(response=>{
      console.log(response.data);
      dispatch(showMessage({message: 'Calendar is Update'}))
      dispatch({
        type:UPDATE_CALENDAR,
        payload:response.data
      })
    }).catch(err=>console.log(err))
  }
}
