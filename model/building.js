const mongoose = require('mongoose');
const {CampusSchema, Campus} = require('./campus');
const Schema = mongoose.Schema;

const BuildingSchema = new Schema({
  type:{
    type:String,
    default:"building"
  },
  building_name:{
    type:String,
    required:true,
    unique:true,
    dropDups:true
  },
  campus:{
    type:Object,
  }
})


let Building;
if(mongoose.models.building){
  Building = mongoose.model('building');
}else{
  Building = mongoose.model('building', BuildingSchema);
}
module.exports = {BuildingSchema, Building};
