const { Campus } = require('../../model/campus');


module.exports.EmbedCampus = async (buildings,callback)=>{
  if(!Array.isArray(buildings)){
    Campus.findOne({_id:buildings.campus}, (err, campus)=>{
      if(err) callback(err,null);
      buildings.campus = campus;
       callback(null,buildings)
    })
  }else{
    try{
      for(let i = 0; i < buildings.length; i++){
          let campus_data = await Campus.findOne({_id:buildings[i].campus});
          buildings[i].campus = campus_data;
      }
       callback(null,buildings);
    }catch(err){
       callback(err,null);
    }
  }
}

module.exports.EmbedCampusPromise = (buildings) =>{
    return new Promise(
      async function (resolve, reject){
        if(!Array.isArray(buildings)){
          Campus.findOne({_id:buildings.campus}, (err, campus)=>{
            if(err) reject(err);
            buildings.campus = campus;
            resolve(buildings);
          })
        }else{
          try{
            for(let i = 0; i < buildings.length; i++){
                let campus_data = await Campus.findOne({_id:buildings[i].campus});
                buildings[i].campus = campus_data;
            }
             resolve(buildings);
          }catch(err){
             reject(err);
          }
        }
      }
    )
}
