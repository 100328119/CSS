//Define Administration level as well as create mongo schema
const mongoose = require('mongoose');
let Schema = mongoose.Schema;

const AdminSchema = new Schema({
  type:{
    type:String,
    required:true,
    default:"admin"},
  admin_level:{
    type:Number,
    default:''
  },
  role:{
    type:String,
    default:''
  }
})

const Admin = mongoose.model('admin', AdminSchema);
module.exports = {AdminSchema, Admin};
