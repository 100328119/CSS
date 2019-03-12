import * as Actions from '../actions';

const initialState = {
  data: null,
  department_data: null,
  course_by_department: null,
  vetted_course_update: null,
  vetCourseDialog:{
    type:"new",
    props:{
      open:false,
      index:null
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
            index:null
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
          props:{open:false,index:null},
          data: null
        }
      }
    }
    case Actions.OPEN_EDIT_VET_COURSE_DIALOG:
    {
      return{
        ...state,
        vetCourseDialog:{
          type: 'edit',
          props:{
            open:true,
            index: action.index
          },
          data: action.payload
        }
      }
    }
    case Actions.CLOSE_EDIT_VET_COURSE_DIALOG:
    {
      return{
        ...state,
        vetCourseDialog:{
          type:'edit',
          props:{open:false,index:null},
          data: null
        }
      }
    }
    case Actions.ADD_VET_COURSE:
    {
      return{
        ...state,
        data: action.payload,
        vetted_course_update:action.vetted_course_update
      }
    }
    case Actions.EDIT_VET_COURSE:
    {
      return{
        ...state,
        data: action.payload,
        vetted_course_update:action.vetted_course_update
      }
    }
    case Actions.REMOVE_VET_COURSE:
    {
        return{
          ...state,
          data: action.payload,
          vetted_course_update:action.vetted_course_update
        }
    }
    default:
    {
      return state
    }

  }
}

export default instructorReducer;
