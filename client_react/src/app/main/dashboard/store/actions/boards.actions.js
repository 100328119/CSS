import axios from 'axios';

export const GET_BOARDS = '[DASHBOARD APP] GET BOARDS';
export const GET_DEPARTMENTS = '[DASHBOARD APP] GET DEPARTMENTS';
export const SET_BOARDS_SEARCH_TEXT = '[DASHBOARD APP] SET BOARDS SEARCH TEXT';
export const SET_BOARDS_DEPARTMENT_FILTER = '[DASHBOARD APP] SET BOARDS DEPARTMENT FILTER';

export function getBoards()
{
    const request = axios.get("http://localhost:4000/api/calendar/");

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
    const request = axios.get("http://localhost:4000/api/department/");

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
    console.log(event.target.value);
    return {
        type    : SET_BOARDS_DEPARTMENT_FILTER,
        department: event.target.value
    }
}
