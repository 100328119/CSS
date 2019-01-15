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
    pc:{
      type:Boolean,
      default:false
    },
    projector:{
      type:Boolean,
      default:false
    },
    num_seat:{
      type:Number,
      default:0
    }
  },
  floor:{
    type:Number,
    default:0
  },
  building:{
    type:BuildingSchema
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
