const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
  type:{
    type:String,
    default:"instructor"
  },
  prof_id:{
    type:Number
  },
  full_name:{
    first_name: {
      type:String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    }
  },
  department:{
    type:Object,
    required: true
  },
  prof_type:{
    type:String
  },
  max_course:{
    type:Number
  },
  vetted_course:[],
});

let Instructor;
if (mongoose.models.instructor) {
   Instructor = mongoose.model('instructor');
} else {
   Instructor = mongoose.model('instructor', InstructorSchema);
}
module.exports = {InstructorSchema, Instructor};
