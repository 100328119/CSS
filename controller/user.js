const jwt = require('jsonwebtoken');

const {UserSchema, User} = require('../model/user');
const {JWT_SECRET} = require('../config/constant');
const { EmbedAdmin } =  require('../helper/EmbedHelper/adminEmbed');

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
  const save_user = await NewUser.save();

  const token = signToken(save_user);

  EmbedAdmin(save_user)
    .then(user_embed =>{
      const user = {
        role: user_embed.admin.role,
        data: {
          displayName: user_embed.user_name,
          photoURL   : 'assets/images/avatars/Abbott.jpg',
          email      : user_embed.email,
          settings   : {},
          shortcuts  : []
        }
      }
      return res.status(200).json({access_token:token, user: user});
    }).catch(err=>{return res.status(400).json(err)})
}

module.exports.signIn = (req, res, nex)=>{
  const login_user = req.user;

  const token = signToken(login_user);
  EmbedAdmin(login_user)
    .then(user_embed =>{
      console.log(token);
      const user = {
        uuid: user_embed._id,
        from: "User_db",
        role: user_embed.admin.role,
        data: {
          displayName: user_embed.user_name,
          photoURL   : 'assets/images/avatars/Abbott.jpg',
          email      : user_embed.email,
          settings   : {},
          shortcuts  : []
        }
      }
      if(token){
        return res.status(200).json({access_token:token, user: user});
      }
    })
    .catch(err=>{ console.log(err);return res.status(400).json(err)})
}

module.exports.TokenSignin = async (req, res, nex)=>{
  console.log(req.user);
  module.exports.signIn(req, res, nex);
}

// intend to be refactor
module.exports.UpdateProfile = (req, res, nex)=>{
    delete req.body.password;
    delete req.body.email;
    console.log(req.body);
    User.findOneAndUpdate({_id:req.user._id, type:"user"}, req.body, {new: true}, (err, user)=>{
      if(err) return res.status(400).json(err);
      return res.status(200).json(user);
    })
}

module.exports.getAllUsers = (req, res, nex)=>{
  User.find((err, users)=>{
    if(err) return res.status(401).json(err);
    EmbedAdmin(users)
      .then(embed_users=>{
        return res.status(200).json(embed_users);
      })
      .catch(err=>{
        return res.status(400).json(err)
      })
  })
}

module.exports.getUserByID = (req, res, nex)=>{
  User.findOne({_id:req.params._id}, (err, user)=>{
    if(err) return res.status(400).json(err);
    EmbedAdmin(user)
      .then(embed_user=>{
        return res.status(200).json(embed_user);
      })
      .catch(error=>{
        return res.status(401).json(error);
      })
  })
}

module.exports.updateUserByID = (req, res, nex)=>{
  User.findOneAndUpdate({_id:req.params._id, type:"user"}, req.body, {new: true}, (err, user)=>{
    if(err) return res.status(400).json(err);
    EmbedAdmin(user)
      .then(embed_user=>{
        return res.status(200).json(embed_user);
      })
      .catch(error=>{
        return res.status(401).json(error);
      })
  })
}

module.exports.deleteUserByID = (req, res, nex)=>{
  User.findOneAndDelete({_id:req.params._id, type:"user"}, req.body, {new:true}, (err, user)=>{
    if(err) return res.status(400).json(err);
    return res.send(200);
  })
}
module.exports.secret = (req, res, nex)=>{
  res.send('secret works')
}
