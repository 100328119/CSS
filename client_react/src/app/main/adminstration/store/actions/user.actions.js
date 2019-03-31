import axios from 'axios';
import {FuseUtils} from '@fuse';
import {showMessage} from 'app/store/actions/fuse';

export const GET_USER = "[AMIN APP] GET USER";
export const GET_ADMINS = "[AMIN APP] GET ADMINS";
export const SAVE_USER = '[AMIN APP] SAVE USER';

export function getUser(user){
  //ajax call
  const request = axios.get("http://localhost:4000/secure/user/"+user.userId);

  return (dispatch)=>
    request.then(user=>{
      console.log(user)
      dispatch({
        type : GET_USER,
        payload : user.data
      })
    });
}

export function getAdmins(){
  const request = axios.get("http://localhost:4000/api/admin")

  return (dispatch)=>
    request.then(admins=>{
      dispatch({
        type : GET_ADMINS,
        payload : admins.data
      })
    });

}

export function saveUser(data,newUser){
  //ajax call
  if(newUser === "new"){
    save_new_user(data);
  }else{
    update_user(data);
  }

}

export function save_new_user(data){
  const {pd, c_pd} = data;
  if(pd != c_pd){
    return (dispatch)=>{dispatch(showMessage({message: 'Passwords are NOT matched'}))};
  }else{
    const new_user = {
      user_name:data.user_name,
      email:data.email,
      password:data.pd,
      full_name:{
        first_name:data.full_name.first_name,
        last_name:data.full_name.last_name
      },
      admin:data.admin._id
    }
    console.log(new_user);
    const request = axios.post("http://localhost:4000/secure/register", new_user);
    return (dispatch)=>{
        request.then(response=>{
          dispatch(showMessage({message: 'User is Created'}))
          dispatch({
            type : SAVE_USER,
            payload : response.data
          })
        }).catch(err=>console.log(err));
      }
  }
}

export function update_user(data){
  const user = {
    user_name:data.user_name,
    email:data.email,
    full_name:{
      first_name:data.full_name.first_name,
      last_name:data.full_name.last_name
    },
    admin:data.admin._id
  }
  const request = axios.put("http://localhost:4000/secure/user/"+data._id, user);
  return (dispatch)=>{
      request.then(response=>{
        dispatch(showMessage({message: 'User is Updated'}))
        dispatch({
          type : SAVE_USER,
          payload : response.data
        })
      }).catch(err=>console.log(err));
    }
}

export function newUser(){
  //data format
  const data = {
    admin:{
      role:"",
      _id:""
    },
    email:"",
    user_name:"",
    full_name:{
      first_name:"",
      last_name:""
    },
    pd:"",
    c_pd:""
  };

  return {
    type : GET_USER,
    payload: data
  }
}
