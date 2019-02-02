const {CourseSchema, Course} = require('../model/course');
const { EmbedDepartment } = require('../helper/EmbedHelper/departmentEmbed');
const { EmbedPrerequisites } = require('../helper/EmbedHelper/courseEmbed');

//embed course recursive
module.exports.getAllCourse = (req, res, nex)=>{
  Course.find((err, course)=>{
     if(err) return res.status(400).json(err);
     EmbedDepartment(course)
       .then(result=>{
         // EmbedPrerequisites(result)
         //  .then(course_pre=>{
         //    return res.status(200).json(course_pre)
         //  })
         //  .catch(err=>{return res.status(400).json(err)})
         return res.status(200).json(result)
       })
       .catch(err=>{return res.status(400).json(err)});
  })
}

module.exports.getCourseByDpt = (req, res, nex)=>{
  Course.find({department:req.params._id},(err, courses)=>{
     if(err) return res.status(400).json(err);
     EmbedDepartment(course)
       .then(result=>{return res.status(200).json(result)})
       .catch(err=>{return res.status(400).json(err)});
  })
}

module.exports.getCourseById = (req, res, nex)=>{
  Course.findOne({_id:req.params._id},(err, courses)=>{
     if(err) return res.status(400).json(err);
     EmbedDepartment(courses)
       .then(result=>{return res.status(200).json(result)})
       .catch(err=>{return res.status(400).json(err)});
  })
}


module.exports.addNewCourse = async (req, res, nex)=>{
  try{
    const NewCourse = new Course(req.body);
    let save_course = await NewCourse.save();
    EmbedDepartment(save_course)
      .then(result=>{return res.status(200).json(result)})
      .catch(err=>{return res.status(400).json(err)});
  }catch(err){
    return res.status(400).json(err);
  }
}

module.exports.updateCourse = (req, res, nex)=>{
  Course.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, course)=>{
    if(err) return res.status(400).json(err);
    EmbedDepartment(course)
      .then(result=>{return res.status(200).json(result)})
      .catch(err=>{return res.status(400).json(err)});
  })
}

module.exports.deleteCourse = (req, res, nex)=>{
  Department.findOneAndDelete({_id:req.params._id, type:"course"},(err, course)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(course);
  })
}
