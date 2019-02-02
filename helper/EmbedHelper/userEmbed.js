const { User } = require('../../model/user');

module.exports.EmbedOwner = (calendars) =>{
  return new Promise(
    async function (resolve, reject){
      if(!Array.isArray(calendars)){
        User.findOne({_id:calendars.owner}, (err, user)=>{
          if(err) reject(err);
          let owner = user.toObject();
          delete owner.password;
          calendars.owner = owner;
          resolve(calendars);
        })
      }else{
        try{
          for(let i = 0; i < calendars.length; i++){
              let owner = await User.findOne({_id:calendars[i].owner});
              owner = owner.toObject();
              delete owner.password;
              calendars[i].owner = owner;
           }
           resolve(calendars);
        }catch(err){
           reject(err);
        }
      }
    }
  )
}
