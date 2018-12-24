const {SectionSchema, Section} = require('../model/section');

module.exports.getAllSection = (req, res, nex)=>{
  Section.find((err, section)=>{
     if(err) return res.status(400).json(err);
     return res.status(200).json(section);
  })
}

module.exports.addNewSection = async(req, res, nex)=>{
  const NewSection = new Section(req.body);
  await NewSection.save();
  return res.status(200).json(NewSection);
}

module.exports.updateSection = (req, res, nex)=>{
  Section.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, section)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(section);
  })
}

module.exports.deleteSection = (req, res, nex)=>{
  Section.findOneAndDelete({_id:req.params._id, type:"section"},(err, section)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(section);
  })
}
