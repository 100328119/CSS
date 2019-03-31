const { Semester } = require('../../model/semester');

module.exports.EmbedSemester = (data) =>{
  return new Promise(
    async function (resolve, reject){
      if(Array.isArray(data)){
        try{
          for(let i = 0; i < data.length; i++){
              let semester_data = await Semester.findOne({_id:data[i].semester})
              data[i].semester = semester_data;
            }
          resolve(data);
        }catch(err){
          reject(err);
        }
      }else{
        Semester.findOne({_id:data.semester},(err, semester_data)=>{
            if(err) reject(err);
            data.semester = semester_data;
            resolve(data);
        })
      }
    }
  )
}
