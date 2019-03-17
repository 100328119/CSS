import React, {Component} from 'react';
import {withStyles, Fab, Icon, List, ListItem, ListItemText, Card, CardContent, Typography, Select, MenuItem, Chip, Button} from '@material-ui/core';
import {FuseAnimateGroup, FusePageCarded,FuseAnimate, FuseScrollbars} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import withReducer from 'app/store/withReducer';
import _ from '@lodash';
import classNames from 'classnames';
import * as Actions from './store/actions';
import reducer from './store/reducers';
import CourseDialog from './CourseDialog';

const styles = theme => ({

	addButton: {
		position: 'absolute',
		right   : 12,
		bottom  : 12,
		zIndex  : 99
	}
});

class CoursesPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			department: '5c51e3c644c13b0421bb3277'
		};
		// This binding is necessary to make `this` work in the callback
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount()
  {
		this.props.getCourses();
		this.props.getDepartments(this.props.match.params);
  }

	componentDidUpdate(prevProps, prevState)
  {
    if ( !_.isEqual(this.props.location, prevProps.location) )
    {
      this.props.getCourses();
    }
  }

	handleClick = (id) => (event) => {
		const courses = this.props.courses;
		console.log(id);
		Object.entries(courses).forEach(course => {
			if(id === course[1]._id) {
				return this.props.openEditCourseDialog(course[1]);
			}
		});
	}

	handleChange(event) {
		// var formValues = this.state.formValues;
		// formValues[event.target.name] = event.target.value;
		// console.log(formValues);
		// this.setState(formValues);
		this.setState(_.set({
			...this.state
		}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
	}

	render()
	{
    const {classes, openNewCourseDialog, openEditCourseDialog, departments, courses} = this.props;
		const { department } = this.state;

    return (
			<FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
							<div className="flex flex-1 w-full items-center justify-between">

							<div className="flex items-center">
									<FuseAnimate animation="transition.expandIn" delay={300}>
											<Icon className="text-32 mr-0 sm:mr-12">shopping_basket</Icon>
									</FuseAnimate>
									<FuseAnimate animation="transition.slideLeftIn" delay={300}>
											<Typography className="hidden sm:flex" variant="h6">Courses</Typography>
									</FuseAnimate>
							</div>

							<div className="flex flex-1 items-center justify-center px-12">
							<Select
								className="mb-24"
								label="Department"
								id="department"
								name="department"
								value={this.state.department}
								onChange={this.handleChange}
								variant="outlined"	>
							{departments.map(dept => {
								return(
									<MenuItem key={dept._id} value = {dept._id}>{dept.department_name}</MenuItem>
								);
							})
							}
							</Select>
							</div>
					</div>
            }
            content={
							<div className="w-full flex flex-col">

								<div className = "mt-12" >
									<div className = "w-full  mx-auto" >
									<FuseAnimateGroup enter = {{animation: "transition.slideUpBigIn"}} className = "flex items-center justify-center " >
									<div className = "w-full max-w-320 p-12" >

									{/* <Card className = "relative" >
									<div className = "pt-48 pb-24 text-center" >
									<Typography variant = "subtitle1" color = "inherit" className = "text-20 font-medium" >
									Year 1
									</Typography>
									</div>
									<CardContent className = "text-center p-0" >
									<div className = "flex flex-col p-12" > {
										Object.entries(courses).map(course => {
											if(course[1].department._id === department && course[1].course_level === 1000) {
											return (
												<Button id={course[1]._id} className='mb-8' key={course[1].course_name} onClick={this.handleClick(course[0])}	>
													{`${course[1].course_tag} ${course[1].course_num} ${course[1].course_name}`}
												</Button>
											);
											}
										})
										}
									</div>
									</CardContent>
									</Card> */}

									<List className="border border-black rounded h-512 overflow-y-scroll ">
										<FuseScrollbars className="flex-grow overflow-x-auto">
										<ListItem>
      				    		<ListItemText primary= "Year 1" />
      	 						</ListItem>
										 {
										Object.entries(courses).map(course => {
											if(course[1].department._id === department && course[1].course_level === 1000) {
											return (
												<ListItem button id={course[1]._id} key={course[1].course_name} onClick={this.handleClick(course[0])}	>
													<ListItemText primary={`${course[1].course_tag} ${course[1].course_num} ${course[1].course_name}`} />
											 </ListItem>
											);
											}
										})
										}
									</FuseScrollbars>
									</List>
									</div>

									<div className = "w-full max-w-320 p-12 relative" >
									<List className="border border-black rounded h-512 overflow-y-scroll">
										<FuseScrollbars className="flex-grow overflow-x-auto">
										<ListItem>
      				    		<ListItemText primary="Year 2" />
      	 						</ListItem>
										 {
										Object.entries(courses).map(course => {
											if(course[1].department._id === department && course[1].course_level === 2000) {
											return (
												<ListItem button id={course[1]._id} key={course[1].course_name} onClick={this.handleClick(course[0])}	>
													<ListItemText primary={`${course[1].course_tag} ${course[1].course_num} ${course[1].course_name}`} />
											 </ListItem>
											);
											}
										})
										}
									</FuseScrollbars>
									</List>
									</div>

									<div className = "w-full max-w-320 p-12" >
									<List className="border border-black rounded h-512 overflow-y-scroll ">
										<FuseScrollbars className="flex-grow overflow-x-auto">
										<ListItem>
      				    		<ListItemText primary="Year 3" />
      	 						</ListItem>
										 {
										Object.entries(courses).map(course => {
											if(course[1].department._id === department && course[1].course_level === 3000) {
											return (
												<ListItem button id={course[1]._id} key={course[1].course_name} onClick={this.handleClick(course[0])}	>
													<ListItemText primary={`${course[1].course_tag} ${course[1].course_num} ${course[1].course_name}`} />
											 </ListItem>
											);
											}
										})
										}
									</FuseScrollbars>
									</List>
									</div>

									<div className = "w-full max-w-320 p-12" >
									<List className="border border-black rounded h-512 overflow-y-scroll relative">
										<FuseScrollbars className="flex-grow overflow-x-auto">
										<ListItem>
      				    		<ListItemText primary="Year 4" />
      	 						</ListItem>
										 {
										Object.entries(courses).map(course => {
											if(course[1].department._id === department && course[1].course_level === 4000) {
											return (
												<ListItem button id={course[1]._id} key={course[1].course_name} onClick={this.handleClick(course[0])}	>
													<ListItemText primary={`${course[1].course_tag} ${course[1].course_num} ${course[1].course_name}`} />
											 </ListItem>
											);
											}
										})
										}
									</FuseScrollbars>
									</List>
									</div>
									</FuseAnimateGroup>
									</div>
									</div>
									<FuseAnimate animation="transition.expandIn" delay={300}>
												<Fab
														color="primary"
														aria-label="add"
														className={classes.addButton}
														onClick={openNewCourseDialog}
												>
												<Icon>add</Icon>
												</Fab>
										</FuseAnimate>
							<CourseDialog/>

							</div>
            }
            innerScroll
					/>
    );
	}
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
			getCourses         	: Actions.getCourses,
			getDepartments     	: Actions.getDepartments,
			openNewCourseDialog	: Actions.openNewCourseDialog,
			openEditCourseDialog: Actions.openEditCourseDialog
    }, dispatch);
}

function mapStateToProps({coursesPage})
{
    return {
				courses			:	coursesPage.courses.entities,
				departments	:	coursesPage.courses.departments

    }
}

export default withReducer('coursesPage', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(CoursesPage))));
