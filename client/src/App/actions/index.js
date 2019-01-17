/*
 ActionCreator -> create Actions -> dispatched -> middlewares -> reducers
*/
import axios from 'axios';
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN } from './type';
export const signUp = (data) =>{
  return  async dispatch => {
    /*
      Step 1) use the data and to make HTTP request to our BE and send it along
      Step 2) Take the BE's response (JWT is here now)
      Step 3) dispatch user just signed up with JWT
      Step 4) Save jwt into our localstorage
    */
    try{
      const res = await axios.post('http://localhost:4000/secure/register',data);
      console.log('result', res);
      dispatch({
        type: AUTH_SIGN_UP,
        payload:res.data.token
      })
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }catch(err){
      dispatch({
        type: AUTH_ERROR,
        payload: "EMAIL IS EXIST"
      });
      console.error('error', err);
    }
  }
}

export const signOut = () => {
  return dispatch => {
    localStorage.removeItem('JWT_TOKEN');
    axios.defaults.headers.common['Authorization'] = '';
    dispatch({
      type: AUTH_SIGN_OUT,
      payload: ''
    })
  };
}

export const login = (data) => {
  return async dispatch => {
    try{
      const res = await axios.post('http://localhost:4000/secure/signin',data);
      dispatch({
        type: AUTH_SIGN_IN,
        payload:res.data.token
      })
      localStorage.setItem('JWT_TOKEN', res.data.token);
      axios.defaults.headers.common['Authorization'] = res.data.token;
    }catch(err){
      dispatch({
        type: AUTH_ERROR,
        payload: "Incorrect Email or Password"
      });
    }
  };
}
