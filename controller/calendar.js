const {CalendarSchema, Calendar} = require('../model/campus');

module.exports.getAllCalendar = (req, res, nex)=>{
  Calendar.find((err, calendar)=>{
     if(err) return res.status(400).json(err);
     return res.status(200).json(calendar);
  })
}

module.exports.addNewCalendar = async (req, res, nex)=>{
  const NewCalendar = new Calendar(req.body);
  await NewCalendar.save();
  return res.status(200).json(Calendar);
}

module.exports.getOneCalendar = (req, res, nex)=>{
  Calendar.findById({_id:req.params._id, type:"calendar"}, (err, calendar)=>{
    if(err) return res.status(400).json(err);
    res.status(200).json(calendar);
  })
}

module.exports.updateCalendar = (req, res, nex)=>{
  Calendar.findOneAndUpdate({_id:req.params._id}, req.body, {new:true}, (err, calendar)=>{
    if(err) return res.status(400).json(err);
    return res.status(200).json(calendar);
  })
}

module.exports.deleteCaleder = (req, res, nex)=>{
  Calendar.findOneAndDelete({_id:req.params._id, type:"calendar"}, (err, calendar)=>{
    if(err) return res.status(400).json(err)
    return res.status(200).json(calendar);
  })
}
