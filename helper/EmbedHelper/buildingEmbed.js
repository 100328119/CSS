const { Building } = require('../../model/building');
const { EmbedCampusPromise } = require('./campusEmbed');

module.exports.EmbedBuilding = (rooms)=>{
  return new Promise(
     async function (resolve, reject){
       if(!Array.isArray(rooms)){
         Building.findOne({_id:rooms.building},(err, building)=>{
           if(err) reject(err);
           EmbedCampusPromise(building)
                  .then(embedbuilding =>{
                    rooms.building = embedbuilding;
                    resolve(rooms);
                  })
                  .catch(err=>{reject(err)});
         })
       }else{
         try{
           for(let i = 0; i < rooms.length; i++){
               let building_data = await Building.findOne({_id:rooms[i].building});
               EmbedCampusPromise(building_data)
                      .then(embedbuilding =>{
                        rooms[i].building = embedbuilding;
                      })
                      .catch(err=>{console.log(err)});
           }
           resolve(rooms);
         }catch(err){
           reject(err);
         }
       }
     }
  )
}
