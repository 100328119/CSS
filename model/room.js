const mongoose = require('mongoose');
const {BuildingSchema, Building} = require('./building');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  type:{
    type:String,
    default:'room'
  },
  room_name:{
    type:String,
    required:true,
    unique:true,
    dropDups:true
  },
  equipment:{
    pc:Boolean,
    projector:Boolean,
    num_seat:Number,
  },
  floor:Number,
  building:BuildingSchema
})

//method following seaction

let Room;
if(mongoose.models.room){
  Room = mongoose.model('room');
}else{
  Room = mongoose.model('room', RoomSchema);
}
module.exports = {RoomSchema, Room};
