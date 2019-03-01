const { Admin } = require('../../model/admin');

module.exports.EmbedAdmin = (users) =>{
  return new Promise(
    async function(resolve, reject){
      if(!Array.isArray(users)){
        Admin.findOne({_id:users.admin}, (err, admin)=>{
          if(err) reject(err);
          users.admin = admin;
          resolve(users)
        })
      }else{
        try{
          for(let i = 0; i < users.length; i++){
            let admin_data = await Admin.findOne({_id:users[i].admin});
            users[i].admin = admin_data
          }
          resolve(users);
        }catch(err){
          reject(err);
        }
      }
    }
  )
}
