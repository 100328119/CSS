const {AdminSchema, Admin} = require('../model/admin');

module.exports.getAllAdmin = (req, res, nex)=>{
  // const admins = await Admin.find();
  Admin.find((err, admins)=>{
    if(err) return res.status(400).json({err});
    return res.status(200).json(admins);
  })
}

module.exports.addNewAdmin = async (req, res, nex)=>{
  //req.body required to be modify to req.value.body
  const NewAdmin = new Admin(req.body);
  //save method need to futher developed
  await NewAdmin.save();
  return res.status(200).json(NewAdmin);
}

module.exports.updateAdmin = (req, res, nex)=>{
  // console.log(req.params._id);
  //req.value.body
  Admin.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, admin)=>{
    if(err){
      return res.status(400).json(err);
    }
    return res.status(200).json(admin);
  })
}

module.exports.deleteAdmin = (req, res, nex)=>{
  Admin.findOneAndDelete({_id: req.params._id, type:"admin"},(err, admin)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(admin);
  })
}
