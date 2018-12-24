const {InstructorSchema, Instructor} = require('../model/Instructor');

module.exports.getAllInstructor = (req, res, nex)=>{
  Instructor.find((err, instructor)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(instructor);
  })
}

module.exports.addNewInstructor = async (req, res, nex)=>{
  const NewInstrustor = new Instructor(req.body);
  await NewInstrustor.save();
  return res.status(200).json(NewInstrustor);
}

module.exports.updateInstructor = (req, res, nex)=>{
  Instructor.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, instructor)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(instructor);
  })
}

module.exports.deleteInstructor = (req, res, nex)=>{
  Instructor.findOneAndDelete({_id:req.params._id, type:"instructor"}, (err, instructor)=>{
    if(err) return res.status(400).json(err);
    return res.status(400).json(instructor)
  })
}
