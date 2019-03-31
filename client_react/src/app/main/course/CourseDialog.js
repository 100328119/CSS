import React, {	Component} from 'react';
import {	TextField,	Button,	Dialog,	DialogActions,	DialogContent,	Icon,	IconButton,	Typography,	Toolbar,	AppBar,	Select,	MenuItem} from '@material-ui/core';
import {	bindActionCreators} from 'redux';
import {FuseChipSelect} from '@fuse';
import * as Actions from './store/actions/';
import {	connect} from 'react-redux';
import _ from '@lodash';

const newCourseState = {
	_id: '',
	type: '',
	course_name: '',
	course_tag: '',
	course_num: '',
	course_level: '',
	department: {
		type: '',
		department_chair: '',
		num_staff: 0,
		_id: '',
		department_name: ''
	},
	prerequisites: []
};

class CourseDialog extends Component {

	state = {	...newCourseState	};

	/* componentDidMount() {
		let departments = this.props.departments;
	} */

	componentDidUpdate(prevProps, prevState, snapshot) {
		/**
		 * After Dialog Open
		 */
		if (!prevProps.courseDialog.props.open && this.props.courseDialog.props.open) {
			/**
			 * Dialog type: 'edit'
			 * Update State
			 */
			if (this.props.courseDialog.type === 'edit' &&
				this.props.courseDialog.data &&
				!_.isEqual(this.props.courseDialog.data, prevState)) {
				this.setState({
					...this.props.courseDialog.data
				});
			}

			/**
			 * Dialog type: 'new'
			 * Update State
			 */
			if (this.props.courseDialog.type === 'new' &&
				!_.isEqual(newCourseState, prevState)) {
				this.setState({
					...newCourseState
				});
			}
		}
	}

	handleChange = (event) => {
		if(event.target.name === 'department')
		{
			this.setState({department: {
				_id:	event.target.value
			}});
		}
		else {
			this.setState(_.set({
				...this.state
			}, event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value));
		}
	};

	closeComposeDialog = () => {
		this.props.courseDialog.type === 'edit' ? this.props.closeEditCourseDialog() : this.props.closeNewCourseDialog();
	};

	handlePrerequisitesChange = (value, name)=>{
		this.setState({prerequisites: value.map(item => item.value)});
	}

	canBeSubmitted() {
		const {
			course_name
		} = this.state;
		return (
			course_name.length > 0
		);
	}

	render() {
			const {courseDialog,addCourse,updateCourse,removeCourse,departments} = this.props;

        return (
            <Dialog
                classes={{
                    paper: "m-24"
                }}
                {...courseDialog.props}
                onClose={this.closeComposeDialog}
                fullWidth
                maxWidth="xs"
            >

                <AppBar position="static" elevation={1}>
                    <Toolbar className="flex w-full">
                        <Typography variant="subtitle1" color="inherit">
                            {courseDialog.type === 'new' ? 'New Course' : 'Edit Course'}
                        </Typography>
                    </Toolbar>
                    <div className="flex flex-col items-center justify-center pb-24">
                        {courseDialog.type === 'edit' && (
                            <Typography variant="h6" color="inherit" className="pt-8">
                                {this.state.course_name}
                            </Typography>
                        )}
                    </div>
                </AppBar>

                <DialogContent classes={{root: "p-24"}}>
                    <div className="flex">
                        <div className="min-w-48 pt-20">Course Name
                        </div>
                        <TextField
                            className="mb-24"
                            label="Course Name"
                            id="course_name"
                            name="course_name"
                            value={this.state.course_name}
                            onChange={this.handleChange}
														variant="outlined"
														required
                            fullWidth
                        />
                    </div>

                    <div className="flex">
                        <div className="min-w-48 pt-20">Course Tag
                        </div>
                        <TextField
                            className="mb-24"
                            label="Course Tag"
                            id="course_tag"
                            name="course_tag"
                            value={this.state.course_tag}
                            onChange={this.handleChange}
														variant="outlined"
														required
                            fullWidth
                        />
                    </div>

										<div className="flex">
                        <div className="min-w-48 pt-20">Course Number
                        </div>
                        <TextField
                            className="mb-24"
                            label="Course Number"
                            id="course_num"
                            name="course_num"
                            value={this.state.course_num}
                            onChange={this.handleChange}
														variant="outlined"
														required
                            fullWidth
                        />
                    </div>

										<div className="flex">
                        <div className="min-w-48 pt-20">Course Level
                        </div>
                        <Select
                            className="mb-24"
                            label="Course Level"
                            id="course_level"
                            name="course_level"
                            value={this.state.course_level}
                            onChange={this.handleChange}
														variant="outlined"
														required
                            fullWidth
                        >
													<MenuItem value = "1000">1000</MenuItem>
													<MenuItem value = "2000">2000</MenuItem>
													<MenuItem value = "3000">3000</MenuItem>
													<MenuItem value = "4000">4000</MenuItem>
												</Select>
                    </div>

										<div className="flex">
                        <div className="min-w-48 pt-20">Dept.
                        </div>
                        <Select
                            className="mb-24"
                            label="Department"
                            id="department"
                            name="department"
                            value={this.state.department._id}
                            onChange={this.handleChange}
														variant="outlined"
														required
                            fullWidth
                        >
													{departments.map(dept => {
														return(
															<MenuItem key={dept._id} value = {dept._id}>{dept.department_name}</MenuItem>
														);
													})
													}
												</Select>
                    </div>

										<FuseChipSelect
												className="mt-8 mb-24"
												value={
														this.state.prerequisites.map(item => ({
																value: item,
																label: item
														}))
												}
												onChange={(value) => this.handlePrerequisitesChange(value, 'prerequisites')}
												placeholder="Select multiple Prerequisites"
												textFieldProps={{
														label          : 'Prerequisites',
														InputLabelProps: {
																shrink: true
														},
														variant        : 'outlined'
												}}
												isMulti
										/>
                </DialogContent>

                {courseDialog.type === 'new' ? (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                addCourse(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Add
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions className="justify-between pl-16">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                updateCourse(this.state);
                                this.closeComposeDialog();
                            }}
                            disabled={!this.canBeSubmitted()}
                        >
                            Save
                        </Button>
                        <IconButton
                            onClick={() => {
                                removeCourse(this.state._id);
                                this.closeComposeDialog();
                            }}
                        >
                            <Icon>delete</Icon>
                        </IconButton>
                    </DialogActions>
                )}
            </Dialog>
        );
    }
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		closeEditCourseDialog	: Actions.closeEditCourseDialog,
		closeNewCourseDialog	: Actions.closeNewCourseDialog,
		addCourse							: Actions.addCourse,
		updateCourse					: Actions.updateCourse,
		removeCourse					: Actions.removeCourse
	}, dispatch);
}

function mapStateToProps({coursesPage}) {
	return {
		courseDialog: coursesPage.courses.courseDialog,
		departments:	coursesPage.courses.departments
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseDialog);
