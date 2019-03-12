import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_INSTRUCTOR = '[INSTRUCTOR APP] GET INSTRUCTOR';
export const GET_DEPARTMENT = '[INSTRUCTOR APP] GET DEPARTMENT';// will be remove after integrate
export const GET_COURSE_BY_DEPARTMENT = '[INSTRUCTOR APP] GET COURSE';
export const ADD_INSTRUCTOR = '[INSTRUCTOR APP] ADD INSTRUCTOR';
export const EDIT_INSTRUCTOR = '[INSTRUCTOR APP] EDIT INSTRUCTOR';
export const OPEN_NEW_VET_COURSE_DIALOG = '[INSTRUCTOR APP] OPEN NEW VET COURSE DIALOG';
export const CLOSE_NEW_VET_COURSE_DIALOG = '[INSTRUCTOR APP] CLOSE NEW VET COURSE DIALOG';
export const OPEN_EDIT_VET_COURSE_DIALOG = "[INSTRUCTOR APP] OPEN EDIT VET COURSE DIALOG";
export const CLOSE_EDIT_VET_COURSE_DIALOG = '[INSTRUCTOR APP] CLOSE EDIT VET COURSE DIALOG';
export const ADD_VET_COURSE = '[INSTRUCTOR APP] ADD VET COURSE';
export const EDIT_VET_COURSE = '[INSTRUCTOR APP] EDIT VET COURSE';
export const REMOVE_VET_COURSE = '[INSTRUCTOR APP] REMOVE VET COURSE';


export function getInstructor(prof_id){
  const request = axios.get("http://localhost:4000/api/instructor/"+prof_id);
  return (dispatch)=>
    request.then(prof=>{
      dispatch({
        type : GET_INSTRUCTOR,
        payload : prof.data
      })
    });
}

export function getDepartment(){
  const request = axios.get("http://localhost:4000/api/department/");
  return (dispatch)=>{
    request.then(department=>{
      dispatch({
        type : GET_DEPARTMENT,
        payload : department.data
      })
    });
  }
}

export function getCourseByDepartment(department_id){
  const request = axios.get("http://localhost:4000/api/course/department/"+department_id);
  return (dispatch)=>{
    request.then(course=>{
      dispatch({
        type:GET_COURSE_BY_DEPARTMENT,
        payload:course.data
      })
    })
  }
}

export function addInstructor(data = null){
  let new_instructor = {};
  if(data !== null ){
     new_instructor = {
      department:data.department._id,
      first_name: data.first_name,
      last_name: data.last_name,
      prof_id: data.prof_id,
      prof_type:data.prof_type,
      max_course:data.max_course,
      vetted_course:data.vetted_course
    }
  }
  const request = axios.post("http://localhost:4000/api/instructor/",new_instructor);
  return (dispatch) =>{
    request.then((response)=>{
      dispatch(showMessage({message: 'New Instructor is Created!'}));
      dispatch({
        type:ADD_INSTRUCTOR,
        payload:response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function editInstructor(data = null){
  let edit_instructor = {};
  if(data !== null ){
     edit_instructor = {
      department:data.department._id,
      first_name: data.first_name,
      last_name: data.last_name,
      prof_id: data.prof_id,
      prof_type:data.prof_type,
      max_course:data.max_course,
      vetted_course:data.vetted_course
    }
  }

  const request = axios.put("http://localhost:4000/api/instructor/"+data._id,edit_instructor);
  return (dispatch)=>{
    request.then((response) => {
      dispatch(showMessage({message: 'New Instructor is Updated!'}));
      dispatch({
        type:EDIT_INSTRUCTOR,
        payload:response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function newInstructor(){
  //data format
  const default_department={
    department_name:"business",
    _id:"5c51e3c644c13b0421bb3278"
  };
  const data = {
    department:default_department,
    first_name:"",
    last_name:"",
    prof_id:"",
    prof_type:"",
    max_course:"",
    vetted_course:[],
  };
  return (dispatch)=>{
    dispatch({
      type:GET_INSTRUCTOR,
      payload: data
    })
  }
}

export function openNewVetCourseDialog(){
  return (dispatch)=>{
    dispatch({
      type:OPEN_NEW_VET_COURSE_DIALOG
    })
  }
}

export function closeNewVetCourseDialog(){
  return (dispatch)=>{
    dispatch({
      type:CLOSE_NEW_VET_COURSE_DIALOG
    })
  }
}

export function openEditVetCourseDialog(data,index){
  return (dispatch)=>{
    dispatch({
      type:OPEN_EDIT_VET_COURSE_DIALOG,
      payload: data,
      index: index
    })
  }
}

export function closeEditVetCourseDialog(){
  return (dispatch)=>{
    dispatch({
      type: CLOSE_EDIT_VET_COURSE_DIALOG
    })
  }
}


export function addVetCourse(data){
  return (dispatch,getState)=>{
    let state = getState().instructorsApp.instructor.data;
    state.vetted_course.push(data.course);
    dispatch({
      type:ADD_VET_COURSE,
      payload: state,
      vetted_course_update: data.course
    })
  }
}

export function editVetCourse(data,index){
  return (dispatch,getState)=>{
    let state = getState().instructorsApp.instructor.data;
    console.log("current state",state);
    state.vetted_course[index] = data.course;
    console.log("after add course", state);
    dispatch({
      type:EDIT_VET_COURSE,
      payload: state,
      vetted_course_update: data.course
    })
  }
}



export function removeVetCourse(course_index){
  return (dispatch,getState)=>{
    let state = getState().instructorsApp.instructor.data
    delete state.vetted_course[course_index];
    dispatch({
      type: REMOVE_VET_COURSE,
      payload: state,
      vetted_course_update: course_index
    })
  }
}
