const {RoomSchema, Room} = require('../model/room');

module.exports.getAllRoom = (req, res, nex)=>{
  // const admins = await Admin.find();
  Room.find((err, room)=>{
    if(err) return res.status(400).json({err});
    return res.status(200).json(room);
  })
}

module.exports.addNewRoom = async (req, res, nex)=>{
  //req.body required to be modify to req.value.body
  console.log(req.body);
  const NewRoom = new Room(req.body);
  //save method need to futher developed
  await NewRoom.save();
  return res.status(200).json(NewRoom);
}

module.exports.updateRoom = (req, res, nex)=>{
  Room.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, room)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(room);
  })
}

module.exports.deleteRoom = (req, res, nex)=>{
 Room.findOneAndDelete({_id:req.params._id, type:'room'}, (err, room)=>{
   if(err) return res.status(400).json(err);
   return res.status(200).json(room);
 })
}
