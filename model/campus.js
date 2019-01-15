const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampusSchema = new Schema({
  type:{
    type:String,
    default:'campus'
  },
  campus_name:{
    type:String,
    required:true,//cause refer object can't be empty feild
    // unique: true,
    // dropDups:true
  },
  address:{
    type:String,
    default:''
  },
  postal_code:{
    type:String,
    default:''
  }
})

let Campus;
if (mongoose.models.campus) {
   Campus = mongoose.model('campus');
} else {
   Campus = mongoose.model('campus', CampusSchema);
}
module.exports = {CampusSchema, Campus};
