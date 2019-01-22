const jwt = require('jsonwebtoken');
const {UserSchema, User} = require('../model/user');
const {JWT_SECRET} = require('../config/constant');

let signToken = (user) =>{
  //generate JWT token
  // secret key need to be saved in different location
 const iat = new Date().getTime();
 const expire = new Date().setDate(new Date().getDate() + 7);
 return jwt.sign({
    iss:'css',
    sub: user._id,
    iat: iat, // current time
    exp: expire // current time + 7 days
  },JWT_SECRET);
}

module.exports.Register =  async (req, res, nex)=>{
  //also need to validate nest schema
  // const {user_name, email, password, full_name, admin} = req.value.body;
  const {user_name, email, password, full_name, admin} = req.body;
  //check whether the email is created
  const foundUser = await User.findOne({email});
  if(foundUser){
    return res.status(403).json({error: 'Email is already existed'});
  }
  //create new user
  const NewUser = new User({user_name, email, password, full_name, admin});
  await NewUser.save();

  const token = signToken(NewUser)
  const user = {
    role: "admin",
    data: {
      displayName: NewUser.user_name,
      photoURL   : 'assets/images/avatars/Abbott.jpg',
      email      : NewUser.email,
      settings   : {},
      shortcuts  : []
    }
  }
  res.status(200).json({token:token, user: user});
}

module.exports.signIn = (req, res, nex)=>{
  console.log(req.user);
  const token = signToken(req.user);
  const user = {
    uuid: req.user._id,
    from: "User_db",
    role: "admin",
    data: {
      displayName: req.user.user_name,
      photoURL   : 'assets/images/avatars/Abbott.jpg',
      email      : req.user.email,
      settings   : {},
      shortcuts  : []
    }
  }
  if(token){
    res.status(200).json({access_token:token, user: user});
  }
}

module.exports.UpdateProfile = (req, res, nex)=>{
    delete req.body.password;
    delete req.body.email;
    console.log(req.body);
    User.findOneAndUpdate({_id:req.user._id, type:"user"}, req.body, {new: true}, (err, user)=>{
      if(err) return res.status(400).json(err);
      return res.status(200).json(user);
    })
}

module.exports.secret = (req, res, nex)=>{
  res.send('secret works')
}
