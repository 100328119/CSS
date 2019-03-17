import axios from 'axios';

export const GET_EVENTS = '[CALENDAR APP] GET EVENTS';
export const OPEN_NEW_EVENT_DIALOG = '[CALENDAR APP] OPEN NEW EVENT DIALOG';
export const CLOSE_NEW_EVENT_DIALOG = '[CALENDAR APP] CLOSE NEW EVENT DIALOG';
export const OPEN_EDIT_EVENT_DIALOG = '[CALENDAR APP] OPEN EDIT EVENT DIALOG';
export const CLOSE_EDIT_EVENT_DIALOG = '[CALENDAR APP] CLOSE EDIT EVENT DIALOG';
export const ADD_EVENT = '[CALENDAR APP] ADD EVENT';
export const UPDATE_EVENT = '[CALENDAR APP] UPDATE EVENT';
export const REMOVE_EVENT = '[CALENDAR APP] REMOVE EVENT';

export function getEvents(calendar_id)
{
  const data = [
        {
            id    : 0,
            title : 'All Day Event very long title',
            allDay: true,
            start : new Date(2018, 3, 0),
            end   : new Date(2018, 3, 1)
        },
        {
            id   : 1,
            title: 'Long Event',
            start: new Date(2018, 3, 7),
            end  : new Date(2018, 3, 10)
        },

        {
            id   : 2,
            title: 'DTS STARTS',
            start: new Date(2019, 2, 13, 0, 0, 0),
            end  : new Date(2019, 2, 20, 0, 0, 0)
        },

        {
            id   : 3,
            title: 'DTS ENDS',
            start: new Date(2019, 10, 6, 0, 0, 0),
            end  : new Date(2019, 10, 13, 0, 0, 0)
        },

        {
            id   : 4,
            title: 'Some Event',
            start: new Date(2018, 3, 9, 0, 0, 0),
            end  : new Date(2018, 3, 9, 0, 0, 0)
        },
        {
            id   : 5,
            title: 'Conference',
            start: new Date(2018, 3, 11),
            end  : new Date(2018, 3, 13),
            desc : 'Big conference for important people'
        },
        {
            id   : 6,
            title: 'Meeting',
            start: new Date(2018, 3, 12, 10, 30, 0, 0),
            end  : new Date(2018, 3, 12, 12, 30, 0, 0),
            desc : 'Pre-meeting meeting, to prepare for the meeting'
        },
        {
            id   : 7,
            title: 'Lunch',
            start: new Date(2018, 3, 12, 12, 0, 0, 0),
            end  : new Date(2018, 3, 12, 13, 0, 0, 0),
            desc : 'Power lunch'
        },
        {
            id   : 8,
            title: 'Meeting',
            start: new Date(2018, 3, 12, 14, 0, 0, 0),
            end  : new Date(2018, 3, 12, 15, 0, 0, 0)
        },
        {
            id   : 9,
            title: 'Happy Hour',
            start: new Date(2018, 3, 12, 17, 0, 0, 0),
            end  : new Date(2018, 3, 12, 17, 30, 0, 0),
            desc : 'Most important meal of the day'
        },
        {
            id   : 10,
            title: 'Dinner',
            start: new Date(2018, 3, 12, 20, 0, 0, 0),
            end  : new Date(2018, 3, 12, 21, 0, 0, 0)
        },
        {
            id   : 11,
            title: 'Birthday Party',
            start: new Date(2018, 3, 13, 7, 0, 0),
            end  : new Date(2018, 3, 13, 10, 30, 0)
        },
        {
            id   : 12,
            title: 'Late Night Event',
            start: new Date(2018, 3, 17, 19, 30, 0),
            end  : new Date(2018, 3, 18, 2, 0, 0)
        },
        {
            id   : 13,
            title: 'Multi-day Event',
            start: new Date(2018, 3, 20, 19, 30, 0),
            end  : new Date(2018, 3, 22, 2, 0, 0)
        }
    ];
    const request = axios.get('http://localhost:4000/api/calendar/'+ calendar_id);
    return (dispatch) =>{
          request.then(response=>{
            dispatch({
                type   : GET_EVENTS,
                payload: response.data
            })
          }).catch(err => console.log(err))
      }

}


export function openNewEventDialog(data)
{
    return {
        type: OPEN_NEW_EVENT_DIALOG,
        data
    }
}

export function closeNewEventDialog()
{
    return {
        type: CLOSE_NEW_EVENT_DIALOG
    }
}

export function openEditEventDialog(data)
{
    return {
        type: OPEN_EDIT_EVENT_DIALOG,
        data
    }
}

export function closeEditEventDialog()
{
    return {
        type: CLOSE_EDIT_EVENT_DIALOG
    }
}


export function addEvent(newEvent)
{
    return (dispatch, getState) => {
      const calendar = getState().CalendarApp.events.calendar;
      delete newEvent._id;
        const request = axios.post('http://localhost:4000/api/calendar/'+ calendar._id, newEvent);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_EVENT
                })
            ]).then(() => dispatch(getEvents(calendar._id)))
        );
    };
}

export function updateEvent(section)
{
    return (dispatch, getState) => {
      let calendar = getState().CalendarApp.events.calendar;
        const request = axios.put('http://localhost:4000/api/calendar/'+ calendar._id+'/'+section._id, section);

        return request.then((response) =>{
          console.log(response.data);
            Promise.all([
                dispatch({
                    type: UPDATE_EVENT
                })
            ]).then(() => dispatch(getEvents(calendar._id)))
        });
    };
}

export function removeEvent(eventId)
{
    return (dispatch, getState) => {

      const sections = getState().CalendarApp.events.calendar.sections;
      let calendar = getState().CalendarApp.events.calendar;
        const request = axios.delete('http://localhost:4000/api/calendar/'+ calendar._id+'/'+eventId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_EVENT
                })
            ]).then(() => dispatch(getEvents(calendar._id)))
        );
    };
}
