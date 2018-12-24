const mongoose = require('mongoose');
const {AdminSchema, Admin} = require('./admin');
const bcrypt = require('bcryptjs');
const SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

const UserSchema = new Schema({
  type:{
    type: String,
    default:'user'},
  user_name:{
    type:String,
    required:true,
    unique: true,
    dropDups: true
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  full_name:{
    first_name:String,
    last_name:String
  },
  admin:AdminSchema
})

UserSchema.pre('save', function (next){
 try{
   const user = this;
   // generate a salt
   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
       if (err) return next(err);
       // hash the password using our new salt
       bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);
           // override the cleartext password with the hashed one
           user.password = hash;
           next();
       });
   });
 }catch(error){
   next(error);
 }
})

UserSchema.methods.comparePassword = function (candidatePassword, callback){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return callback(err);
    callback(null, isMatch);
  });
}

// UserSchema.methods.updatePassword = function ()

const User = mongoose.model('user', UserSchema);
module.exports = {UserSchema, User};
