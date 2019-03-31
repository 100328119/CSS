import axios from 'axios';

export const GET_USER_DATA = '[DEPARTMENTS APP] GET USER DATA';

export function getUserData()
{
    const request = axios.get('/api/departments-app/user');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_USER_DATA,
                payload: response.data
            })
        );
}
