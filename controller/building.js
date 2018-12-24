const {BuildingSchema, Building} = require('../model/building');

module.exports.getAllBuilding = (req, res, nex)=>{
  Building.find((err,building)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(building);
  })
}

module.exports.addNewBuilding = async (req, res, nex)=>{
  //req.body required to be modify to req.value.body
  const NewBuilding = new Building(req.body);
  //save method need to futher developed
  await NewBuilding.save();
  return res.status(200).json(NewBuilding);
}

module.exports.updateBuilding = (req, res, nex)=>{
  // console.log(req.params._id);
  //req.value.body
  Building.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, building)=>{
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(building);
  })
}

module.exports.deleteBuilding = (req, res, nex)=>{
  Building.findOneAndDelete({_id: req.params._id, type:"building"},(err, building)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(building);
  })
}
