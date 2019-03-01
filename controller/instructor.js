const {InstructorSchema, Instructor} = require('../model/instructor');
const { EmbedDepartment } = require('../helper/EmbedHelper/departmentEmbed');
const { EmbedVettedCourse } = require('../helper/EmbedHelper/vettedCourseEmbed');


module.exports.getAllInstructor = (req, res, nex)=>{
  Instructor.find((err, instructor)=>{
    if(err) return res.status(400).json(err);
    EmbedDepartment(instructor)
      .then(embedData=>{
        EmbedVettedCourse(embedData)
         .then(course_vetted=>{
           return res.status(200).json(course_vetted)
         })
         .catch(err=>{return res.status(400).json(err)})
      }).catch(err=>{return res.status(200).json(err);})
  })
}

module.exports.getInstructorById = (req, res,nex)=>{
  Instructor.findOne({_id:req.params._id},(err, instructor)=>{
    if(err) return res.status(400).json(err);
    EmbedDepartment(instructor)
      .then(embedData=>{
        EmbedVettedCourse(embedData)
         .then(course_vetted=>{
           return res.status(200).json(course_vetted)
         })
         .catch(err=>{return res.status(400).json(err)})
      })
      .catch(err=>{return res.status(200).json(err);})
  })
}

module.exports.addNewInstructor = async (req, res, nex)=>{
  const NewInstrustor = new Instructor(req.body);
  const save_instructor = await NewInstrustor.save();
  EmbedDepartment(save_instructor)
    .then(embedData=>{
      EmbedVettedCourse(embedData)
       .then(course_vetted=>{
         return res.status(200).json(course_vetted)
       })
       .catch(err=>{return res.status(400).json(err)})
    })
    .catch(err=>{return res.status(200).json(err);})
}

module.exports.updateInstructor = (req, res, nex)=>{
  Instructor.findOneAndUpdate({_id:req.params._id}, req.body, {new:true},(err, instructor)=>{
    if(err) return res.status(400).json(err);
    EmbedDepartment(instructor)
      .then(embedData=>{
        EmbedVettedCourse(embedData)
         .then(course_vetted=>{
           return res.status(200).json(course_vetted)
         })
         .catch(err=>{return res.status(400).json(err)})
      })
      .catch(err=>{return res.status(200).json(err);})
  })
}

module.exports.deleteInstructor = (req, res, nex)=>{
  Instructor.findOneAndDelete({_id:req.params._id, type:"instructor"}, (err, instructor)=>{
    if(err) return res.status(400).json(err);
    EmbedDepartment(instructor)
      .then(embedData=>{
        EmbedVettedCourse(embedData)
         .then(course_vetted=>{
           return res.status(200).json(course_vetted)
         })
         .catch(err=>{return res.status(400).json(err)})
      })
      .catch(err=>{return res.status(200).json(err);})
  })
}
