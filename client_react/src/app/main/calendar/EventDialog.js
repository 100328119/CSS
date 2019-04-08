import React, { Component } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  Typography,
  Toolbar,
  AppBar,
  FormControlLabel,
  Switch,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  InputLabel,
  Checkbox,
  CheckboxIcon,
  Chip,
  Input
} from "@material-ui/core";

import FuseUtils from "@fuse/FuseUtils";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import _ from "@lodash";
import moment from "moment";
import * as Actions from "./store/actions";

const defaultEventState = {
  //   selectedCourse: Object,
  courseId: String,
  course: null,
  title: "",
  allDay: false,
  start: new Date(),
  end: new Date(),
  courseNumber: null,
  desc: "",
  instructorId: String,
  instructorName: String,
  campusName: String,
  building: String,
  scheduledDays: []
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
class EventDialog extends Component {
  state = { ...defaultEventState };
  componentDidMount() {
    this.props.getCourses();
    this.props.getInstructors();
    this.props.getRooms();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    /**
     * After Dialog Open
     */
    if (
      !prevProps.eventDialog.props.open &&
      this.props.eventDialog.props.open
    ) {
      /**
       * Dialog type: 'edit'
       * Update State
       */
      if (
        this.props.eventDialog.type === "edit" &&
        this.props.eventDialog.data &&
        !_.isEqual(this.props.eventDialog.data, prevState)
      ) {
        this.setState({ ...this.props.eventDialog.data });
      }

      /**
       * Dialog type: 'new'
       * Update State
       */
      if (this.props.eventDialog.type === "new") {
        this.setState({ ...defaultEventState, ...this.props.eventDialog.data });
      }
    }
  }

  handleChange = event => {
    this.setState(
      _.set(
        { ...this.state },
        event.target.name,
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value
      )
    );
  };
  handleClassroomChange = event => {
    // courseId = event.target.value;

    var selectedRoom = this.props.rooms.find(x => x._id === event.target.value);

    // console.log(selectedRoom.building.campus.campus_name);
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ roomNumber: selectedRoom.room_num });
    this.setState({ roomId: selectedRoom._id });
    this.setState({ building: selectedRoom.building.building_name });
    this.setState({ campusName: selectedRoom.building.campus.campus_name });
  };
  handleInputChange = event => {
    // courseId = event.target.value;

    var selectedCourseInfo = this.props.kpuCourses.find(
      x => x._id === event.target.value
    );
    // console.log(selectedCourseInfo);
    // console.log(selectedCourseInfo.course_num);
    // query course via id and get name

    this.setState({ [event.target.name]: event.target.value });
    this.setState({ courseNumber: selectedCourseInfo.course_num });
    this.setState({ courseId: selectedCourseInfo._id });
    this.setState({
      title: selectedCourseInfo.course_tag + " " + selectedCourseInfo.course_num
    });
    // this.setState({title: selectedCourseInfo.})
  };

  handleInstructorInputChange = event => {
    // console.log(event.target);
    // courseId = event.target.value;
    // var selectedCourseInfo = this.props.kpuCourses.find(
    //   x => x._id === event.target.value
    // );
    // console.log(selectedCourseInfo);
    // console.log(selectedCourseInfo.course_num);
    // query course via id and get name

    this.setState({ [event.target.name]: event.target.value });
    // this.setState({ courseNumber: selectedCourseInfo.course_num });
    // this.setState({ courseId: selectedCourseInfo._id });
  };
  closeComposeDialog = () => {
    this.props.eventDialog.type === "edit"
      ? this.props.closeEditEventDialog()
      : this.props.closeNewEventDialog();
  };

  canBeSubmitted() {
    const { course } = this.state;
    return course != null;
  }
  renderCourseList() {
    return this.props.kpuCourses.map(kcourse => {
      return <MenuItem value={kcourse._id}>{kcourse.course_name}</MenuItem>;
    });
  }
  renderRoomList() {
    return this.props.rooms.map(room => {
      return <MenuItem value={room._id}>{room.room_num}</MenuItem>;
    });
  }

  renderInstructorList() {
    // console.log(this.state.courseId);
    var menuItems = [];
    var instructorId;
    var instructorName;
    this.props.instructors.map(instructor => {
      var courseId = this.state.courseId;

      instructor.vetted_course.map(course => {
        if (courseId === course._id) {
          instructorId = instructor._id;
          instructorName = instructor.first_name + " " + instructor.last_name;
        }
      });
    });
    if (instructorId != "" && instructorName != "") {
      return <MenuItem value={instructorId}>{instructorName}</MenuItem>;
    } else {
      return <MenuItem value="N/A">N/A</MenuItem>;
    }
  }

  handleChangeMultiple = event => {
    const { options } = event.target;
    const value = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      scheduledDays: value
    });
  };
  render() {
    const {
      eventDialog,
      addEvent,
      updateEvent,
      removeEvent,
      kpuCourses,
      instructors,
      scheduledDays,
      classes
    } = this.props;

    let kpuCoursesArray = [];
    let instructorsArray = [];

    if (kpuCourses !== null) {
      kpuCoursesArray = kpuCourses;
    }
    if (instructors !== null) {
      instructorsArray = instructors;
    }

    const start = moment(this.state.start).format(
      moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
    );
    const end = moment(this.state.end).format(
      moment.HTML5_FMT.DATETIME_LOCAL_SECONDS
    );
    // console.log(this.state);
    return (
      <Dialog
        {...eventDialog.props}
        onClose={this.closeComposeDialog}
        fullWidth
        maxWidth="xs"
      >
        <AppBar position="static">
          <Toolbar className="flex w-full">
            <Typography variant="subtitle1" color="inherit">
              {eventDialog.type === "new" ? "Schedule Course" : "Edit Course"}
            </Typography>
          </Toolbar>
        </AppBar>

        <DialogContent classes={{ root: "p-16 pb-0 sm:p-24 sm:pb-0" }}>
          <div>
            <div>
              <FormControl>
                <InputLabel>Course</InputLabel>
                <Select
                  name="course"
                  // fix this
                  value={this.state.courseId}
                  onChange={this.handleInputChange}
                  fullWidth
                  autoFocus
                >
                  <MenuItem disabled selected>
                    KPU COURSE
                  </MenuItem>
                  {this.renderCourseList()}
                </Select>
              </FormControl>
            </div>
            <br />
          </div>
          <TextField
            disabled
            id="courseNumber"
            label="Course Code"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              max: end
            }}
            name="courseNumber"
            value={this.state.courseNumber}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <TextField
            disabled
            hidden
            id="courseId"
            label="Course ID"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              max: end
            }}
            name="courseId"
            value={this.state.courseId}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <div>
            <div>
              <FormControl>
                <InputLabel>Room</InputLabel>
                <Select
                  name="room"
                  // fix this
                  value={this.state.room || ""}
                  onChange={this.handleClassroomChange}
                  fullWidth
                >
                  <MenuItem disabled selected>
                    ROOM #
                  </MenuItem>
                  {this.renderRoomList()}
                </Select>
                {/* <FormHelperText>KPU Course</FormHelperText> */}
              </FormControl>
            </div>
            <br />

            <TextField
              disabled
              id="campusName"
              label="Campus"
              className="mt-8 mb-16"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                max: end
              }}
              name="campusName"
              value={this.state.campusName}
              onChange={this.handleClassroomChange}
              variant="outlined"
              fullWidth
            />
            <TextField
              disabled
              id="building"
              label="Building"
              className="mt-8 mb-16"
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                max: end
              }}
              name="building"
              value={this.state.building}
              onChange={this.handleClassroomChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <TextField
            hidden
            id="title"
            label="Title"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              max: end
            }}
            name="title"
            value={this.state.course}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />
          <div>
            <div>
              <FormControl>
                <InputLabel>Instructor</InputLabel>
                <Select
                  name="instructor"
                  value={this.state.instructor || ""}
                  onChange={this.handleInstructorInputChange}
                  fullWidth
                >
                  <MenuItem disabled selected>
                    Instructor
                  </MenuItem>
                  {this.renderInstructorList()}
                </Select>
              </FormControl>
            </div>
            <br />
            <div>
              <FormControl>
                <InputLabel shrink htmlFor="select-multiple-native">
                  Days
                </InputLabel>
                <Select
                  multiple
                  native
                  value={this.state.scheduledDays}
                  onChange={this.handleChangeMultiple}
                  inputProps={{
                    id: "select-multiple-native"
                  }}
                >
                  {days.map(day => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>

          <FormControlLabel
            className="mt-8 mb-16"
            label="All Day"
            control={
              <Switch
                checked={this.state.allDay}
                id="allDay"
                name="allDay"
                onChange={this.handleChange}
              />
            }
          />

          <TextField
            id="start"
            name="start"
            label="Start"
            type="datetime-local"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              max: end
            }}
            value={start}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            id="end"
            name="end"
            label="End"
            type="datetime-local"
            className="mt-8 mb-16"
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              min: start
            }}
            value={end}
            onChange={this.handleChange}
            variant="outlined"
            fullWidth
          />

          <TextField
            hidden
            className="mt-8 mb-16"
            id="desc"
            label="Notes"
            type="text"
            name="desc"
            value={this.state.desc}
            onChange={this.handleChange}
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        </DialogContent>

        {eventDialog.type === "new" ? (
          <DialogActions className="justify-between pl-8 sm:pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addEvent(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between pl-8 sm:pl-16">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                updateEvent(this.state);
                this.closeComposeDialog();
              }}
              disabled={!this.canBeSubmitted()}
            >
              {" "}
              Save
            </Button>
            <IconButton
              onClick={() => {
                removeEvent(this.state._id);
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
  return bindActionCreators(
    {
      closeEditEventDialog: Actions.closeEditEventDialog,
      closeNewEventDialog: Actions.closeNewEventDialog,
      addEvent: Actions.addEvent,
      updateEvent: Actions.updateEvent,
      removeEvent: Actions.removeEvent,
      getCourses: Actions.getCourses,
      getInstructors: Actions.getInstructors,
      getRooms: Actions.getRooms
      //   getCourse: Actions.getCourse
    },
    dispatch
  );
}

function mapStateToProps({ calendarApp }) {
  return {
    eventDialog: calendarApp.events.eventDialog,
    kpuCourses: Object.values(calendarApp.events.courses),
    instructors: Object.values(calendarApp.events.instructors),
    rooms: Object.values(calendarApp.events.rooms)
    // selectedCourse: Object.values(calendarApp.events.course)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDialog);
