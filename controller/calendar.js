const {CalendarSchema, Calendar} = require('../model/calendar');
const { EmbedCourse } = require('../helper/EmbedHelper/courseEmbed')
const { EmbedDepartment } = require('../helper/EmbedHelper/departmentEmbed');
const { EmbedOwner } = require('../helper/EmbedHelper/userEmbed');
const { EmbedSemester } = require('../helper/EmbedHelper/semesterEmbed');

module.exports.getAllCalendar = (req, res, nex)=>{
  Calendar.find((err, calendar)=>{
     if(err) return res.status(400).json(err);
     EmbedData_Calendar(calendar,res);
  })
}

module.exports.addNewCalendar = async (req, res, nex)=>{
  const NewCalendar = new Calendar(req.body);
  let Saved_Calendar = await NewCalendar.save();
  EmbedData_Calendar(Saved_Calendar,res);
}

module.exports.getOneCalendar = (req, res, nex)=>{
  Calendar.findById({_id:req.params._id, type:"calendar"}, (err, calendar)=>{
    if(err) return res.status(400).json(err);
    EmbedData_Calendar(calendar,res);
  })
}

module.exports.updateCalendar = (req, res, nex)=>{
  let cal_data = req.body;
  console.log(cal_data);
  Calendar.findOneAndUpdate({_id:req.params._id}, cal_data, {new:true}, (err, calendar)=>{
    if(err) return res.status(400).json(err);
    EmbedData_Calendar(calendar,res);
  })
}

module.exports.deleteCaleder = (req, res, nex)=>{
  Calendar.findOneAndDelete({_id:req.params._id, type:"calendar"}, (err, calendar)=>{
    if(err) return res.status(400).json(err)
    return res.status(200);
  })
}

module.exports.getCalendarByOwner = (req, res, nex)=>{
  Calendar.find({owner:req.params._id},(err, calendar)=>{
    if(err) return res.status(400).json(err)
    EmbedData_Calendar(calendar,res);
  })
}

module.exports.getCalendarByDpt = (req, res, nex)=>{
  Calendar.find({department:req.params._id},(err, calendar)=>{
    if(err) return res.status(400).json(err)
    EmbedData_Calendar(calendar,res);
  })
}

const EmbedData_Calendar = (calendar,res)=>{
  EmbedCourse(calendar)
    .then(course_cal=>{
      EmbedDepartment(course_cal)
        .then(dep_cal=>{
          EmbedOwner(dep_cal)
            .then(owner_cal=>{
              EmbedSemester(owner_cal)
                .then(sem_cal=>{return res.status(200).json(sem_cal)})
                .catch(err=>{return res.status(400).json(err)})
            })
            .catch(err=>{return res.status(400).json(err)})
        })
        .catch(err=>{return res.status(400).json(err)})
    })
    .catch(err=>{return res.status(400).json(err)})
}
