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
  Room.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, room)=>{
    if(err) return res.status(400).json(err);
    EmbedBuilding(room)
      .then(result=>{return res.status(200).json(result)})
      .catch(err=>{return res.status(400).json(err)})
  })
}

module.exports.deleteRoom = (req, res, nex)=>{
 Room.findOneAndDelete({_id:req.params._id, type:'room'}, (err, room)=>{
   if(err) return res.status(400).json(err);
   return res.status(200).json(room);
 })
}
