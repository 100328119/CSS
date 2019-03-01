import axios from 'axios';
import {getUserData} from 'app/main/instructors/store/actions/user.actions';

export const GET_INSTRUCTORS = '[INSTRUCTORS APP] GET INSTRUCTORS';
export const SET_SEARCH_TEXT = '[INSTRUCTORS APP] SET SEARCH TEXT';
export const TOGGLE_IN_SELECTED_INSTRUCTORS = '[INSTRUCTORS APP] TOGGLE IN SELECTED INSTRUCTORS';
export const SELECT_ALL_INSTRUCTORS = '[INSTRUCTORS APP] SELECT ALL INSTRUCTORS';
export const DESELECT_ALL_INSTRUCTORS = '[INSTRUCTORS APP] DESELECT ALL INSTRUCTORS';
export const OPEN_NEW_INSTRUCTOR_DIALOG = '[INSTRUCTORS APP] OPEN NEW INSTRUCTOR DIALOG';
export const CLOSE_NEW_INSTRUCTOR_DIALOG = '[INSTRUCTORS APP] CLOSE NEW INSTRUCTOR DIALOG';
export const OPEN_EDIT_INSTRUCTOR_DIALOG = '[INSTRUCTORS APP] OPEN EDIT INSTRUCTOR DIALOG';
export const CLOSE_EDIT_INSTRUCTOR_DIALOG = '[INSTRUCTORS APP] CLOSE EDIT INSTRUCTOR DIALOG';
export const ADD_INSTRUCTOR = '[INSTRUCTORS APP] ADD INSTRUCTOR';
export const UPDATE_INSTRUCTOR = '[INSTRUCTORS APP] UPDATE INSTRUCTOR';
export const REMOVE_INSTRUCTOR = '[INSTRUCTORS APP] REMOVE INSTRUCTOR';
export const REMOVE_INSTRUCTORS = '[INSTRUCTORS APP] REMOVE INSTRUCTORS';
export const TOGGLE_STARRED_INSTRUCTOR = '[INSTRUCTORS APP] TOGGLE STARRED INSTRUCTOR';
export const TOGGLE_STARRED_INSTRUCTORS = '[INSTRUCTORS APP] TOGGLE STARRED INSTRUCTORS';
export const SET_INSTRUCTORS_STARRED = '[INSTRUCTORS APP] SET INSTRUCTORS STARRED ';

export function getInstructors()
{
    const request = axios.get("http://localhost:4000/api/instructor/");

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_INSTRUCTORS,
                payload: response.data
            })
        );
}

export function setSearchText(event)
{
    return {
        type      : SET_SEARCH_TEXT,
        searchText: event.target.value
    }
}

export function toggleInSelectedInstructors(instructorId)
{
    return {
        type: TOGGLE_IN_SELECTED_INSTRUCTORS,
        instructorId
    }
}


export function selectAllInstructors()
{
    return {
        type: SELECT_ALL_INSTRUCTORS
    }
}

export function deSelectAllInstructors()
{
    return {
        type: DESELECT_ALL_INSTRUCTORS
    }
}


export function openNewInstructorDialog()
{
    return {
        type: OPEN_NEW_INSTRUCTOR_DIALOG
    }
}

export function closeNewInstructorDialog()
{
    return {
        type: CLOSE_NEW_INSTRUCTOR_DIALOG
    }
}

export function openEditInstructorDialog(data)
{
    return {
        type: OPEN_EDIT_INSTRUCTOR_DIALOG,
        data
    }
}

export function closeEditInstructorDialog()
{
    return {
        type: CLOSE_EDIT_INSTRUCTOR_DIALOG
    }
}

// export function addInstructor(newInstructor)
// {
//     // return (dispatch, getState) => {
//     //
//     //     const {routeParams} = getState().instructorsApp.instructors;
//     //
//     //     const request = axios.post('/api/instructors-app/add-instructor', {
//     //         newInstructor
//     //     });
//     //
//     //     return request.then((response) =>
//     //         Promise.all([
//     //             dispatch({
//     //                 type: ADD_INSTRUCTOR
//     //             })
//     //         ]).then(() => dispatch(getInstructors(routeParams)))
//     //     );
//     // };
// }

export function updateInstructor(instructor)
{
    // return (dispatch, getState) => {
    //
    //     const {routeParams} = getState().instructorsApp.instructors;
    //
    //     const request = axios.post('/api/instructors-app/update-instructor', {
    //         instructor
    //     });
    //
    //     return request.then((response) =>
    //         Promise.all([
    //             dispatch({
    //                 type: UPDATE_INSTRUCTOR
    //             })
    //         ]).then(() => dispatch(getInstructors(routeParams)))
    //     );
    // };
}

export function removeInstructor(instructorId)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/remove-instructor', {
            instructorId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_INSTRUCTOR
                })
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}


export function removeInstructors(instructorIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/remove-instructors', {
            instructorIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_INSTRUCTORS
                }),
                dispatch({
                    type: DESELECT_ALL_INSTRUCTORS
                })
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}

export function toggleStarredInstructor(instructorId)
{
    return (dispatch, getState) => {
        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/toggle-starred-instructor', {
            instructorId
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_INSTRUCTOR
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}

export function toggleStarredInstructors(instructorIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/toggle-starred-instructors', {
            instructorIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_INSTRUCTORS
                }),
                dispatch({
                    type: DESELECT_ALL_INSTRUCTORS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}

export function setInstructorsStarred(instructorIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/set-instructors-starred', {
            instructorIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_INSTRUCTORS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_INSTRUCTORS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}

export function setInstructorsUnstarred(instructorIds)
{
    return (dispatch, getState) => {

        const {routeParams} = getState().instructorsApp.instructors;

        const request = axios.post('/api/instructors-app/set-instructors-unstarred', {
            instructorIds
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_INSTRUCTORS_STARRED
                }),
                dispatch({
                    type: DESELECT_ALL_INSTRUCTORS
                }),
                dispatch(getUserData())
            ]).then(() => dispatch(getInstructors(routeParams)))
        );
    };
}
