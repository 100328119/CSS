const {CampusSchema, Campus} = require('../model/campus');

module.exports.getAllCampus = (req, res, nex)=>{
  Campus.find((err,campus)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(campus);
  })
}

module.exports.addNewCampus = async (req, res, nex)=>{
  const NewCampus = new Campus(req.body);
  await NewCampus.save();
  res.status(200).json(NewCampus);
}

module.exports.updateCampus = (req, res, nex)=>{
  Campus.findOneAndUpdate({_id:req.params._id}, req.body,{new:true},(err, campus)=>{
    if(err)return res.status(400).json(err);
     return res.status(200).json(err);
  })
}

module.exports.deleteCampus = (req, res, nex)=>{
  Campus.findOneAndDelete({_id:req.params._id, type:'campus'},(err, campus)=>{
    if(err)return res.status(400).json(err);
    return res.status(200).json(campus);
  })
}
