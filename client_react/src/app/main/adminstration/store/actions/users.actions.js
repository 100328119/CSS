import axios from 'axios';

export const GET_USERS = '[ADMIN APP] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[ADMIN APP] SET USERS SEARCH TEXT';


//GET ALL ALL USERS
export function getUsers()
{
      const request = axios.get('http://localhost:4000/secure/users');
      console.log(request);
      return (dispatch) =>
          request.then((response) =>
              dispatch({
                  type   : GET_USERS,
                  payload: response.data
              })
          );
}

//SET USER TABKLE SEARCH VALUE
export function setUsersSearchText(event)
{
    return {
        type      : SET_USERS_SEARCH_TEXT,
        searchText: event.target.value
    }
}
