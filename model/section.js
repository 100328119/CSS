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
    type:String
  },
  course:{
    type:String,
  },
  section_num:{
    type:String,
  },
  room:{
    type:String
  },
  from_time:{
    type:String
  },
  end_time:{
    type:String,
  },
  instructor:{
    type:String
  }
})

let Section;
if (mongoose.models.section) {
   Section = mongoose.model('section');
} else {
   Section = mongoose.model('section', SectionSchema);
}
module.exports = {SectionSchema, Section};
