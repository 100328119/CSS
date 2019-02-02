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
  course_level:{
    type:Number
  },
  department:{
    type:Object,
    required:true
  },
  prerequisites:[]
})

let Course;
if (mongoose.models.course) {
   Course = mongoose.model('course');
} else {
   Course = mongoose.model('course', CourseSchema);
}
module.exports = {CourseSchema, Course};
