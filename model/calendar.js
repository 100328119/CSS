const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const {SectionSchema, Section} = require('./section');
const { SemesterSchema, Semester } = require("./semester");
const { DepartmentSchema, Department } = require("./department");
const { UserSchema, User } = require("./user");

const SectionSchema = new Schema({
  title: String,
  start: String,
  end: String,
  allDay: Boolean,
  desc: String,
  course: Object,
  courseNumber: Number,
  courseName: String,
  courseId: String,
  instructor: Object,
  instructorId: String,
  instructorName: String,
  campus: Object,
  campusId: String,
  campusName: String,
  room: Object,
  roomId: String,
  roomNumber: String,
  building: String,
  scheduledDays: []
});

const CalendarSchema = new Schema({
  type: {
    type: String,
    default: "calendar"
  },
  semester: {
    type: Object
  },
  owner: {
    type: Object
  },
  department: {
    type: Object
  },
  sections: [SectionSchema],
  calendar_status: {
    type: String,
    default: "In Progress",
    required: true
  }
});

const Calendar = mongoose.model("calendar", CalendarSchema);
module.exports = { CalendarSchema, Calendar };
