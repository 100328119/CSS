const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterSchema = new Schema({
  type:{
    type:String,
    default:'semseter'
  },
  year:{
    type:Number,
    required:true
  },
  duration:{
    type:Number,
    required:true
  },
  season:{
    type:String,
    required:true
  },
  from_date:{
    type:Date,
    required:true,
    default:Date.now
  },
  end_date:{
    type:Date,
    required:true,
    default:Date.now
  }
})

let Semester;
if (mongoose.models.semester) {
   Semester = mongoose.model('semester');
} else {
   Semester = mongoose.model('semester', SemesterSchema);
}
module.exports = {SemesterSchema, Semester};
