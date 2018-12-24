const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {RoomSchema, Room} = require('./room');
const {CourseSchema, Course} = require('./course');
const {InstructorSchema, Instructor} = require('./instructor');
const {SemesterSchema, Semester} = require('./semester');

const SectionSchema = new Schema({
  type:{
    type:String,
    default:'section'
  },
  CRN:{
    type:String,
    required:true,
    unique:true,
    dropDups:true
  },
  course:{
    type:String,
    required:true
  },
  section_num:{
    type:String,
    required:true
  },
  room:{
    type:RoomSchema,
    required:true
  },
  duration:{
    type: Number,
    reqiured: true
  },
  instructor:[{
    type:InstructorSchema
  }],
  semseter:{
    type:SemesterSchema,
    required: true
  }
})

let Section;
if (mongoose.models.section) {
   Section = mongoose.model('section');
} else {
   Section = mongoose.model('section', SectionSchema);
}
module.exports = {SectionSchema, Section};
