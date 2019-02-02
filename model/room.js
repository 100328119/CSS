const mongoose = require('mongoose');
const {BuildingSchema, Building} = require('./building');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  type:{
    type:String,
    default:'room'
  },
  room_num:{
    type:Number,
    required:true,
    // unique:true,
    // dropDups:true
  },
  equipment:{
    type:Object
  },
  floor:{
    type:Number,
    default:0
  },
  building:{
    type:Object
  }
})

//method following seaction

let Room;
if(mongoose.models.room){
  Room = mongoose.model('room');
}else{
  Room = mongoose.model('room', RoomSchema);
}
module.exports = {RoomSchema, Room};
