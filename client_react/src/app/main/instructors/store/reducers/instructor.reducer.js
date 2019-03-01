import * as Actions from '../actions';

const initialState = {
  data: null,
  department_data: null,
  course_by_department: null,
  vetCourseDialog:{
    type:"new",
    props:{
      open:false,
      department_id:null
    },
    data:null
  }
}

const instructorReducer = function (state = initialState, action){
  switch (action.type) {
    case Actions.GET_INSTRUCTOR:
    {
      return {
        ...state,
        data: action.payload
      }
    }
    case Actions.GET_DEPARTMENT:
    {
      return {
        ...state,
        department_data: action.payload
      }
    }
    case Actions.GET_COURSE_BY_DEPARTMENT:
    {
      return {
        ...state,
        course_by_department: action.payload
      }
    }
    case Actions.ADD_INSTRUCTOR:
    {
      return{
        ...state,
        data:action.payload
      }
    }
    case Actions.EDIT_INSTRUCTOR:
    {
      return{
        ...state,
        data:action.payload
      }
    }
    case Actions.OPEN_NEW_VET_COURSE_DIALOG:
    {
      return{
        ...state,
        vetCourseDialog:{
          type: 'new',
          props:{
            open:true,
            department_id:action.payload
          },
          data: null
        }
      }
    }
    case Actions.CLOSE_NEW_VET_COURSE_DIALOG:
    {
      return{
        ...state,
        vetCourseDialog:{
          type:'new',
          props:{open:false,department_id:null},
          data: null
        }
      }
    }
    case Actions.ADD_VET_COURSE:
    {
      return{
        ...state,
        data: action.payload
      }
    }
    case Actions.REMOVE_VET_COURSE:
    {
        return{
          ...state,
          data: action.payload
        }
    }
    default:
    {
      return state
    }

  }
}

export default instructorReducer;
