const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {DepartmentSchema, Department} = require('./department');

const CourseSchema = new Schema({
  type:{
    type:String,
    default:"course"
  },
  course_name:{
    type:String,
    required:true
  },
  course_tag:{
    type:String,
    required:true
  },
  course_num:{
    type:Number,
    required:true
  },
  department:{
    type:DepartmentSchema,
    required:true
  }
})

const Course = mongoose.model('course',CourseSchema);
module.exports = {CourseSchema, Course};
