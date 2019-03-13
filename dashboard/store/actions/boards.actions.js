import axios from 'axios';

export const GET_BOARDS = '[ACADEMY APP] GET BOARDS';
export const GET_DEPARTMENTS = '[ACADEMY APP] GET DEPARTMENTS';
export const SET_BOARDS_SEARCH_TEXT = '[ACADEMY APP] SET BOARDS SEARCH TEXT';
export const SET_BOARDS_DEPARTMENT_FILTER = '[ACADEMY APP] SET BOARDS DEPARTMENT FILTER';

export function getBoards()
{
    const request = axios.get('/api/dashboard-app/boards');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_BOARDS,
                payload: response.data
            })
        );
}

export function getDepartments()
{
    const request = axios.get('/api/dashboard-app/departments');

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_DEPARTMENTS,
                payload: response.data
            })
        );
}

export function setBoardsSearchText(event)
{
    return {
        type      : SET_BOARDS_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function setDepartmentFilter(event)
{
    return {
        type    : SET_BOARDS_DEPARTMENT_FILTER,
        department: event.target.value
    }
}
