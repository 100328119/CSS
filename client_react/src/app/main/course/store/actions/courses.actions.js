import axios from 'axios';
// import { getUserData } from 'app/main/courses/store/actions/user.actions';

export const GET_COURSES = '[COURSES PAGE] GET COURSES';
export const GET_DEPARTMENTS = '[COURSES PAGE] GET DEPARTMENTS';
export const SET_SEARCH_TEXT = '[COURSES PAGE] SET SEARCH TEXT';
export const OPEN_NEW_COURSE_DIALOG = '[COURSES PAGE] OPEN NEW COURSE DIALOG';
export const CLOSE_NEW_COURSE_DIALOG = '[COURSES PAGE] CLOSE NEW COURSE DIALOG';
export const OPEN_EDIT_COURSE_DIALOG = '[COURSES PAGE] OPEN EDIT COURSE DIALOG';
export const CLOSE_EDIT_COURSE_DIALOG = '[COURSES PAGE] CLOSE EDIT COURSE DIALOG';
export const ADD_COURSE = '[COURSES PAGE] ADD COURSE';
export const UPDATE_COURSE = '[COURSES PAGE] UPDATE COURSE';
export const REMOVE_COURSE = '[COURSES PAGE] REMOVE COURSE';


export function getCourses() {
	const req = axios.get('http://localhost:4000/api/course');

	return (dispatch) =>
		req.then((res) =>
			dispatch({
				type: GET_COURSES,
				payload: res.data
			})
		);
}

export function getDepartments(routeParams) {
	const req = axios.get('http://localhost:4000/api/department', {
		params: routeParams
});

	return (dispatch) =>
		req.then((res) =>
			dispatch({
				type: GET_DEPARTMENTS,
				payload: res.data,
				routeParams
			})
		);
}

export function setSearchText(event) {
	return {
		type: SET_SEARCH_TEXT,
		searchText: event.target.value
	}
}

export function openNewCourseDialog() {
	return {
		type: OPEN_NEW_COURSE_DIALOG
	}
}

export function closeNewCourseDialog() {
	return {
		type: CLOSE_NEW_COURSE_DIALOG
	}
}

export function openEditCourseDialog(data) {
	return {
		type: OPEN_EDIT_COURSE_DIALOG,
		data
	}
}

export function closeEditCourseDialog() {
	return {
		type: CLOSE_EDIT_COURSE_DIALOG
	}
}

export function addCourse(course) {
	return (dispatch, getState) => {

		let newCourse = {
			course_name: course.course_name,
			course_tag: course.course_tag,
			course_num: parseInt(course.course_num),
			course_level: parseInt(course.course_level),
			department: course.department._id,
			prerequisites: course.prerequisites
		};

		console.log(course);
		console.log(newCourse);

		const req = axios.post('http://localhost:4000/api/course', newCourse);

		return req.then((res) =>
			Promise.all([
				dispatch({
					type: ADD_COURSE
				})
			]).then(() => dispatch(getCourses()))
		);
	};
}

export function updateCourse(course) {
	return (dispatch, getState) => {

		let editedCourse = {
			course_name: course.course_name,
			course_tag: course.course_tag,
			course_num: parseInt(course.course_num),
			course_level: parseInt(course.course_level),
			department: course.department._id,
			prerequisites: course.prerequisites
		};

		console.log(course);
		console.log(editedCourse);

		const req = axios.put(`http://localhost:4000/api/course/${course._id}`, editedCourse);

		return req.then((res) =>
			Promise.all([
				dispatch({
					type: UPDATE_COURSE
				})
			]).then(() => dispatch(getCourses()))
		);
	};
}

export function removeCourse(courseID) {
	return (dispatch, getState) => {

		const req = axios.delete(`http://localhost:4000/api/course/${courseID}`);

		return req.then((res) =>
			Promise.all([
				dispatch({
					type: REMOVE_COURSE
				})
			]).then(() => dispatch(getCourses()))
		);
	};
}
