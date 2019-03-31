const {DepartmentSchema, Department} = require('../model/department');

module.exports.getAllDepartment = (req, res, nex)=>{
  Department.find((err, department)=>{
     if(err) return res.status(400).json(err);
     return res.status(200).json(department);
  })
}

module.exports.addNewDepartment = async (req, res, nex)=>{
  const NewDepartment = new Department(req.body);
  const save_department = await NewDepartment.save();
  return res.status(200).json(save_department);
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
