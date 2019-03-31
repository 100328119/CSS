import * as Actions from "../actions";
import _ from "@lodash";
const initialState = {
  instructors: [],
  courses: [],
  course: [],
  calendar: null,
  entities: [],
  eventDialog: {
    type: "new",
    props: {
      open: false
    },
    data: null
  },
  routeParams: {},
  rooms: []
};

const eventsReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_EVENTS: {
      const entities = action.payload.sections.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      action.payload.sections = entities;
      return {
        ...state,
        calendar: action.payload
      };
    }
    case Actions.OPEN_NEW_EVENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "new",
          props: {
            open: true
          },
          data: {
            ...action.data
          }
        }
      };
    }
    case Actions.CLOSE_NEW_EVENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "new",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.OPEN_EDIT_EVENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "edit",
          props: {
            open: true
          },
          data: {
            ...action.data,
            start: new Date(action.data.start),
            end: new Date(action.data.end)
          }
        }
      };
    }
    case Actions.CLOSE_EDIT_EVENT_DIALOG: {
      return {
        ...state,
        eventDialog: {
          type: "edit",
          props: {
            open: false
          },
          data: null
        }
      };
    }
    case Actions.GET_COURSES: {
      return {
        ...state,
        courses: _.keyBy(action.payload, "_id"),
        routeParams: action.routeParams
      };
    }
    case Actions.GET_INSTRUCTORS: {
      return {
        ...state,
        instructors: _.keyBy(action.payload, "_id"),
        routeParams: action.routeParams
      };
    }
    case Actions.GET_ROOMS: {
      return {
        ...state,
        rooms: _.keyBy(action.payload, "_id")
      };
    }
    default: {
      return state;
    }
  }
};

export default eventsReducer;
