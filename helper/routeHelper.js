const Joi = require('joi');

module.exports.validateBody = (schema)=>{
  return (req, res, next)=>{
    const result = Joi.validate(req.body, schema);
    if(result.error){
      return res.status(400).json(result.error)
    }
    if(!req.value){req.value = {};}
    req.value['body'] = result.value;
    //req.value.body instead of req.body
    next();
  }
};

module.exports.schema = {
  authSchema:Joi.object().keys({
    user_name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    full_name:{
      first_name:Joi.string(),
      last_name: Joi.string()
    },
    admin:Joi.string().required()
  }),
  buildingSchema: Joi.object().keys({
    building_name:Joi.string().required(),
    campus:Joi.string().required()
  }),
  calendarSchema:Joi.object().keys({
    semester:Joi.string().required(),
    owner:Joi.string().required(),
    department:Joi.string().required(),
    sections:Joi.array(),
    calendar_status:Joi.string()
  }),
  campusSchema:Joi.object().keys({
    campus_name:Joi.string().required(),
    address:Joi.string(),
    postal_code:Joi.string()
  }),
  courseSchema:Joi.object().keys({
    course_name:Joi.string().required(),
    course_tag:Joi.string().required(),
    course_num:Joi.number().required(),
    department:Joi.string().required(),
    prerequisites:Joi.array()
  }),
  departmentSehema:Joi.object().keys({
    department_name:Joi.string().required(),
    department_chair:Joi.string(),
    num_stuff:Joi.number()
  }),
  instructorSchema:Joi.object().keys({
    full_name:{
      first_name:Joi.string().required(),
      last_name:Joi.string().required()
    },
    department:Joi.string().required(),
    availbality:Joi.boolean(),
    available_hour:Joi.number()
  }),
  roomSchema:Joi.object().keys({
    room_num:Joi.number().required(),
    equipment:Joi.object(),
    floor:Joi.number(),
    building:Joi.string(),
  }),
  semesterSchema:Joi.object().keys({
    year:Joi.number().integer().required(),
    duration:Joi.number().integer().required(),
    season:Joi.string().required(),
    from_date:Joi.string(),
    end_date:Joi.string()
  }),
  adminSchema:Joi.object().keys({
    admin_level:Joi.number().integer(),
    description:Joi.string().required()
  })
}
