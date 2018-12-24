const {DepartmentSchema, Department} = require('../model/Department');

module.exports.getAllDepartment = (req, res, nex)=>{
  Department.find((err, department)=>{
     if(err) return res.status(400).json(err);
     return res.status(200).json(department);
  })
}

module.exports.addNewDepartment = async (req, res, nex)=>{
  const NewDepartment = new department(req.body);
  await NewDepartment.save();
  return res.status(200).json(NewDepartment);
}

module.exports.updateDepartment = (req, res, nex)=>{
  Department.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, department)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(department);
  })
}

module.exports.deleteDepartment = (req, res, nex)=>{
  Department.findOneAndDelete({_id:req.params._id, type:"department"},(err, department)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(department);
  })
}
