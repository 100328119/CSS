import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_BUILDING = "[BUILDING APP] GET ALL BUILDING";
export const GET_BUILDING_ORIGIN = "[BUILDING APP] GET BUILDING ORIGIN DATA";
export const OPEN_NEW_BUILDING_DIALOG = '[BUILDING APP] OPEN NEW BUILDING DIALOG';
export const CLOSE_NEW_BUILDING_DIALOG = '[BUILDING APP] CLOSE NEW BUILDING DIALOG';
export const ADD_BUILDING = '[BUILDING APP] ADD NEW BUILDING';
export const OPEN_EDIT_BUILDING_DIALOG = "[BUILDING APP] OPEN EDIT BUILDING DIALOG";
export const CLOSE_EDIT_BUILDING_DIALOG = "[BUILDING APP] CLOSE EDIT BUILDING DIALOG";
export const UPDATE_BUILDING = "[BUILDING APP] UPDATE EXITS BUILDING";
export const REMOVE_BUILDING = "[BUILDING APP] REMOVE BUILDING";
export const SET_SEARCH_TEXT = '[BUILDING APP] SET SEARCH TEXT';

export function getBuilding(){
  const request = axios.get("http://localhost:4000/api/building/");

  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type:GET_BUILDING,
        payload: response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function getBuildingOrigin(){
  const request = axios.get("http://localhost:4000/api/building/");

  return (dispatch)=>{
    request.then(response=>{
      dispatch({
        type:GET_BUILDING_ORIGIN,
        payload: response.data
      })
    }).catch(err=>console.log(err))
  }
}

export function openNewBuildingDialog(){
  return (dispatch)=>{
    dispatch({
      type: OPEN_NEW_BUILDING_DIALOG
    })
  }
}

export function closeNewBuildingDialog(){
  return (dispatch)=>{
    dispatch({
      type: CLOSE_NEW_BUILDING_DIALOG
    })
  }
}

export function addBuilding(building){
  const new_building = {
    type:building.type,
    building_name: building.building_name,
    campus:building.campus._id
  };
  return (dispatch)=>{
    const request = axios.post("http://localhost:4000/api/building/", new_building);

    return request.then((response) => {
      Promise.all([
        dispatch({
          type: ADD_BUILDING
        })
      ]).then(()=> dispatch(getBuilding()));
    })
  }
}

export function openEditBuildingdialog(building){
  return (dispatch)=>{
    dispatch({
      type: OPEN_EDIT_BUILDING_DIALOG,
      payload:building
    })
  }
}

export function closeEditBuildingDialog(){
  return (dispatch)=>{
    dispatch({
      type: CLOSE_EDIT_BUILDING_DIALOG
    })
  }
}

export function editBuilding(building){

  return (dispatch)=>{
    const edit_building = {
      _id:building._id,
      type:building.type,
      building_name: building.building_name,
      campus:building.campus._id
    };
    const request = axios.put("http://localhost:4000/api/building/"+building._id,edit_building);
    return request.then(response=>{
      Promise.all([
        dispatch({
          type:UPDATE_BUILDING
        })
      ]).then(()=>dispatch(getBuilding()))
    })
  }
}

export function removeBuilding(building_id){
  return (dispatch)=>{
    const request = axios.delete("http://localhost:4000/api/building/"+building_id);
    return request.then(response=>{
      Promise.all([
        dispatch({
          type:REMOVE_BUILDING
        })
      ]).then(()=>dispatch(getBuilding()))
    })
  }
}

export function setSearchText(event)
{
  return {
    type: SET_SEARCH_TEXT,
    searchText: event.target.value
  }
}
