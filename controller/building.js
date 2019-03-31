const {BuildingSchema, Building} = require('../model/building');
const { EmbedCampusPromise,EmbedCampus } = require('../helper/EmbedHelper/campusEmbed');

module.exports.getAllBuilding = (req, res, nex)=>{
  Building.find((err,buildings)=>{
    if(err) {return res.status(400).json(err);}
    EmbedCampus(buildings,(error, building_after)=>{
      if(error) return res.status(400).json(error)
      return res.status(200).json(building_after);
    })
  })
}

module.exports.getBuildingByid = (req, res, nex)=>{
  Building.findOne({_id:req.params._id},(err,buildings)=>{
    if(err) return res.status(400).json(err);
    EmbedCampus(buildings,(err, building_after)=>{
      if(err) return res.status(400).json(err)
      return res.status(200).json(building_after);
    })
  })
}

module.exports.getBuildingByCamp = (req, res, nex)=>{
  Building.find({campus:req.params._id},(err,building)=>{
    if(err) return res.status(400).json(err);
    EmbedCampus(building,(err, building_after)=>{
      if(err) return res.status(400).json(err)
      return res.status(200).json(building_after);
    })
  })
}

module.exports.addNewBuilding = async (req, res, nex)=>{
  //req.body required to be modify to req.value.body
  const NewBuilding = new Building(req.body);
  //save method need to futher developed
  let Saved_building = await NewBuilding.save();
  EmbedCampus(Saved_building,(err, building_after)=>{
    if(err) return res.status(400).json(err)
    return res.status(200).json(building_after);
  })
}

module.exports.updateBuilding = (req, res, nex)=>{
  Building.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, building)=>{
    if(err) return res.status(400).json(err);
    EmbedCampus(building,(err, building_after)=>{
      if(err) return res.status(400).json(err)
      return res.status(200).json(building_after);
    })
  })
}

module.exports.deleteBuilding = (req, res, nex)=>{
  Building.findOneAndDelete({_id: req.params._id, type:"building"},(err, building)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(building);
  })
}
