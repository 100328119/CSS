import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_SEMESTER = '[SEMESTER APP] GET SEMESTER';
export const OPEN_NEW_SEMESTER_DIALOG = '[SEMESTER APP] OPEN NEW SEMESTER DIALOG';
export const CLOSE_NEW_SEMESTER_DIALOG = '[SEMESTER APP] CLOSE NEW SEMESTER DIALOG';
export const OPEN_EDIT_SEMESTER_DIALOG = '[SEMESTER APP] OPEN EDIT SEMESTER DIALOG';
export const CLOSE_EDIT_SEMESTER_DIALOG = '[SEMESTER APP] CLOSE EDIT SEMESTER DIALOG';
export const ADD_SEMSERT = '[SEMESTER APP] ADD NEW SEMESTER';
export const EDIT_SEMESTER = '[SEMESTER APP] EDIT SEMESTER';
export const REMOVE_SEMESTER = '[SEMESTER APP] REMOVE SEMESTER';

export function getSemester(){
  const request = axios.get("http://localhost:4000/api/semester/");

  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type:GET_SEMESTER,
        payload: response.data
      })
    })
  }
}

export function openNewSemesterDialog(){
  return (dispatch)=>{
    dispatch({
      type:OPEN_NEW_SEMESTER_DIALOG
    })
  }
}

export function closeNewSemesterDialog(){
  return (dispatch)=>{
    dispatch({
      type:CLOSE_NEW_SEMESTER_DIALOG
    })
  }
}

export function addSemester(data){
  delete data._id;
  const request = axios.post("http://localhost:4000/api/semester/",data);

  return (dispatch)=>{
    request.then(response=>{
      Promise.all([
        dispatch({
          type:ADD_SEMSERT,
          payload:response.data
        })
      ]).then(()=>dispatch(getSemester()))
    }).catch(err=>console.log(err))
  }
}

export function openEditSemesterDialog(data){
  return (dispatch)=>{
    dispatch({
      type:OPEN_EDIT_SEMESTER_DIALOG,
      payload:data
    })
  }
}

export function closeEditSemesterDialog(){
  return (dispatch)=>{
    dispatch({
      type:CLOSE_EDIT_SEMESTER_DIALOG
    })
  }
}

export function editSemester(data){
  const request = axios.put("http://localhost:4000/api/semester/"+data._id,data);

  return (dispatch)=>{
    request.then(response=>{
      Promise.all([
        dispatch({
          type:EDIT_SEMESTER,
          payload:response.data
        })
      ]).then(()=>dispatch(getSemester()))
    }).catch(err=>console.log(err))
  }
}

export function removeSemester(semester_id){
  const request = axios.delete("http://localhost:4000/api/semester/"+semester_id);
  return (dispatch)=>{
    request.then(response=>{
      Promise.all([
        dispatch({
          type:REMOVE_SEMESTER
        })
      ]).then(()=>dispatch(getSemester()))
    }).catch(err=>console.log(err))
  }
}
