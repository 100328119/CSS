const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InstructorSchema = new Schema({
  type:{
    type:String,
    default:"instructor"
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
  availbality:{
    type: Boolean,
    default: true
  },
  available_hour:{
    type:Number,
    default:0
  }
});

let Instructor;
if (mongoose.models.instructor) {
   Instructor = mongoose.model('instructor');
} else {
   Instructor = mongoose.model('instructor', InstructorSchema);
}
module.exports = {InstructorSchema, Instructor};
