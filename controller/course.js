const {CourseSchema, Course} = require('../model/course');

module.exports.getAllCourse = (req, res, nex)=>{
  Course.find((err, course)=>{
     if(err) return res.status(400).json(err);
     return res.status(200).json(course);
  })
}

module.exports.addNewCourse = async (req, res, nex)=>{
  const NewCourse = new Course(req.body);
  await NewCourse.save();
  return res.status(200).json(NewCourse);
}

module.exports.updateCourse = (req, res, nex)=>{
  Course.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, course)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(course);
  })
}

module.exports.deleteCourse = (req, res, nex)=>{
  Department.findOneAndDelete({_id:req.params._id, type:"course"},(err, course)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(course);
  })
}
