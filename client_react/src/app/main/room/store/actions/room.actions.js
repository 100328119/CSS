import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_ROOM = '[ROOM APP] GET ALL ROOM';
export const OPEN_NEW_ROOM_DIALOG = '[ROOM APP] OPEN NEW ROOM DIALOG';
export const CLOSE_NEW_ROOM_DIALOG = '[ROOM APP] CLOSE NEW ROOM DIALOH';
export const OPEN_EDIT_ROOM_DIALOG = "[ROOM APP] OPEN EDIT ROOM DIALOG";
export const CLOSE_EDIT_ROOM_DIALOG = "[ROOM APP] CLOSE EDIT ROOM DIALOG";
export const ADD_ROOM = '[ROOM APP] ADD NEW ROOM';
export const EDIT_ROOM = '[ROOM APP] EDIT ROOM';
export const REMOVE_ROOM = '[ROOM APP] REMOVE ROOM';

export function getRoom(){
  const request = axios.get("http://localhost:4000/api/room/");

  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type: GET_ROOM,
        payload:response.data
      })
    })
  }
}

export function openNewRoomDialog(){
  return (dispatch)=>{
    dispatch({
      type:OPEN_NEW_ROOM_DIALOG
    })
  }
}

export function closeNewRoomDialog(){
  return(dispatch)=>{
    dispatch({
      type:CLOSE_NEW_ROOM_DIALOG
    })
  }
}

export function openEditRoomDialog(data){
  return (dispatch)=>{
    dispatch({
      type:OPEN_EDIT_ROOM_DIALOG,
      payload: data
    })
  }
}

export function closeEditRoomDialog(){
  return(dispatch)=>{
    dispatch({
      type:CLOSE_EDIT_ROOM_DIALOG
    })
  }
}

export function addRoom(data){
  const new_room = {
    room_num: data.room_num,
    floor:  data.floor,
    equipment: data.equipment,
    building: data.building._id
  }
  const request = axios.post("http://localhost:4000/api/room/", new_room);
  return (dispatch)=>{
    return request.then(response=>{
      Promise.all([
        dispatch(
          {
            type:ADD_ROOM
          })
      ]).then(()=>dispatch(getRoom()))
    })
  }
}

export function editRoom(data){
  const edit_room = {
    room_num: data.room_num,
    floor:  data.floor,
    equipment: data.equipment,
    building: data.building._id
  }
  const request = axios.put("http://localhost:4000/api/room/"+data._id, edit_room);
  return (dispatch)=>{
    return request.then(response=>{
      Promise.all([
        dispatch(
          {
            type:EDIT_ROOM
          })
      ]).then(()=>dispatch(getRoom()))
    })
  }
}

export function removeRoom(room_id){
  const request = axios.delete("http://localhost:4000/api/room/"+room_id);
  return (dispatch)=>{
    return request.then(response=>{
        Promise.all([
          dispatch({
            type:REMOVE_ROOM
          })
        ]).then(()=>dispatch(getRoom()))
    })
  }
}
