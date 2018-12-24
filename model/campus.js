const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampusSchema = new Schema({
  type:{
    type:String,
    default:'campus'
  },
  campus_name:{
    type:String,
    required:true,
    unique: true,
    dropDups:true
  },
  address:String,
  postal_code:String
})

let Campus;
if (mongoose.models.campus) {
   Campus = mongoose.model('campus');
} else {
   Campus = mongoose.model('campus', CampusSchema);
}
module.exports = {CampusSchema, Campus};
