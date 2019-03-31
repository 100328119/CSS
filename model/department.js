const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DepartmentSchema = new Schema({
  type:{
    type:String,
    default:"department"
  },
  department_name:{
    type:String,
    required:true
  },
  department_chair:{
    type:String,
    default:""
  },
  num_staff:{
    type:Number,
    default:0
  }
})

let Department;
if (mongoose.models.department) {
   Department = mongoose.model('department');
} else {
   Department = mongoose.model('department', DepartmentSchema);
}
module.exports = {DepartmentSchema, Department};
