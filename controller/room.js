const {RoomSchema, Room} = require('../model/room');
const { EmbedBuilding } = require('../helper/EmbedHelper/buildingEmbed');

module.exports.getAllRoom = (req, res, nex)=>{
  // const admins = await Admin.find();
  Room.find((err, room)=>{
    EmbedBuilding(room)
      .then(result=>{return res.status(200).json(result)})
      .catch(err=>{return res.status(400).json(err)})
  })
}

module.exports.getRoomById = (req,res, nex)=>{
  Room.findOne({_id:req.params._id},(err, room)=>{
    if(err) return res.status(400).json(err);
    EmbedBuilding(room)
      .then(result=>{return res.status(200).json(result)})
      .catch(err=>{return res.status(400).json(err)})
  })
}

// need to be refactor input senitized
module.exports.addNewRoom = async (req, res, nex)=>{
  //req.body required to be modify to req.value.body
  console.log(req.body);
  const NewRoom = new Room(req.body);
  //save method need to futher developed
  let Saved_room = await NewRoom.save();
  EmbedBuilding(Saved_room)
    .then(result=>{return res.status(200).json(result)})
    .catch(err=>{return res.status(400).json(err)})
}

// need to be refactor input senitized
module.exports.updateRoom = (req, res, nex)=>{
  let req_room = req.body;
  if(typeof req_room.building == 'string' || req_room.building instanceof String){
    Room.findOneAndUpdate({_id:req.params._id}, req_room, {new:true},(err, room)=>{
      if(err) return res.status(400).json(err);
      EmbedBuilding(room)
        .then(result=>{return res.status(200).json(result)})
        .catch(err=>{return res.status(400).json(err)})
    })
  }else if(typeof req_room.building == 'object' && req_room.building._id != undefined){
    req_room.building = req_room.building._id;
    Room.findOneAndUpdate({_id:req.params._id}, req_room, {new:true},(err, room)=>{
      if(err) return res.status(400).json(err);
      EmbedBuilding(room)
        .then(result=>{return res.status(200).json(result)})
        .catch(err=>{return res.status(400).json(err)})
    })
  }
}

module.exports.deleteRoom = (req, res, nex)=>{
 Room.findOneAndDelete({_id:req.params._id, type:'room'}, (err, room)=>{
   if(err) return res.status(400).json(err);
   return res.status(200).json(room);
 })
}
