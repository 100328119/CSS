import React, {Component} from 'react';
import {withStyles, Fab, Icon, Card, CardContent, Typography, Select, MenuItem, Chip, Button} from '@material-ui/core';
import {FuseAnimateGroup, FuseAnimate} from '@fuse';
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
  badge : {
    backgroundColor: theme.palette.error.main,
    color          : theme.palette.getContrastText(theme.palette.error.main)
	},
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
			<React.Fragment>
				<div className={classNames(classes.root, "flex flex-col flex-auto flex-no-shrink items-center justify-center p-32")}>
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

            <div className = "-mt-192" >
            	<div className = "w-full max-w-2xl mx-auto" >
            	<FuseAnimateGroup enter = {{animation: "transition.slideUpBigIn"}} className = "flex items-center justify-center flex-wrap" >
							<div className = "w-full max-w-320 sm:w-1/4 p-12" >
            	<Card className = "relative" >
            	<div className = "pt-48 pb-24 text-center" >
            	<Typography variant = "subtitle1" color = "inherit" className = "text-20 font-medium" >
            	Year 1
							</Typography>
							</div>
							<CardContent className = "text-center p-0" >
            	<div className = "flex flex-col p-32" > {
            		/* courses.y1.map(course => {
            			return ( <Typography variant = "subtitle1" className = "mb-8" key = {course} >
										{course}
										<button name = {"y1 " + course}
            				onClick = {this.removeCourse} >
										X
										</button>
										</Typography>
            			);
								}) */
								// console.log(Object.entries(courses))
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
							</Card>
							</div>


							<div className = "w-full max-w-320 sm:w-1/4 p-12" >
            	<Card className = "relative" >
            	<div className = "pt-48 pb-24 text-center" >
            	<Typography variant = "subtitle1" color = "inherit" className = "text-20 font-medium" >
            	Year 2
							</Typography>
							</div>
							<CardContent className = "text-center p-0" >
            	<div className = "flex flex-col p-32" > {
            		/* courses.y2.map(course => {
            			return ( <Typography variant = "subtitle1" className = "mb-8" key = {course} >
										{course}
										<button name = {"y2 " + course} onClick = {this.removeCourse} >
										X
										</button>
										</Typography>
            			);
								}) */
								Object.entries(courses).map(course => {
									if(course[1].department._id === department && course[1].course_level === 2000) {
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
							</Card>
							</div>

            	<div className = "w-full max-w-320 sm:w-1/4 p-12" >
            	<Card className = "relative" >
            	<div className = "pt-48 pb-24 text-center" >
            	<Typography variant = "subtitle1" color = "inherit" className = "text-20 font-medium" >
            	Year 3
							</Typography>
							</div>
							<CardContent className = "text-center p-0" >
							<div className = "flex flex-col p-32" >
							{	/* courses.y3.map(course => {
									return ( <Typography variant = "subtitle1" className = "mb-8" key = {course}
									onClick={ () => {
										openEditCourseDialog();
									}}>
										{course}
										<button name = {"y3 " + course} onClick = {this.removeCourse} >
										X
										</button>
										</Typography>
            			);
								}) */
								Object.entries(courses).map(course => {
									if(course[1].department._id === department && course[1].course_level === 3000) {
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
							</Card>
							</div>

            	<div className = "w-full max-w-320 sm:w-1/4 p-12" >
            	<Card className = "relative" >
            	<div className = "pt-48 pb-24 text-center" >
            	<Typography variant = "subtitle1" color = "inherit" className = "text-20 font-medium" >
            	Year 4
							</Typography>
							</div>
							<CardContent className = "text-center p-0" >
							<div className = "flex flex-col p-32" >
							{	/* courses.y4.map(course => {
            			return ( <Typography variant = "subtitle1" className = "mb-8"
										key = {course}>
										{course}
										<button name = {"y4 " + course} onClick = {this.removeCourse}>
										X
										</button>
										</Typography>
            			);
								}) */
								Object.entries(courses).map(course => {
									if(course[1].department._id === department && course[1].course_level === 4000) {
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
							</Card>
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
                  	<Icon>person_add</Icon>
                    </Fab>
                </FuseAnimate>
					<CourseDialog/>
        </React.Fragment>
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
