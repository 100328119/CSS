import axios from 'axios';
import {getUserData} from 'app/main/departments/store/actions/user.actions';

export const GET_DEPARTMENTS = '[DEPARTMENTS APP] GET DEPARTMENTS';
export const GET_DEPARTMENTS_ORIGNAL = '[DEPARTMENT APP] GET DEPARTMENT ORIGNAL';
export const SET_SEARCH_TEXT = '[DEPARTMENTS APP] SET SEARCH TEXT';
export const OPEN_NEW_DEPARTMENT_DIALOG = '[DEPARTMENTS APP] OPEN NEW DEPARTMENT DIALOG';
export const CLOSE_NEW_DEPARTMENT_DIALOG = '[DEPARTMENTS APP] CLOSE NEW DEPARTMENT DIALOG';
export const OPEN_EDIT_DEPARTMENT_DIALOG = '[DEPARTMENTS APP] OPEN EDIT DEPARTMENT DIALOG';
export const CLOSE_EDIT_DEPARTMENT_DIALOG = '[DEPARTMENTS APP] CLOSE EDIT DEPARTMENT DIALOG';
export const ADD_DEPARTMENT = '[DEPARTMENTS APP] ADD DEPARTMENT';
export const UPDATE_DEPARTMENT = '[DEPARTMENTS APP] UPDATE DEPARTMENT';
export const REMOVE_DEPARTMENT = '[DEPARTMENTS APP] REMOVE DEPARTMENT';

export function getDepartments()
{
    const request = axios.get("http://localhost:4000/api/department/");

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_DEPARTMENTS,
                payload: response.data
            })
        });
}

export function getDepartmentsOrignal()
{
    const request = axios.get("http://localhost:4000/api/department/");

    return (dispatch) =>
        request.then((response) =>{
            dispatch({
                type   : GET_DEPARTMENTS_ORIGNAL,
                payload: response.data
            })
        });
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}


export function openNewDepartmentDialog()
{
    return {
        type: OPEN_NEW_DEPARTMENT_DIALOG
    }
}

export function closeNewDepartmentDialog()
{
    return {
        type: CLOSE_NEW_DEPARTMENT_DIALOG
    }
}

export function openEditDepartmentDialog(data)
{
    return {
        type: OPEN_EDIT_DEPARTMENT_DIALOG,
        data
    }
}

export function closeEditDepartmentDialog()
{
    return {
        type: CLOSE_EDIT_DEPARTMENT_DIALOG
    }
}

export function addDepartment(newDepartment)
{
    return (dispatch) => {
        const request = axios.post("http://localhost:4000/api/department/", newDepartment);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: ADD_DEPARTMENT
                })
            ]).then(() => dispatch(getDepartments()))
        );
    };
}

export function updateDepartment(department)
{
    console.log(department)
    return (dispatch) => {

        const request = axios.put('http://localhost:4000/api/department/'+department._id, department);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: UPDATE_DEPARTMENT
                })
            ]).then(() => dispatch(getDepartments()))
        );
    };
}

export function removeDepartment(departmentId)
{
    return (dispatch) => {
        const request = axios.delete('http://localhost:4000/api/department/'+departmentId);

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_DEPARTMENT
                })
            ]).then(() => dispatch(getDepartments()))
        );
    };
}
