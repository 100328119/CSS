const {SemesterSchema, Semester} = require('../model/Semester');

module.exports.getAllSemester = (req, res, nex)=>{
  Semester.find((err, semester)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(semester);
  })
}

module.exports.addNewSemester = async (req, res, nex)=>{
  const NewSemester = new Semester(req.body);
  await NewSemester.save();
  return res.status(200).json(NewSemester);
}

module.exports.updateSemester = (req, res, nex)=>{
  Semester.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, semester)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(semester);
  })
}

module.exports.deleteSemester = (req, res, nex)=>{
  Semester.findOneAndDelete({_id:req.params._id, type:"semester"},(err, semester)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(semester);
  })
}
