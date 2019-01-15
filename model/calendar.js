const mongoose = require('mongooose');
const Schema = mongoose.Schema;
const {SectionSchema, Section} = require('./section');
const {SemesterSchema, Semester} = require('./semester');
const {DepartmentSchema, Department} = require('./department');
const {UserSchema, User} = require('./user');

const CalendarSchema = new Schema({
  type:{
    type:String,
    default: "calendar"
  },
  semester:{
    type:SemesterSchema,
    required:true,
    default:{}
  },
  owner:[{
    type:String
  }],
  department:{
    type:DepartmentSchema
  },
  section:[{
    type:String
  }],
  calendar_status:{
    type:String,
    default:"In Progress",
    required:true
  }
})

const Calendar = mongoose.model('calendar', CalendarSchema);
module.exports = {CalendarSchema, Calendar};