import axios from "axios";

export const GET_EVENTS = "[CALENDAR APP] GET EVENTS";
export const OPEN_NEW_EVENT_DIALOG = "[CALENDAR APP] OPEN NEW EVENT DIALOG";
export const CLOSE_NEW_EVENT_DIALOG = "[CALENDAR APP] CLOSE NEW EVENT DIALOG";
export const OPEN_EDIT_EVENT_DIALOG = "[CALENDAR APP] OPEN EDIT EVENT DIALOG";
export const CLOSE_EDIT_EVENT_DIALOG = "[CALENDAR APP] CLOSE EDIT EVENT DIALOG";
export const ADD_EVENT = "[CALENDAR APP] ADD EVENT";
export const UPDATE_EVENT = "[CALENDAR APP] UPDATE EVENT";
export const REMOVE_EVENT = "[CALENDAR APP] REMOVE EVENT";
export const GET_COURSES = "[CALENDAR APP] GET COURSES";
export const GET_INSTRUCTORS = "[CALENDAR APP] GET INSTRUCTORS";
export const GET_ROOMS = "[CALENDAR APP] GET ROOM";
// export const GET_COURSE = "[CALENDAR APP] GET COURSE";

export function getEvents(calendar_id) {
  const request = axios.get(
    "http://localhost:4000/api/calendar/" + calendar_id
  );
  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: GET_EVENTS,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
  };
}

export function getCourses() {
  const request = axios.get("http://localhost:4000/api/course/");
  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: GET_COURSES,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
  };
}
export function getInstructors() {
  const request = axios.get("http://localhost:4000/api/instructor/");
  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: GET_INSTRUCTORS,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
  };
}
export function getRooms() {
  const request = axios.get("http://localhost:4000/api/room/");
  return dispatch => {
    request
      .then(response => {
        dispatch({
          type: GET_ROOMS,
          payload: response.data
        });
      })
      .catch(err => console.log(err));
  };
}
// export function getCourse(course_id) {
//   const request = axios.get("http://localhost:4000/api/course/" + course_id);
//   return dispatch => {
//     request
//       .then(response => {
//         dispatch({
//           type: GET_COURSE,
//           payload: response.data
//         });
//       })
//       .catch(err => console.log(err));
//   };
// }

export function openNewEventDialog(data) {
  return {
    type: OPEN_NEW_EVENT_DIALOG,
    data
  };
}

export function closeNewEventDialog() {
  return {
    type: CLOSE_NEW_EVENT_DIALOG
  };
}

export function openEditEventDialog(data) {
  return {
    type: OPEN_EDIT_EVENT_DIALOG,
    data
  };
}

export function closeEditEventDialog() {
  return {
    type: CLOSE_EDIT_EVENT_DIALOG
  };
}

export function addEvent(newEvent) {
  return (dispatch, getState) => {
    const calendar = getState().CalendarApp.events.calendar;
    delete newEvent._id;
    const request = axios.post(
      "http://localhost:4000/api/calendar/" + calendar._id,
      newEvent
    );

    return request.then(response =>
      Promise.all([
        dispatch({
          type: ADD_EVENT
        })
      ]).then(() => dispatch(getEvents(calendar._id)))
    );
  };
}

export function updateEvent(section) {
  return (dispatch, getState) => {
    let calendar = getState().CalendarApp.events.calendar;
    const request = axios.put(
      "http://localhost:4000/api/calendar/" + calendar._id + "/" + section._id,
      section
    );

    return request.then(response => {
      console.log(response.data);
      Promise.all([
        dispatch({
          type: UPDATE_EVENT
        })
      ]).then(() => dispatch(getEvents(calendar._id)));
    });
  };
}

export function removeEvent(eventId) {
  return (dispatch, getState) => {
    const sections = getState().CalendarApp.events.calendar.sections;
    let calendar = getState().CalendarApp.events.calendar;
    const request = axios.delete(
      "http://localhost:4000/api/calendar/" + calendar._id + "/" + eventId
    );

    return request.then(response =>
      Promise.all([
        dispatch({
          type: REMOVE_EVENT
        })
      ]).then(() => dispatch(getEvents(calendar._id)))
    );
  };
}
