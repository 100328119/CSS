
import _ from '@lodash';
import * as Actions from '../actions';

const initialState = {
	entities: [],
	searchText: '',
	routeParams: {},
	departments: [],
	courseDialog: {
		type: 'new',
		props: {
			open: false
		},
		data: null
	}
};

const coursesReducer = function (state = initialState, action) {
	switch (action.type) {
		case Actions.GET_COURSES:
			{
				return {
					...state,
					entities: _.keyBy(action.payload,'_id'),
					routeParams: action.routeParams
				};
			}
		case Actions.GET_DEPARTMENTS:
			{
				return {
					...state,
					departments: action.payload,
					routeParams: action.routeParams
				};
			}
		case Actions.SET_SEARCH_TEXT:
			{
				return {
					...state,
					searchText: action.searchText
				};
			}
		case Actions.OPEN_NEW_COURSE_DIALOG:
			{
				return {
					...state,
					courseDialog: {
						type: 'new',
						props: {
							open: true
						},
						data: null
					}
				};
			}
		case Actions.CLOSE_NEW_COURSE_DIALOG:
			{
				return {
					...state,
					courseDialog: {
						type: 'new',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		case Actions.OPEN_EDIT_COURSE_DIALOG:
			{
				return {
					...state,
					courseDialog: {
						type: 'edit',
						props: {
							open: true
						},
						data: action.data
					}
				};
			}
		case Actions.CLOSE_EDIT_COURSE_DIALOG:
			{
				return {
					...state,
					courseDialog: {
						type: 'edit',
						props: {
							open: false
						},
						data: null
					}
				};
			}
		default:
			{
				return state;
			}
	}
};

export default coursesReducer;
