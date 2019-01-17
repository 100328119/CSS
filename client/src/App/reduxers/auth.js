import { AUTH_SIGN_UP,AUTH_ERROR,AUTH_SIGN_OUT,AUTH_SIGN_IN } from '../actions/type';
const DEFAULT_STATE = {
  isAuthenticated: false,
  token:'',
  errorMessage: ''
}
export default (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
        //needs to be change register dosen't lead to login
       return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };
    case AUTH_ERROR:
        return { ...state, errorMessage: action.payload };
    case AUTH_SIGN_OUT:
        return { ...state, token: action.payload, isAuthenticated: false, errorMessage: '' };
    case AUTH_SIGN_IN:
        return { ...state, token: action.payload, isAuthenticated: true, errorMessage: '' };
    default:
      return state;
  }
}
