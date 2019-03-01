import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_CAMPUS = "[CAMPUS APP] GET CAMPUS";
export const GET_CAMPUS_ORIGIN = '[CAMPUS APP] GET CAMPUS ORIGIN';
export const SAVE_CAMPUS = '[CAMPUS APP] SAVE CAMPUS';
export const SELECT_CAMPUS = '[CAMPS APP] SELECT CAMPUS';
export const OPEN_NEW_CAMPUS_DIALOG = "[CAMPS APP] OPEN NEW CAMPUS DIALOG";
export const CLOSE_NEW_CAMPUS_DIALOG = "[CAMPS APP] CLOSE NEW CAMPUS DIALOG";
export const OPEN_EDIT_CAMPUS_DIALOG = "[CAMPS APP] OPEN EDIT CAMPUS DIALOG";
export const CLOSE_EDIT_CAMPUS_DIAOG = "[CAMPS APP] CLOSE EDIT CAMPUS DIALOG";
export const SET_CAMPUS_SEARCH_TEXT = '[CAMPUS APP] SET CAMPUS SEARCH TEXT';
export const ADD_CAMPUS = "[CAMPUS APP] ADD NEW CAMPUS";
export const UPDATE_CAMPUS = "[CAMPUS APP] EDIT CAMPUS";
export const REMOVE_CAMPUS = "[CAMPUS APP] REMOVE CAMPUS"

export function getCampus(){
  const request = axios.get("http://localhost:4000/api/campus/");
  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type:GET_CAMPUS,
        payload: response.data
      })
    })
  }
}

export function getCampusOrigin(){
  const request = axios.get("http://localhost:4000/api/campus/");
  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type:GET_CAMPUS_ORIGIN,
        payload: response.data
      })
    })
  }
}

export function openNewCampusDialog(){
  return (dispatch)=>{
    dispatch({
      type:OPEN_NEW_CAMPUS_DIALOG
    })
  }
}

export function closeNewCampusDialog(){
  return (dispatch)=>{
    dispatch({
      type:CLOSE_NEW_CAMPUS_DIALOG
    })
  }
}

export function addCampus(campus){
   return (dispatch)=>{
     const request = axios.post("http://localhost:4000/api/campus/",campus);

     return request.then(response=>{
        Promise.all([
          dispatch({
              type: ADD_CAMPUS
          })
        ]).then(()=>dispatch(getCampus()));
     })
   }
}

export function openEditCampusDialog(campus){
  return (dispatch)=>{
    dispatch({
      type: OPEN_EDIT_CAMPUS_DIALOG,
      payload: campus
    })
  }
}

export function closeEditCampusDialog(){
  return (dispatch)=>{
    dispatch({
      type: CLOSE_EDIT_CAMPUS_DIAOG
    })
  }
}

export function updateCampus(campus){
  return (dispatch)=>{
    const campus_id = campus._id;
    const request = axios.put("http://localhost:4000/api/campus/"+campus_id,campus);

    return request.then(response =>{
      Promise.all([
        dispatch({
          type: UPDATE_CAMPUS
        })
      ]).then(()=>dispatch(getCampus()))
    })
  }
}

export function removeCampus(campus_id){
  return (dispatch)=>{
    const request = axios.delete("http://localhost:4000/api/campus/"+campus_id);

    return request.then(response=>{
      Promise.all([
        dispatch({
          type:REMOVE_CAMPUS
        })
      ]).then(()=>dispatch(getCampus()))
    })
  }
}
