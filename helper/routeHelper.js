const Joi = require('joi');

module.exports.validateBody = (schema)=>{
  return (req, res, next)=>{
    const result = Joi.validate(req.body, schema);
    console.log(result);
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
      first_name:Joi.string().required(),
      last_name: Joi.string().required()
    },
    admin:Joi.object()
  })
}
