const {Course} = require('../../model/course');

module.exports.EmbedVettedCourse = (courses)=>{
  return new Promise(
    async function (resolve, reject){
      if(Array.isArray(courses)){
        try{
          for(let i = 0; i<courses.length; i++){
            await embad_arr_vet_course(courses[i].vetted_course)
                      .then(response=>{
                        courses[i].vetted_course = response;
                      }).catch(err=>console.log(err));
          }
          resolve(courses);
        }catch(err){
          reject(err)
        }
      }else{
        embad_arr_vet_course(courses.vetted_course)
                  .then(response=>{
                    courses.vetted_course = response;
                    resolve(courses);
                  }).catch(err=>reject(err));
      }
    }
  )
}

const embad_arr_vet_course = (vetted_courses) =>{
  return new Promise(
    async function (resolve, reject){
      if(Array.isArray(vetted_courses)){
        try{
          for(let i = 0; i < vetted_courses.length; i++){
            let vetted_course = await Course.findOne({_id:vetted_courses[i]});
            vetted_courses[i] = vetted_course;
          }
          resolve(vetted_courses)
        }catch(err){
          reject(err)
        }
      }else{
        Course.findOne({_id:vetted_courses._id},(err, vetted_data)=>{
          if(err) reject(err);
          vetted_courses = vetted_data;
          resolve(vetted_courses);
        })
      }
    }
  )
}
