const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const { ExtractJwt} = require('passport-jwt');
const { JWT_SECRET } = require('./config/constant');
const { UserSchema, User } = require('./model/user');

//JWT strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done)=>{
    try{
      //find the user specified in signToken
      const user = await User.findById(payload.sub);
      //if user doesn't exist, handler it
      if(!user) return done(null, false);
      //otherwise, return the user
      done(null, user);
    }catch(error){
      done(error, false);
    }
}));

//LocalStrategy
passport.use(new LocalStrategy(
  {usernameField:"email"},
  async(email, password, done)=>{
    try{
      // find user by Email
      const user = await User.findOne({ email });
      // if not
      if(!user) return done(null, false);
      // check password
      user.comparePassword(password,(err, isMatch)=>{
        if(err) done(err, false);
        if(!isMatch){
          done(null, false);
        }
        done(null,user);
      });
    }catch(error){
      done(error, false);
    }
  }
));
